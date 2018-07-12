/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { isDevMode, ɵlooseIdentical as looseIdentical } from '@angular/core';
import { Validators } from '../validators';
import { CheckboxControlValueAccessor } from './checkbox_value_accessor';
import { DefaultValueAccessor } from './default_value_accessor';
import { normalizeAsyncValidator, normalizeValidator } from './normalize_validator';
import { NumberValueAccessor } from './number_value_accessor';
import { RadioControlValueAccessor } from './radio_control_value_accessor';
import { RangeValueAccessor } from './range_value_accessor';
import { ReactiveErrors } from './reactive_errors';
import { SelectControlValueAccessor } from './select_control_value_accessor';
import { SelectMultipleControlValueAccessor } from './select_multiple_control_value_accessor';
export function controlPath(name, parent) {
    return [...parent.path, name];
}
export function setUpControl(control, dir) {
    if (!control)
        _throwError(dir, 'Cannot find control with');
    if (!dir.valueAccessor)
        _throwError(dir, 'No value accessor for form control with');
    control.validator = Validators.compose([control.validator, dir.validator]);
    control.asyncValidator = Validators.composeAsync([control.asyncValidator, dir.asyncValidator]);
    dir.valueAccessor.writeValue(control.value);
    setUpViewChangePipeline(control, dir);
    setUpModelChangePipeline(control, dir);
    setUpBlurPipeline(control, dir);
    if (dir.valueAccessor.setDisabledState) {
        control.registerOnDisabledChange((isDisabled) => { dir.valueAccessor.setDisabledState(isDisabled); });
    }
    // re-run validation when validator binding changes, e.g. minlength=3 -> minlength=4
    dir._rawValidators.forEach((validator) => {
        if (validator.registerOnValidatorChange)
            validator.registerOnValidatorChange(() => control.updateValueAndValidity());
    });
    dir._rawAsyncValidators.forEach((validator) => {
        if (validator.registerOnValidatorChange)
            validator.registerOnValidatorChange(() => control.updateValueAndValidity());
    });
}
export function cleanUpControl(control, dir) {
    dir.valueAccessor.registerOnChange(() => _noControlError(dir));
    dir.valueAccessor.registerOnTouched(() => _noControlError(dir));
    dir._rawValidators.forEach((validator) => {
        if (validator.registerOnValidatorChange) {
            validator.registerOnValidatorChange(null);
        }
    });
    dir._rawAsyncValidators.forEach((validator) => {
        if (validator.registerOnValidatorChange) {
            validator.registerOnValidatorChange(null);
        }
    });
    if (control)
        control._clearChangeFns();
}
function setUpViewChangePipeline(control, dir) {
    dir.valueAccessor.registerOnChange((newValue) => {
        control._pendingValue = newValue;
        control._pendingChange = true;
        control._pendingDirty = true;
        if (control.updateOn === 'change')
            updateControl(control, dir);
    });
}
function setUpBlurPipeline(control, dir) {
    dir.valueAccessor.registerOnTouched(() => {
        control._pendingTouched = true;
        if (control.updateOn === 'blur' && control._pendingChange)
            updateControl(control, dir);
        if (control.updateOn !== 'submit')
            control.markAsTouched();
    });
}
function updateControl(control, dir) {
    if (control._pendingDirty)
        control.markAsDirty();
    control.setValue(control._pendingValue, { emitModelToViewChange: false });
    dir.viewToModelUpdate(control._pendingValue);
    control._pendingChange = false;
}
function setUpModelChangePipeline(control, dir) {
    control.registerOnChange((newValue, emitModelEvent) => {
        // control -> view
        dir.valueAccessor.writeValue(newValue);
        // control -> ngModel
        if (emitModelEvent)
            dir.viewToModelUpdate(newValue);
    });
}
export function setUpFormContainer(control, dir) {
    if (control == null)
        _throwError(dir, 'Cannot find control with');
    control.validator = Validators.compose([control.validator, dir.validator]);
    control.asyncValidator = Validators.composeAsync([control.asyncValidator, dir.asyncValidator]);
}
function _noControlError(dir) {
    return _throwError(dir, 'There is no FormControl instance attached to form control element with');
}
function _throwError(dir, message) {
    let messageEnd;
    if (dir.path.length > 1) {
        messageEnd = `path: '${dir.path.join(' -> ')}'`;
    }
    else if (dir.path[0]) {
        messageEnd = `name: '${dir.path}'`;
    }
    else {
        messageEnd = 'unspecified name attribute';
    }
    throw new Error(`${message} ${messageEnd}`);
}
export function composeValidators(validators) {
    return validators != null ? Validators.compose(validators.map(normalizeValidator)) : null;
}
export function composeAsyncValidators(validators) {
    return validators != null ? Validators.composeAsync(validators.map(normalizeAsyncValidator)) :
        null;
}
export function isPropertyUpdated(changes, viewModel) {
    if (!changes.hasOwnProperty('model'))
        return false;
    const change = changes['model'];
    if (change.isFirstChange())
        return true;
    return !looseIdentical(viewModel, change.currentValue);
}
const BUILTIN_ACCESSORS = [
    CheckboxControlValueAccessor,
    RangeValueAccessor,
    NumberValueAccessor,
    SelectControlValueAccessor,
    SelectMultipleControlValueAccessor,
    RadioControlValueAccessor,
];
export function isBuiltInAccessor(valueAccessor) {
    return BUILTIN_ACCESSORS.some(a => valueAccessor.constructor === a);
}
export function syncPendingControls(form, directives) {
    form._syncPendingControls();
    directives.forEach(dir => {
        const control = dir.control;
        if (control.updateOn === 'submit' && control._pendingChange) {
            dir.viewToModelUpdate(control._pendingValue);
            control._pendingChange = false;
        }
    });
}
// TODO: vsavkin remove it once https://github.com/angular/angular/issues/3011 is implemented
export function selectValueAccessor(dir, valueAccessors) {
    if (!valueAccessors)
        return null;
    if (!Array.isArray(valueAccessors))
        _throwError(dir, 'Value accessor was not provided as an array for form control with');
    let defaultAccessor = undefined;
    let builtinAccessor = undefined;
    let customAccessor = undefined;
    valueAccessors.forEach((v) => {
        if (v.constructor === DefaultValueAccessor) {
            defaultAccessor = v;
        }
        else if (isBuiltInAccessor(v)) {
            if (builtinAccessor)
                _throwError(dir, 'More than one built-in value accessor matches form control with');
            builtinAccessor = v;
        }
        else {
            if (customAccessor)
                _throwError(dir, 'More than one custom value accessor matches form control with');
            customAccessor = v;
        }
    });
    if (customAccessor)
        return customAccessor;
    if (builtinAccessor)
        return builtinAccessor;
    if (defaultAccessor)
        return defaultAccessor;
    _throwError(dir, 'No valid value accessor for form control with');
    return null;
}
export function removeDir(list, el) {
    const index = list.indexOf(el);
    if (index > -1)
        list.splice(index, 1);
}
// TODO(kara): remove after deprecation period
export function _ngModelWarning(name, type, instance, warningConfig) {
    if (!isDevMode() || warningConfig === 'never')
        return;
    if (((warningConfig === null || warningConfig === 'once') && !type._ngModelWarningSentOnce) ||
        (warningConfig === 'always' && !instance._ngModelWarningSent)) {
        ReactiveErrors.ngModelWarning(name);
        type._ngModelWarningSentOnce = true;
        instance._ngModelWarningSent = true;
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvZm9ybXMvc3JjL2RpcmVjdGl2ZXMvc2hhcmVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxTQUFTLEVBQUUsZUFBZSxJQUFJLGNBQWMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUczRSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBR3pDLE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBR3ZFLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBRTlELE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQ2xGLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzVELE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBRTFELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUMzRSxPQUFPLEVBQUMsa0NBQWtDLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUk1RixNQUFNLHNCQUFzQixJQUFZLEVBQUUsTUFBd0I7SUFDaEUsT0FBTyxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNsQyxDQUFDO0FBRUQsTUFBTSx1QkFBdUIsT0FBb0IsRUFBRSxHQUFjO0lBQy9ELElBQUksQ0FBQyxPQUFPO1FBQUUsV0FBVyxDQUFDLEdBQUcsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO0lBQzNELElBQUksQ0FBQyxHQUFHLENBQUMs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QUFDLENBQUM7SUFDbEUsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBRUQsTUFBTSxvQkFBdUIsSUFBUyxFQUFFLEVBQUs7SUFDM0MsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMvQixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBRUQsOENBQThDO0FBQzlDLE1BQU0sMEJBQ0YsSUFBWSxFQUFFLElBQXdDLEVBQ3RELFFBQXdDLEVBQUUsYUFBNEI7SUFDeEUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLGFBQWEsS0FBSyxPQUFPO1FBQUUsT0FBTztJQUV0RCxJQUFJLENBQUMsQ0FBQyxhQUFhLEtBQUssSUFBSSxJQUFJLGFBQWEsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQztRQUN2RixDQUFDLGFBQWEsS0FBSyxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsRUFBRTtRQUNqRSxjQUFjLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUM7UUFDcEMsUUFBUSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQztLQUNyQztBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7aXNEZXZNb2RlLCDJtWxvb3NlSWRlbnRpY2FsIGFzIGxvb3NlSWRlbnRpY2FsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtGb3JtQXJyYXksIEZvcm1Db250cm9sLCBGb3JtR3JvdXB9IGZyb20gJy4uL21vZGVsJztcbmltcG9ydCB7VmFsaWRhdG9yc30gZnJvbSAnLi4vdmFsaWRhdG9ycyc7XG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbERpcmVjdGl2ZX0gZnJvbSAnLi9hYnN0cmFjdF9jb250cm9sX2RpcmVjdGl2ZSc7XG5pbXBvcnQge0Fic3RyYWN0Rm9ybUdyb3VwRGlyZWN0aXZlfSBmcm9tICcuL2Fic3RyYWN0X2Zvcm1fZ3JvdXBfZGlyZWN0aXZlJztcbmltcG9ydCB7Q2hlY2tib3hDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9jaGVja2JveF92YWx1ZV9hY2Nlc3Nvcic7XG5pbXBvcnQge0NvbnRyb2xDb250YWluZXJ9IGZyb20gJy4vY29udHJvbF9jb250YWluZXInO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9jb250cm9sX3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7RGVmYXVsdFZhbHVlQWNjZXNzb3J9IGZyb20gJy4vZGVmYXVsdF92YWx1ZV9hY2Nlc3Nvcic7XG5pbXBvcnQge05nQ29udHJvbH0gZnJvbSAnLi9uZ19jb250cm9sJztcbmltcG9ydCB7bm9ybWFsaXplQXN5bmNWYWxpZGF0b3IsIG5vcm1hbGl6ZVZhbGlkYXRvcn0gZnJvbSAnLi9ub3JtYWxpemVfdmFsaWRhdG9yJztcbmltcG9ydCB7TnVtYmVyVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9udW1iZXJfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtSYWRpb0NvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL3JhZGlvX2NvbnRyb2xfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtSYW5nZVZhbHVlQWNjZXNzb3J9IGZyb20gJy4vcmFuZ2VfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtGb3JtQXJyYXlOYW1lfSBmcm9tICcuL3JlYWN0aXZlX2RpcmVjdGl2ZXMvZm9ybV9ncm91cF9uYW1lJztcbmltcG9ydCB7UmVhY3RpdmVFcnJvcnN9IGZyb20gJy4vcmVhY3RpdmVfZXJyb3JzJztcbmltcG9ydCB7U2VsZWN0Q29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJy4vc2VsZWN0X2NvbnRyb2xfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtTZWxlY3RNdWx0aXBsZUNvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL3NlbGVjdF9tdWx0aXBsZV9jb250cm9sX3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7QXN5bmNWYWxpZGF0b3IsIEFzeW5jVmFsaWRhdG9yRm4sIFZhbGlkYXRvciwgVmFsaWRhdG9yRm59IGZyb20gJy4vdmFsaWRhdG9ycyc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnRyb2xQYXRoKG5hbWU6IHN0cmluZywgcGFyZW50OiBDb250cm9sQ29udGFpbmVyKTogc3RyaW5nW10ge1xuICByZXR1cm4gWy4uLnBhcmVudC5wYXRoICEsIG5hbWVdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0VXBDb250cm9sKGNvbnRyb2w6IEZvcm1Db250cm9sLCBkaXI6IE5nQ29udHJvbCk6IHZvaWQge1xuICBpZiAoIWNvbnRyb2wpIF90aHJvd0Vycm9yKGRpciwgJ0Nhbm5vdCBmaW5kIGNvbnRyb2wgd2l0aCcpO1xuICBpZiAoIWRpci52YWx1ZUFjY2Vzc29yKSBfdGhyb3dFcnJvcihkaXIsICdObyB2YWx1ZSBhY2Nlc3NvciBmb3IgZm9ybSBjb250cm9sIHdpdGgnKTtcblxuICBjb250cm9sLnZhbGlkYXRvciA9IFZhbGlkYXRvcnMuY29tcG9zZShbY29udHJvbC52YWxpZGF0b3IgISwgZGlyLnZhbGlkYXRvcl0pO1xuICBjb250cm9sLmFzeW5jVmFsaWRhdG9yID0gVmFsaWRhdG9ycy5jb21wb3NlQXN5bmMoW2NvbnRyb2wuYXN5bmNWYWxpZGF0b3IgISwgZGlyLmFzeW5jVmFsaWRhdG9yXSk7XG4gIGRpci52YWx1ZUFjY2Vzc29yICEud3JpdGVWYWx1ZShjb250cm9sLnZhbHVlKTtcblxuICBzZXRVcFZpZXdDaGFuZ2VQaXBlbGluZShjb250cm9sLCBkaXIpO1xuICBzZXRVcE1vZGVsQ2hhbmdlUGlwZWxpbmUoY29udHJvbCwgZGlyKTtcblxuICBzZXRVcEJsdXJQaXBlbGluZShjb250cm9sLCBkaXIpO1xuXG4gIGlmIChkaXIudmFsdWVBY2Nlc3NvciAhLnNldERpc2FibGVkU3RhdGUpIHtcbiAgICBjb250cm9sLnJlZ2lzdGVyT25EaXNhYmxlZENoYW5nZShcbiAgICAgICAgKGlzRGlzYWJsZWQ6IGJvb2xlYW4pID0+IHsgZGlyLnZhbHVlQWNjZXNzb3IgIS5zZXREaXNhYmxlZFN0YXRlICEoaXNEaXNhYmxlZCk7IH0pO1xuICB9XG5cbiAgLy8gcmUtcnVuIHZhbGlkYXRpb24gd2hlbiB2YWxpZGF0b3IgYmluZGluZyBjaGFuZ2VzLCBlLmcuIG1pbmxlbmd0aD0zIC0+IG1pbmxlbmd0aD00XG4gIGRpci5fcmF3VmFsaWRhdG9ycy5mb3JFYWNoKCh2YWxpZGF0b3I6IFZhbGlkYXRvciB8IFZhbGlkYXRvckZuKSA9PiB7XG4gICAgaWYgKCg8VmFsaWRhdG9yPnZhbGlkYXRvcikucmVnaXN0ZXJPblZhbGlkYXRvckNoYW5nZSlcbiAgICAgICg8VmFsaWRhdG9yPnZhbGlkYXRvcikucmVnaXN0ZXJPblZhbGlkYXRvckNoYW5nZSAhKCgpID0+IGNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpKTtcbiAgfSk7XG5cbiAgZGlyLl9yYXdBc3luY1ZhbGlkYXRvcnMuZm9yRWFjaCgodmFsaWRhdG9yOiBBc3luY1ZhbGlkYXRvciB8IEFzeW5jVmFsaWRhdG9yRm4pID0+IHtcbiAgICBpZiAoKDxWYWxpZGF0b3I+dmFsaWRhdG9yKS5yZWdpc3Rlck9uVmFsaWRhdG9yQ2hhbmdlKVxuICAgICAgKDxWYWxpZGF0b3I+dmFsaWRhdG9yKS5yZWdpc3Rlck9uVmFsaWRhdG9yQ2hhbmdlICEoKCkgPT4gY29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCkpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFuVXBDb250cm9sKGNvbnRyb2w6IEZvcm1Db250cm9sLCBkaXI6IE5nQ29udHJvbCkge1xuICBkaXIudmFsdWVBY2Nlc3NvciAhLnJlZ2lzdGVyT25DaGFuZ2UoKCkgPT4gX25vQ29udHJvbEVycm9yKGRpcikpO1xuICBkaXIudmFsdWVBY2Nlc3NvciAhLnJlZ2lzdGVyT25Ub3VjaGVkKCgpID0+IF9ub0NvbnRyb2xFcnJvcihkaXIpKTtcblxuICBkaXIuX3Jhd1ZhbGlkYXRvcnMuZm9yRWFjaCgodmFsaWRhdG9yOiBhbnkpID0+IHtcbiAgICBpZiAodmFsaWRhdG9yLnJlZ2lzdGVyT25WYWxpZGF0b3JDaGFuZ2UpIHtcbiAgICAgIHZhbGlkYXRvci5yZWdpc3Rlck9uVmFsaWRhdG9yQ2hhbmdlKG51bGwpO1xuICAgIH1cbiAgfSk7XG5cbiAgZGlyLl9yYXdBc3luY1ZhbGlkYXRvcnMuZm9yRWFjaCgodmFsaWRhdG9yOiBhbnkpID0+IHtcbiAgICBpZiAodmFsaWRhdG9yLnJlZ2lzdGVyT25WYWxpZGF0b3JDaGFuZ2UpIHtcbiAgICAgIHZhbGlkYXRvci5yZWdpc3Rlck9uVmFsaWRhdG9yQ2hhbmdlKG51bGwpO1xuICAgIH1cbiAgfSk7XG5cbiAgaWYgKGNvbnRyb2wpIGNvbnRyb2wuX2NsZWFyQ2hhbmdlRm5zKCk7XG59XG5cbmZ1bmN0aW9uIHNldFVwVmlld0NoYW5nZVBpcGVsaW5lKGNvbnRyb2w6IEZvcm1Db250cm9sLCBkaXI6IE5nQ29udHJvbCk6IHZvaWQge1xuICBkaXIudmFsdWVBY2Nlc3NvciAhLnJlZ2lzdGVyT25DaGFuZ2UoKG5ld1ZhbHVlOiBhbnkpID0+IHtcbiAgICBjb250cm9sLl9wZW5kaW5nVmFsdWUgPSBuZXdWYWx1ZTtcbiAgICBjb250cm9sLl9wZW5kaW5nQ2hhbmdlID0gdHJ1ZTtcbiAgICBjb250cm9sLl9wZW5kaW5nRGlydHkgPSB0cnVlO1xuXG4gICAgaWYgKGNvbnRyb2wudXBkYXRlT24gPT09ICdjaGFuZ2UnKSB1cGRhdGVDb250cm9sKGNvbnRyb2wsIGRpcik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZXRVcEJsdXJQaXBlbGluZShjb250cm9sOiBGb3JtQ29udHJvbCwgZGlyOiBOZ0NvbnRyb2wpOiB2b2lkIHtcbiAgZGlyLnZhbHVlQWNjZXNzb3IgIS5yZWdpc3Rlck9uVG91Y2hlZCgoKSA9PiB7XG4gICAgY29udHJvbC5fcGVuZGluZ1RvdWNoZWQgPSB0cnVlO1xuXG4gICAgaWYgKGNvbnRyb2wudXBkYXRlT24gPT09ICdibHVyJyAmJiBjb250cm9sLl9wZW5kaW5nQ2hhbmdlKSB1cGRhdGVDb250cm9sKGNvbnRyb2wsIGRpcik7XG4gICAgaWYgKGNvbnRyb2wudXBkYXRlT24gIT09ICdzdWJtaXQnKSBjb250cm9sLm1hcmtBc1RvdWNoZWQoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNvbnRyb2woY29udHJvbDogRm9ybUNvbnRyb2wsIGRpcjogTmdDb250cm9sKTogdm9pZCB7XG4gIGlmIChjb250cm9sLl9wZW5kaW5nRGlydHkpIGNvbnRyb2wubWFya0FzRGlydHkoKTtcbiAgY29udHJvbC5zZXRWYWx1ZShjb250cm9sLl9wZW5kaW5nVmFsdWUsIHtlbWl0TW9kZWxUb1ZpZXdDaGFuZ2U6IGZhbHNlfSk7XG4gIGRpci52aWV3VG9Nb2RlbFVwZGF0ZShjb250cm9sLl9wZW5kaW5nVmFsdWUpO1xuICBjb250cm9sLl9wZW5kaW5nQ2hhbmdlID0gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHNldFVwTW9kZWxDaGFuZ2VQaXBlbGluZShjb250cm9sOiBGb3JtQ29udHJvbCwgZGlyOiBOZ0NvbnRyb2wpOiB2b2lkIHtcbiAgY29udHJvbC5yZWdpc3Rlck9uQ2hhbmdlKChuZXdWYWx1ZTogYW55LCBlbWl0TW9kZWxFdmVudDogYm9vbGVhbikgPT4ge1xuICAgIC8vIGNvbnRyb2wgLT4gdmlld1xuICAgIGRpci52YWx1ZUFjY2Vzc29yICEud3JpdGVWYWx1ZShuZXdWYWx1ZSk7XG5cbiAgICAvLyBjb250cm9sIC0+IG5nTW9kZWxcbiAgICBpZiAoZW1pdE1vZGVsRXZlbnQpIGRpci52aWV3VG9Nb2RlbFVwZGF0ZShuZXdWYWx1ZSk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0VXBGb3JtQ29udGFpbmVyKFxuICAgIGNvbnRyb2w6IEZvcm1Hcm91cCB8IEZvcm1BcnJheSwgZGlyOiBBYnN0cmFjdEZvcm1Hcm91cERpcmVjdGl2ZSB8IEZvcm1BcnJheU5hbWUpIHtcbiAgaWYgKGNvbnRyb2wgPT0gbnVsbCkgX3Rocm93RXJyb3IoZGlyLCAnQ2Fubm90IGZpbmQgY29udHJvbCB3aXRoJyk7XG4gIGNvbnRyb2wudmFsaWRhdG9yID0gVmFsaWRhdG9ycy5jb21wb3NlKFtjb250cm9sLnZhbGlkYXRvciwgZGlyLnZhbGlkYXRvcl0pO1xuICBjb250cm9sLmFzeW5jVmFsaWRhdG9yID0gVmFsaWRhdG9ycy5jb21wb3NlQXN5bmMoW2NvbnRyb2wuYXN5bmNWYWxpZGF0b3IsIGRpci5hc3luY1ZhbGlkYXRvcl0pO1xufVxuXG5mdW5jdGlvbiBfbm9Db250cm9sRXJyb3IoZGlyOiBOZ0NvbnRyb2wpIHtcbiAgcmV0dXJuIF90aHJvd0Vycm9yKGRpciwgJ1RoZXJlIGlzIG5vIEZvcm1Db250cm9sIGluc3RhbmNlIGF0dGFjaGVkIHRvIGZvcm0gY29udHJvbCBlbGVtZW50IHdpdGgnKTtcbn1cblxuZnVuY3Rpb24gX3Rocm93RXJyb3IoZGlyOiBBYnN0cmFjdENvbnRyb2xEaXJlY3RpdmUsIG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuICBsZXQgbWVzc2FnZUVuZDogc3RyaW5nO1xuICBpZiAoZGlyLnBhdGggIS5sZW5ndGggPiAxKSB7XG4gICAgbWVzc2FnZUVuZCA9IGBwYXRoOiAnJHtkaXIucGF0aCEuam9pbignIC0+ICcpfSdgO1xuICB9IGVsc2UgaWYgKGRpci5wYXRoICFbMF0pIHtcbiAgICBtZXNzYWdlRW5kID0gYG5hbWU6ICcke2Rpci5wYXRofSdgO1xuICB9IGVsc2Uge1xuICAgIG1lc3NhZ2VFbmQgPSAndW5zcGVjaWZpZWQgbmFtZSBhdHRyaWJ1dGUnO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihgJHttZXNzYWdlfSAke21lc3NhZ2VFbmR9YCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wb3NlVmFsaWRhdG9ycyh2YWxpZGF0b3JzOiBBcnJheTxWYWxpZGF0b3J8RnVuY3Rpb24+KTogVmFsaWRhdG9yRm58bnVsbCB7XG4gIHJldHVybiB2YWxpZGF0b3JzICE9IG51bGwgPyBWYWxpZGF0b3JzLmNvbXBvc2UodmFsaWRhdG9ycy5tYXAobm9ybWFsaXplVmFsaWRhdG9yKSkgOiBudWxsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcG9zZUFzeW5jVmFsaWRhdG9ycyh2YWxpZGF0b3JzOiBBcnJheTxWYWxpZGF0b3J8RnVuY3Rpb24+KTogQXN5bmNWYWxpZGF0b3JGbnxcbiAgICBudWxsIHtcbiAgcmV0dXJuIHZhbGlkYXRvcnMgIT0gbnVsbCA/IFZhbGlkYXRvcnMuY29tcG9zZUFzeW5jKHZhbGlkYXRvcnMubWFwKG5vcm1hbGl6ZUFzeW5jVmFsaWRhdG9yKSkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvcGVydHlVcGRhdGVkKGNoYW5nZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9LCB2aWV3TW9kZWw6IGFueSk6IGJvb2xlYW4ge1xuICBpZiAoIWNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ21vZGVsJykpIHJldHVybiBmYWxzZTtcbiAgY29uc3QgY2hhbmdlID0gY2hhbmdlc1snbW9kZWwnXTtcblxuICBpZiAoY2hhbmdlLmlzRmlyc3RDaGFuZ2UoKSkgcmV0dXJuIHRydWU7XG4gIHJldHVybiAhbG9vc2VJZGVudGljYWwodmlld01vZGVsLCBjaGFuZ2UuY3VycmVudFZhbHVlKTtcbn1cblxuY29uc3QgQlVJTFRJTl9BQ0NFU1NPUlMgPSBbXG4gIENoZWNrYm94Q29udHJvbFZhbHVlQWNjZXNzb3IsXG4gIFJhbmdlVmFsdWVBY2Nlc3NvcixcbiAgTnVtYmVyVmFsdWVBY2Nlc3NvcixcbiAgU2VsZWN0Q29udHJvbFZhbHVlQWNjZXNzb3IsXG4gIFNlbGVjdE11bHRpcGxlQ29udHJvbFZhbHVlQWNjZXNzb3IsXG4gIFJhZGlvQ29udHJvbFZhbHVlQWNjZXNzb3IsXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gaXNCdWlsdEluQWNjZXNzb3IodmFsdWVBY2Nlc3NvcjogQ29udHJvbFZhbHVlQWNjZXNzb3IpOiBib29sZWFuIHtcbiAgcmV0dXJuIEJVSUxUSU5fQUNDRVNTT1JTLnNvbWUoYSA9PiB2YWx1ZUFjY2Vzc29yLmNvbnN0cnVjdG9yID09PSBhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN5bmNQZW5kaW5nQ29udHJvbHMoZm9ybTogRm9ybUdyb3VwLCBkaXJlY3RpdmVzOiBOZ0NvbnRyb2xbXSk6IHZvaWQge1xuICBmb3JtLl9zeW5jUGVuZGluZ0NvbnRyb2xzKCk7XG4gIGRpcmVjdGl2ZXMuZm9yRWFjaChkaXIgPT4ge1xuICAgIGNvbnN0IGNvbnRyb2wgPSBkaXIuY29udHJvbCBhcyBGb3JtQ29udHJvbDtcbiAgICBpZiAoY29udHJvbC51cGRhdGVPbiA9PT0gJ3N1Ym1pdCcgJiYgY29udHJvbC5fcGVuZGluZ0NoYW5nZSkge1xuICAgICAgZGlyLnZpZXdUb01vZGVsVXBkYXRlKGNvbnRyb2wuX3BlbmRpbmdWYWx1ZSk7XG4gICAgICBjb250cm9sLl9wZW5kaW5nQ2hhbmdlID0gZmFsc2U7XG4gICAgfVxuICB9KTtcbn1cblxuLy8gVE9ETzogdnNhdmtpbiByZW1vdmUgaXQgb25jZSBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8zMDExIGlzIGltcGxlbWVudGVkXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0VmFsdWVBY2Nlc3NvcihcbiAgICBkaXI6IE5nQ29udHJvbCwgdmFsdWVBY2Nlc3NvcnM6IENvbnRyb2xWYWx1ZUFjY2Vzc29yW10pOiBDb250cm9sVmFsdWVBY2Nlc3NvcnxudWxsIHtcbiAgaWYgKCF2YWx1ZUFjY2Vzc29ycykgcmV0dXJuIG51bGw7XG5cbiAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlQWNjZXNzb3JzKSlcbiAgICBfdGhyb3dFcnJvcihkaXIsICdWYWx1ZSBhY2Nlc3NvciB3YXMgbm90IHByb3ZpZGVkIGFzIGFuIGFycmF5IGZvciBmb3JtIGNvbnRyb2wgd2l0aCcpO1xuXG4gIGxldCBkZWZhdWx0QWNjZXNzb3I6IENvbnRyb2xWYWx1ZUFjY2Vzc29yfHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgbGV0IGJ1aWx0aW5BY2Nlc3NvcjogQ29udHJvbFZhbHVlQWNjZXNzb3J8dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICBsZXQgY3VzdG9tQWNjZXNzb3I6IENvbnRyb2xWYWx1ZUFjY2Vzc29yfHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcblxuICB2YWx1ZUFjY2Vzc29ycy5mb3JFYWNoKCh2OiBDb250cm9sVmFsdWVBY2Nlc3NvcikgPT4ge1xuICAgIGlmICh2LmNvbnN0cnVjdG9yID09PSBEZWZhdWx0VmFsdWVBY2Nlc3Nvcikge1xuICAgICAgZGVmYXVsdEFjY2Vzc29yID0gdjtcblxuICAgIH0gZWxzZSBpZiAoaXNCdWlsdEluQWNjZXNzb3IodikpIHtcbiAgICAgIGlmIChidWlsdGluQWNjZXNzb3IpXG4gICAgICAgIF90aHJvd0Vycm9yKGRpciwgJ01vcmUgdGhhbiBvbmUgYnVpbHQtaW4gdmFsdWUgYWNjZXNzb3IgbWF0Y2hlcyBmb3JtIGNvbnRyb2wgd2l0aCcpO1xuICAgICAgYnVpbHRpbkFjY2Vzc29yID0gdjtcblxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY3VzdG9tQWNjZXNzb3IpXG4gICAgICAgIF90aHJvd0Vycm9yKGRpciwgJ01vcmUgdGhhbiBvbmUgY3VzdG9tIHZhbHVlIGFjY2Vzc29yIG1hdGNoZXMgZm9ybSBjb250cm9sIHdpdGgnKTtcbiAgICAgIGN1c3RvbUFjY2Vzc29yID0gdjtcbiAgICB9XG4gIH0pO1xuXG4gIGlmIChjdXN0b21BY2Nlc3NvcikgcmV0dXJuIGN1c3RvbUFjY2Vzc29yO1xuICBpZiAoYnVpbHRpbkFjY2Vzc29yKSByZXR1cm4gYnVpbHRpbkFjY2Vzc29yO1xuICBpZiAoZGVmYXVsdEFjY2Vzc29yKSByZXR1cm4gZGVmYXVsdEFjY2Vzc29yO1xuXG4gIF90aHJvd0Vycm9yKGRpciwgJ05vIHZhbGlkIHZhbHVlIGFjY2Vzc29yIGZvciBmb3JtIGNvbnRyb2wgd2l0aCcpO1xuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZURpcjxUPihsaXN0OiBUW10sIGVsOiBUKTogdm9pZCB7XG4gIGNvbnN0IGluZGV4ID0gbGlzdC5pbmRleE9mKGVsKTtcbiAgaWYgKGluZGV4ID4gLTEpIGxpc3Quc3BsaWNlKGluZGV4LCAxKTtcbn1cblxuLy8gVE9ETyhrYXJhKTogcmVtb3ZlIGFmdGVyIGRlcHJlY2F0aW9uIHBlcmlvZFxuZXhwb3J0IGZ1bmN0aW9uIF9uZ01vZGVsV2FybmluZyhcbiAgICBuYW1lOiBzdHJpbmcsIHR5cGU6IHtfbmdNb2RlbFdhcm5pbmdTZW50T25jZTogYm9vbGVhbn0sXG4gICAgaW5zdGFuY2U6IHtfbmdNb2RlbFdhcm5pbmdTZW50OiBib29sZWFufSwgd2FybmluZ0NvbmZpZzogc3RyaW5nIHwgbnVsbCkge1xuICBpZiAoIWlzRGV2TW9kZSgpIHx8IHdhcm5pbmdDb25maWcgPT09ICduZXZlcicpIHJldHVybjtcblxuICBpZiAoKCh3YXJuaW5nQ29uZmlnID09PSBudWxsIHx8IHdhcm5pbmdDb25maWcgPT09ICdvbmNlJykgJiYgIXR5cGUuX25nTW9kZWxXYXJuaW5nU2VudE9uY2UpIHx8XG4gICAgICAod2FybmluZ0NvbmZpZyA9PT0gJ2Fsd2F5cycgJiYgIWluc3RhbmNlLl9uZ01vZGVsV2FybmluZ1NlbnQpKSB7XG4gICAgUmVhY3RpdmVFcnJvcnMubmdNb2RlbFdhcm5pbmcobmFtZSk7XG4gICAgdHlwZS5fbmdNb2RlbFdhcm5pbmdTZW50T25jZSA9IHRydWU7XG4gICAgaW5zdGFuY2UuX25nTW9kZWxXYXJuaW5nU2VudCA9IHRydWU7XG4gIH1cbn1cbiJdfQ==