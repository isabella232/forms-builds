import { __extends } from "tslib";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, EventEmitter, Host, Inject, Input, Optional, Output, Self, forwardRef } from '@angular/core';
import { FormControl } from '../model';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS } from '../validators';
import { AbstractFormGroupDirective } from './abstract_form_group_directive';
import { ControlContainer } from './control_container';
import { NG_VALUE_ACCESSOR } from './control_value_accessor';
import { NgControl } from './ng_control';
import { NgForm } from './ng_form';
import { NgModelGroup } from './ng_model_group';
import { composeAsyncValidators, composeValidators, controlPath, isPropertyUpdated, selectValueAccessor, setUpControl } from './shared';
import { TemplateDrivenErrors } from './template_driven_errors';
import * as i0 from "@angular/core";
import * as i1 from "./control_container";
export var formControlBinding = {
    provide: NgControl,
    useExisting: forwardRef(function () { return NgModel; })
};
/**
 * `ngModel` forces an additional change detection run when its inputs change:
 * E.g.:
 * ```
 * <div>{{myModel.valid}}</div>
 * <input [(ngModel)]="myValue" #myModel="ngModel">
 * ```
 * I.e. `ngModel` can export itself on the element and then be used in the template.
 * Normally, this would result in expressions before the `input` that use the exported directive
 * to have and old value as they have been
 * dirty checked before. As this is a very common case for `ngModel`, we added this second change
 * detection run.
 *
 * Notes:
 * - this is just one extra run no matter how many `ngModel` have been changed.
 * - this is a general problem when using `exportAs` for directives!
 */
var resolvedPromise = (function () { return Promise.resolve(null); })();
/**
 * @description
 * Creates a `FormControl` instance from a domain model and binds it
 * to a form control element.
 *
 * The `FormControl` instance tracks the value, user interaction, and
 * validation status of the control and keeps the view synced with the model. If used
 * within a parent form, the directive also registers itself with the form as a child
 * control.
 *
 * This directive is used by itself or as part of a larger form. Use the
 * `ngModel` selector to activate it.
 *
 * It accepts a domain model as an optional `Input`. If you have a one-way binding
 * to `ngModel` with `[]` syntax, changing the value of the domain model in the component
 * class sets the value in the view. If you have a two-way binding with `[()]` syntax
 * (also known as 'banana-box syntax'), the value in the UI always syncs back to
 * the domain model in your class.
 *
 * To inspect the properties of the associated `FormControl` (like validity state),
 * export the directive into a local template variable using `ngModel` as the key (ex: `#myVar="ngModel"`).
 * You then access the control using the directive's `control` property,
 * but most properties used (like `valid` and `dirty`) fall through to the control anyway for direct access.
 * See a full list of properties directly available in `AbstractControlDirective`.
 *
 * @see `RadioControlValueAccessor`
 * @see `SelectControlValueAccessor`
 *
 * @usageNotes
 *
 * ### Using ngModel on a standalone control
 *
 * The following examples show a simple standalone control using `ngModel`:
 *
 * {@example forms/ts/simpleNgModel/simple_ng_model_example.ts region='Component'}
 *
 * When using the `ngModel` within `<form>` tags, you'll also need to supply a `name` attribute
 * so that the control can be registered with the parent form under that name.
 *
 * In the context of a parent form, it's often unnecessary to include one-way or two-way binding,
 * as the parent form syncs the value for you. You access its properties by exporting it into a
 * local template variable using `ngForm` such as (`#f="ngForm"`). Use the variable where
 * needed on form submission.
 *
 * If you do need to populate initial values into your form, using a one-way binding for
 * `ngModel` tends to be sufficient as long as you use the exported form's value rather
 * than the domain model's value on submit.
 *
 * ### Using ngModel within a form
 *
 * The following example shows controls using `ngModel` within a form:
 *
 * {@example forms/ts/simpleForm/simple_form_example.ts region='Component'}
 *
 * ### Using a standalone ngModel within a group
 *
 * The following example shows you how to use a standalone ngModel control
 * within a form. This controls the display of the form, but doesn't contain form data.
 *
 * ```html
 * <form>
 *   <input name="login" ngModel placeholder="Login">
 *   <input type="checkbox" ngModel [ngModelOptions]="{standalone: true}"> Show more options?
 * </form>
 * <!-- form value: {login: ''} -->
 * ```
 *
 * ### Setting the ngModel name attribute through options
 *
 * The following example shows you an alternate way to set the name attribute. The name attribute is used
 * within a custom form component, and the name `@Input` property serves a different purpose.
 *
 * ```html
 * <form>
 *   <my-person-control name="Nancy" ngModel [ngModelOptions]="{name: 'user'}">
 *   </my-person-control>
 * </form>
 * <!-- form value: {user: ''} -->
 * ```
 *
 * @ngModule FormsModule
 * @publicApi
 */
var NgModel = /** @class */ (function (_super) {
    __extends(NgModel, _super);
    function NgModel(parent, validators, asyncValidators, valueAccessors) {
        var _this = _super.call(this) || this;
        _this.control = new FormControl();
        /** @internal */
        _this._registered = false;
        /**
         * @description
         * Event emitter for producing the `ngModelChange` event after
         * the view model updates.
         */
        _this.update = new EventEmitter();
        _this._parent = parent;
        _this._rawValidators = validators || [];
        _this._rawAsyncValidators = asyncValidators || [];
        _this.valueAccessor = selectValueAccessor(_this, valueAccessors);
        return _this;
    }
    /**
     * @description
     * A lifecycle method called when the directive's inputs change. For internal use
     * only.
     *
     * @param changes A object of key/value pairs for the set of changed inputs.
     */
    NgModel.prototype.ngOnChanges = function (changes) {
        this._checkForErrors();
        if (!this._registered)
            this._setUpControl();
        if ('isDisabled' in changes) {
            this._updateDisabled(changes);
        }
        if (isPropertyUpdated(changes, this.viewModel)) {
            this._updateValue(this.model);
            this.viewModel = this.model;
        }
    };
    /**
     * @description
     * Lifecycle method called before the directive's instance is destroyed. For internal
     * use only.
     */
    NgModel.prototype.ngOnDestroy = function () { this.formDirective && this.formDirective.removeControl(this); };
    Object.defineProperty(NgModel.prototype, "path", {
        /**
         * @description
         * Returns an array that represents the path from the top-level form to this control.
         * Each index is the string name of the control on that level.
         */
        get: function () {
            return this._parent ? controlPath(this.name, this._parent) : [this.name];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgModel.prototype, "formDirective", {
        /**
         * @description
         * The top-level directive for this control if present, otherwise null.
         */
        get: function () { return this._parent ? this._parent.formDirective : null; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgModel.prototype, "validator", {
        /**
         * @description
         * Synchronous validator function composed of all the synchronous validators
         * registered with this directive.
         */
        get: function () { return composeValidators(this._rawValidators); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgModel.prototype, "asyncValidator", {
        /**
         * @description
         * Async validator function composed of all the async validators registered with this
         * directive.
         */
        get: function () {
            return composeAsyncValidators(this._rawAsyncValidators);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @description
     * Sets the new value for the view model and emits an `ngModelChange` event.
     *
     * @param newValue The new value emitted by `ngModelChange`.
     */
    NgModel.prototype.viewToModelUpdate = function (newValue) {
        this.viewModel = newValue;
        this.update.emit(newValue);
    };
    NgModel.prototype._setUpControl = function () {
        this._setUpdateStrategy();
        this._isStandalone() ? this._setUpStandalone() :
            this.formDirective.addControl(this);
        this._registered = true;
    };
    NgModel.prototype._setUpdateStrategy = function () {
        if (this.options && this.options.updateOn != null) {
            this.control._updateOn = this.options.updateOn;
        }
    };
    NgModel.prototype._isStandalone = function () {
        return !this._parent || !!(this.options && this.options.standalone);
    };
    NgModel.prototype._setUpStandalone = function () {
        setUpControl(this.control, this);
        this.control.updateValueAndValidity({ emitEvent: false });
    };
    NgModel.prototype._checkForErrors = function () {
        if (!this._isStandalone()) {
            this._checkParentType();
        }
        this._checkName();
    };
    NgModel.prototype._checkParentType = function () {
        if (!(this._parent instanceof NgModelGroup) &&
            this._parent instanceof AbstractFormGroupDirective) {
            TemplateDrivenErrors.formGroupNameException();
        }
        else if (!(this._parent instanceof NgModelGroup) && !(this._parent instanceof NgForm)) {
            TemplateDrivenErrors.modelParentException();
        }
    };
    NgModel.prototype._checkName = function () {
        if (this.options && this.options.name)
            this.name = this.options.name;
        if (!this._isStandalone() && !this.name) {
            TemplateDrivenErrors.missingNameException();
        }
    };
    NgModel.prototype._updateValue = function (value) {
        var _this = this;
        resolvedPromise.then(function () { _this.control.setValue(value, { emitViewToModelChange: false }); });
    };
    NgModel.prototype._updateDisabled = function (changes) {
        var _this = this;
        var disabledValue = changes['isDisabled'].currentValue;
        var isDisabled = disabledValue === '' || (disabledValue && disabledValue !== 'false');
        resolvedPromise.then(function () {
            if (isDisabled && !_this.control.disabled) {
                _this.control.disable();
            }
            else if (!isDisabled && _this.control.disabled) {
                _this.control.enable();
            }
        });
    };
    NgModel.ɵfac = function NgModel_Factory(t) { return new (t || NgModel)(i0.ɵɵdirectiveInject(i1.ControlContainer, 9), i0.ɵɵdirectiveInject(NG_VALIDATORS, 10), i0.ɵɵdirectiveInject(NG_ASYNC_VALIDATORS, 10), i0.ɵɵdirectiveInject(NG_VALUE_ACCESSOR, 10)); };
    NgModel.ɵdir = i0.ɵɵdefineDirective({ type: NgModel, selectors: [["", "ngModel", "", 3, "formControlName", "", 3, "formControl", ""]], inputs: { name: "name", isDisabled: ["disabled", "isDisabled"], model: ["ngModel", "model"], options: ["ngModelOptions", "options"] }, outputs: { update: "ngModelChange" }, exportAs: ["ngModel"], features: [i0.ɵɵProvidersFeature([formControlBinding]), i0.ɵɵInheritDefinitionFeature, i0.ɵɵNgOnChangesFeature()] });
    return NgModel;
}(NgControl));
export { NgModel };
/*@__PURE__*/ i0.ɵsetClassMetadata(NgModel, [{
        type: Directive,
        args: [{
                selector: '[ngModel]:not([formControlName]):not([formControl])',
                providers: [formControlBinding],
                exportAs: 'ngModel'
            }]
    }], function () { return [{ type: i1.ControlContainer, decorators: [{
                type: Optional
            }, {
                type: Host
            }] }, { type: Array, decorators: [{
                type: Optional
            }, {
                type: Self
            }, {
                type: Inject,
                args: [NG_VALIDATORS]
            }] }, { type: Array, decorators: [{
                type: Optional
            }, {
                type: Self
            }, {
                type: Inject,
                args: [NG_ASYNC_VALIDATORS]
            }] }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Self
            }, {
                type: Inject,
                args: [NG_VALUE_ACCESSOR]
            }] }]; }, { name: [{
            type: Input
        }], isDisabled: [{
            type: Input,
            args: ['disabled']
        }], model: [{
            type: Input,
            args: ['ngModel']
        }], options: [{
            type: Input,
            args: ['ngModelOptions']
        }], update: [{
            type: Output,
            args: ['ngModelChange']
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9mb3Jtcy9zcmMvZGlyZWN0aXZlcy9uZ19tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQXdCLFFBQVEsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFpQixVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFcEosT0FBTyxFQUFDLFdBQVcsRUFBWSxNQUFNLFVBQVUsQ0FBQztBQUNoRCxPQUFPLEVBQUMsbUJBQW1CLEVBQUUsYUFBYSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWpFLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQzNFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRixPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDakMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxzQkFBc0IsRUFBRSxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUUsWUFBWSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ3RJLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDOzs7QUFHOUQsTUFBTSxDQUFDLElBQU0sa0JBQWtCLEdBQVE7SUFDckMsT0FBTyxFQUFFLFNBQVM7SUFDbEIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsT0FBTyxFQUFQLENB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QUFPLENBQUMsUUFBUSxFQUFFO2dCQUN4QyxLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ3hCO2lCQUFNLElBQUksQ0FBQyxVQUFVLElBQUksS0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7Z0JBQy9DLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDdkI7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7a0VBN01GLE9BQU8scUVBNERzQixhQUFhLDRCQUNiLG1CQUFtQiw0QkFDbkIsaUJBQWlCO2dEQTlEOUMsT0FBTyx5VEFIUCxDQUFDLGtCQUFrQixDQUFDO2tCQXBJakM7Q0FxVkMsQUFuTkQsQ0FLNkIsU0FBUyxHQThNckM7U0E5TVksT0FBTzttQ0FBUCxPQUFPO2NBTG5CLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUscURBQXFEO2dCQUMvRCxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztnQkFDL0IsUUFBUSxFQUFFLFNBQVM7YUFDcEI7O3NCQTREYyxRQUFROztzQkFBSSxJQUFJOzBCQUNzQyxLQUFLO3NCQUEzRCxRQUFROztzQkFBSSxJQUFJOztzQkFBSSxNQUFNO3VCQUFDLGFBQWE7MEJBQ3lCLEtBQUs7c0JBQXRFLFFBQVE7O3NCQUFJLElBQUk7O3NCQUFJLE1BQU07dUJBQUMsbUJBQW1COztzQkFDOUMsUUFBUTs7c0JBQUksSUFBSTs7c0JBQUksTUFBTTt1QkFBQyxpQkFBaUI7O2tCQTVDeEQsS0FBSzs7a0JBT0wsS0FBSzttQkFBQyxVQUFVOztrQkFNaEIsS0FBSzttQkFBQyxTQUFTOztrQkFrQmYsS0FBSzttQkFBQyxnQkFBZ0I7O2tCQVF0QixNQUFNO21CQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIEhvc3QsIEluamVjdCwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPcHRpb25hbCwgT3V0cHV0LCBTZWxmLCBTaW1wbGVDaGFuZ2VzLCBmb3J3YXJkUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtGb3JtQ29udHJvbCwgRm9ybUhvb2tzfSBmcm9tICcuLi9tb2RlbCc7XG5pbXBvcnQge05HX0FTWU5DX1ZBTElEQVRPUlMsIE5HX1ZBTElEQVRPUlN9IGZyb20gJy4uL3ZhbGlkYXRvcnMnO1xuXG5pbXBvcnQge0Fic3RyYWN0Rm9ybUdyb3VwRGlyZWN0aXZlfSBmcm9tICcuL2Fic3RyYWN0X2Zvcm1fZ3JvdXBfZGlyZWN0aXZlJztcbmltcG9ydCB7Q29udHJvbENvbnRhaW5lcn0gZnJvbSAnLi9jb250cm9sX2NvbnRhaW5lcic7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnLi9jb250cm9sX3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7TmdDb250cm9sfSBmcm9tICcuL25nX2NvbnRyb2wnO1xuaW1wb3J0IHtOZ0Zvcm19IGZyb20gJy4vbmdfZm9ybSc7XG5pbXBvcnQge05nTW9kZWxHcm91cH0gZnJvbSAnLi9uZ19tb2RlbF9ncm91cCc7XG5pbXBvcnQge2NvbXBvc2VBc3luY1ZhbGlkYXRvcnMsIGNvbXBvc2VWYWxpZGF0b3JzLCBjb250cm9sUGF0aCwgaXNQcm9wZXJ0eVVwZGF0ZWQsIHNlbGVjdFZhbHVlQWNjZXNzb3IsIHNldFVwQ29udHJvbH0gZnJvbSAnLi9zaGFyZWQnO1xuaW1wb3J0IHtUZW1wbGF0ZURyaXZlbkVycm9yc30gZnJvbSAnLi90ZW1wbGF0ZV9kcml2ZW5fZXJyb3JzJztcbmltcG9ydCB7QXN5bmNWYWxpZGF0b3IsIEFzeW5jVmFsaWRhdG9yRm4sIFZhbGlkYXRvciwgVmFsaWRhdG9yRm59IGZyb20gJy4vdmFsaWRhdG9ycyc7XG5cbmV4cG9ydCBjb25zdCBmb3JtQ29udHJvbEJpbmRpbmc6IGFueSA9IHtcbiAgcHJvdmlkZTogTmdDb250cm9sLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ01vZGVsKVxufTtcblxuLyoqXG4gKiBgbmdNb2RlbGAgZm9yY2VzIGFuIGFkZGl0aW9uYWwgY2hhbmdlIGRldGVjdGlvbiBydW4gd2hlbiBpdHMgaW5wdXRzIGNoYW5nZTpcbiAqIEUuZy46XG4gKiBgYGBcbiAqIDxkaXY+e3tteU1vZGVsLnZhbGlkfX08L2Rpdj5cbiAqIDxpbnB1dCBbKG5nTW9kZWwpXT1cIm15VmFsdWVcIiAjbXlNb2RlbD1cIm5nTW9kZWxcIj5cbiAqIGBgYFxuICogSS5lLiBgbmdNb2RlbGAgY2FuIGV4cG9ydCBpdHNlbGYgb24gdGhlIGVsZW1lbnQgYW5kIHRoZW4gYmUgdXNlZCBpbiB0aGUgdGVtcGxhdGUuXG4gKiBOb3JtYWxseSwgdGhpcyB3b3VsZCByZXN1bHQgaW4gZXhwcmVzc2lvbnMgYmVmb3JlIHRoZSBgaW5wdXRgIHRoYXQgdXNlIHRoZSBleHBvcnRlZCBkaXJlY3RpdmVcbiAqIHRvIGhhdmUgYW5kIG9sZCB2YWx1ZSBhcyB0aGV5IGhhdmUgYmVlblxuICogZGlydHkgY2hlY2tlZCBiZWZvcmUuIEFzIHRoaXMgaXMgYSB2ZXJ5IGNvbW1vbiBjYXNlIGZvciBgbmdNb2RlbGAsIHdlIGFkZGVkIHRoaXMgc2Vjb25kIGNoYW5nZVxuICogZGV0ZWN0aW9uIHJ1bi5cbiAqXG4gKiBOb3RlczpcbiAqIC0gdGhpcyBpcyBqdXN0IG9uZSBleHRyYSBydW4gbm8gbWF0dGVyIGhvdyBtYW55IGBuZ01vZGVsYCBoYXZlIGJlZW4gY2hhbmdlZC5cbiAqIC0gdGhpcyBpcyBhIGdlbmVyYWwgcHJvYmxlbSB3aGVuIHVzaW5nIGBleHBvcnRBc2AgZm9yIGRpcmVjdGl2ZXMhXG4gKi9cbmNvbnN0IHJlc29sdmVkUHJvbWlzZSA9ICgoKSA9PiBQcm9taXNlLnJlc29sdmUobnVsbCkpKCk7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDcmVhdGVzIGEgYEZvcm1Db250cm9sYCBpbnN0YW5jZSBmcm9tIGEgZG9tYWluIG1vZGVsIGFuZCBiaW5kcyBpdFxuICogdG8gYSBmb3JtIGNvbnRyb2wgZWxlbWVudC5cbiAqXG4gKiBUaGUgYEZvcm1Db250cm9sYCBpbnN0YW5jZSB0cmFja3MgdGhlIHZhbHVlLCB1c2VyIGludGVyYWN0aW9uLCBhbmRcbiAqIHZhbGlkYXRpb24gc3RhdHVzIG9mIHRoZSBjb250cm9sIGFuZCBrZWVwcyB0aGUgdmlldyBzeW5jZWQgd2l0aCB0aGUgbW9kZWwuIElmIHVzZWRcbiAqIHdpdGhpbiBhIHBhcmVudCBmb3JtLCB0aGUgZGlyZWN0aXZlIGFsc28gcmVnaXN0ZXJzIGl0c2VsZiB3aXRoIHRoZSBmb3JtIGFzIGEgY2hpbGRcbiAqIGNvbnRyb2wuXG4gKlxuICogVGhpcyBkaXJlY3RpdmUgaXMgdXNlZCBieSBpdHNlbGYgb3IgYXMgcGFydCBvZiBhIGxhcmdlciBmb3JtLiBVc2UgdGhlXG4gKiBgbmdNb2RlbGAgc2VsZWN0b3IgdG8gYWN0aXZhdGUgaXQuXG4gKlxuICogSXQgYWNjZXB0cyBhIGRvbWFpbiBtb2RlbCBhcyBhbiBvcHRpb25hbCBgSW5wdXRgLiBJZiB5b3UgaGF2ZSBhIG9uZS13YXkgYmluZGluZ1xuICogdG8gYG5nTW9kZWxgIHdpdGggYFtdYCBzeW50YXgsIGNoYW5naW5nIHRoZSB2YWx1ZSBvZiB0aGUgZG9tYWluIG1vZGVsIGluIHRoZSBjb21wb25lbnRcbiAqIGNsYXNzIHNldHMgdGhlIHZhbHVlIGluIHRoZSB2aWV3LiBJZiB5b3UgaGF2ZSBhIHR3by13YXkgYmluZGluZyB3aXRoIGBbKCldYCBzeW50YXhcbiAqIChhbHNvIGtub3duIGFzICdiYW5hbmEtYm94IHN5bnRheCcpLCB0aGUgdmFsdWUgaW4gdGhlIFVJIGFsd2F5cyBzeW5jcyBiYWNrIHRvXG4gKiB0aGUgZG9tYWluIG1vZGVsIGluIHlvdXIgY2xhc3MuXG4gKlxuICogVG8gaW5zcGVjdCB0aGUgcHJvcGVydGllcyBvZiB0aGUgYXNzb2NpYXRlZCBgRm9ybUNvbnRyb2xgIChsaWtlIHZhbGlkaXR5IHN0YXRlKSwgXG4gKiBleHBvcnQgdGhlIGRpcmVjdGl2ZSBpbnRvIGEgbG9jYWwgdGVtcGxhdGUgdmFyaWFibGUgdXNpbmcgYG5nTW9kZWxgIGFzIHRoZSBrZXkgKGV4OiBgI215VmFyPVwibmdNb2RlbFwiYCkuXG4gKiBZb3UgdGhlbiBhY2Nlc3MgdGhlIGNvbnRyb2wgdXNpbmcgdGhlIGRpcmVjdGl2ZSdzIGBjb250cm9sYCBwcm9wZXJ0eSwgXG4gKiBidXQgbW9zdCBwcm9wZXJ0aWVzIHVzZWQgKGxpa2UgYHZhbGlkYCBhbmQgYGRpcnR5YCkgZmFsbCB0aHJvdWdoIHRvIHRoZSBjb250cm9sIGFueXdheSBmb3IgZGlyZWN0IGFjY2Vzcy4gXG4gKiBTZWUgYSBmdWxsIGxpc3Qgb2YgcHJvcGVydGllcyBkaXJlY3RseSBhdmFpbGFibGUgaW4gYEFic3RyYWN0Q29udHJvbERpcmVjdGl2ZWAuXG4gKlxuICogQHNlZSBgUmFkaW9Db250cm9sVmFsdWVBY2Nlc3NvcmAgXG4gKiBAc2VlIGBTZWxlY3RDb250cm9sVmFsdWVBY2Nlc3NvcmBcbiAqIFxuICogQHVzYWdlTm90ZXNcbiAqIFxuICogIyMjIFVzaW5nIG5nTW9kZWwgb24gYSBzdGFuZGFsb25lIGNvbnRyb2xcbiAqXG4gKiBUaGUgZm9sbG93aW5nIGV4YW1wbGVzIHNob3cgYSBzaW1wbGUgc3RhbmRhbG9uZSBjb250cm9sIHVzaW5nIGBuZ01vZGVsYDpcbiAqXG4gKiB7QGV4YW1wbGUgZm9ybXMvdHMvc2ltcGxlTmdNb2RlbC9zaW1wbGVfbmdfbW9kZWxfZXhhbXBsZS50cyByZWdpb249J0NvbXBvbmVudCd9XG4gKlxuICogV2hlbiB1c2luZyB0aGUgYG5nTW9kZWxgIHdpdGhpbiBgPGZvcm0+YCB0YWdzLCB5b3UnbGwgYWxzbyBuZWVkIHRvIHN1cHBseSBhIGBuYW1lYCBhdHRyaWJ1dGVcbiAqIHNvIHRoYXQgdGhlIGNvbnRyb2wgY2FuIGJlIHJlZ2lzdGVyZWQgd2l0aCB0aGUgcGFyZW50IGZvcm0gdW5kZXIgdGhhdCBuYW1lLlxuICpcbiAqIEluIHRoZSBjb250ZXh0IG9mIGEgcGFyZW50IGZvcm0sIGl0J3Mgb2Z0ZW4gdW5uZWNlc3NhcnkgdG8gaW5jbHVkZSBvbmUtd2F5IG9yIHR3by13YXkgYmluZGluZywgXG4gKiBhcyB0aGUgcGFyZW50IGZvcm0gc3luY3MgdGhlIHZhbHVlIGZvciB5b3UuIFlvdSBhY2Nlc3MgaXRzIHByb3BlcnRpZXMgYnkgZXhwb3J0aW5nIGl0IGludG8gYSBcbiAqIGxvY2FsIHRlbXBsYXRlIHZhcmlhYmxlIHVzaW5nIGBuZ0Zvcm1gIHN1Y2ggYXMgKGAjZj1cIm5nRm9ybVwiYCkuIFVzZSB0aGUgdmFyaWFibGUgd2hlcmUgXG4gKiBuZWVkZWQgb24gZm9ybSBzdWJtaXNzaW9uLlxuICpcbiAqIElmIHlvdSBkbyBuZWVkIHRvIHBvcHVsYXRlIGluaXRpYWwgdmFsdWVzIGludG8geW91ciBmb3JtLCB1c2luZyBhIG9uZS13YXkgYmluZGluZyBmb3JcbiAqIGBuZ01vZGVsYCB0ZW5kcyB0byBiZSBzdWZmaWNpZW50IGFzIGxvbmcgYXMgeW91IHVzZSB0aGUgZXhwb3J0ZWQgZm9ybSdzIHZhbHVlIHJhdGhlclxuICogdGhhbiB0aGUgZG9tYWluIG1vZGVsJ3MgdmFsdWUgb24gc3VibWl0LlxuICogXG4gKiAjIyMgVXNpbmcgbmdNb2RlbCB3aXRoaW4gYSBmb3JtXG4gKlxuICogVGhlIGZvbGxvd2luZyBleGFtcGxlIHNob3dzIGNvbnRyb2xzIHVzaW5nIGBuZ01vZGVsYCB3aXRoaW4gYSBmb3JtOlxuICpcbiAqIHtAZXhhbXBsZSBmb3Jtcy90cy9zaW1wbGVGb3JtL3NpbXBsZV9mb3JtX2V4YW1wbGUudHMgcmVnaW9uPSdDb21wb25lbnQnfVxuICogXG4gKiAjIyMgVXNpbmcgYSBzdGFuZGFsb25lIG5nTW9kZWwgd2l0aGluIGEgZ3JvdXBcbiAqIFxuICogVGhlIGZvbGxvd2luZyBleGFtcGxlIHNob3dzIHlvdSBob3cgdG8gdXNlIGEgc3RhbmRhbG9uZSBuZ01vZGVsIGNvbnRyb2xcbiAqIHdpdGhpbiBhIGZvcm0uIFRoaXMgY29udHJvbHMgdGhlIGRpc3BsYXkgb2YgdGhlIGZvcm0sIGJ1dCBkb2Vzbid0IGNvbnRhaW4gZm9ybSBkYXRhLlxuICpcbiAqIGBgYGh0bWxcbiAqIDxmb3JtPlxuICogICA8aW5wdXQgbmFtZT1cImxvZ2luXCIgbmdNb2RlbCBwbGFjZWhvbGRlcj1cIkxvZ2luXCI+XG4gKiAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuZ01vZGVsIFtuZ01vZGVsT3B0aW9uc109XCJ7c3RhbmRhbG9uZTogdHJ1ZX1cIj4gU2hvdyBtb3JlIG9wdGlvbnM/XG4gKiA8L2Zvcm0+XG4gKiA8IS0tIGZvcm0gdmFsdWU6IHtsb2dpbjogJyd9IC0tPlxuICogYGBgXG4gKiBcbiAqICMjIyBTZXR0aW5nIHRoZSBuZ01vZGVsIG5hbWUgYXR0cmlidXRlIHRocm91Z2ggb3B0aW9uc1xuICogXG4gKiBUaGUgZm9sbG93aW5nIGV4YW1wbGUgc2hvd3MgeW91IGFuIGFsdGVybmF0ZSB3YXkgdG8gc2V0IHRoZSBuYW1lIGF0dHJpYnV0ZS4gVGhlIG5hbWUgYXR0cmlidXRlIGlzIHVzZWRcbiAqIHdpdGhpbiBhIGN1c3RvbSBmb3JtIGNvbXBvbmVudCwgYW5kIHRoZSBuYW1lIGBASW5wdXRgIHByb3BlcnR5IHNlcnZlcyBhIGRpZmZlcmVudCBwdXJwb3NlLlxuICpcbiAqIGBgYGh0bWxcbiAqIDxmb3JtPlxuICogICA8bXktcGVyc29uLWNvbnRyb2wgbmFtZT1cIk5hbmN5XCIgbmdNb2RlbCBbbmdNb2RlbE9wdGlvbnNdPVwie25hbWU6ICd1c2VyJ31cIj5cbiAqICAgPC9teS1wZXJzb24tY29udHJvbD5cbiAqIDwvZm9ybT5cbiAqIDwhLS0gZm9ybSB2YWx1ZToge3VzZXI6ICcnfSAtLT5cbiAqIGBgYFxuICpcbiAqIEBuZ01vZHVsZSBGb3Jtc01vZHVsZVxuICogQHB1YmxpY0FwaVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdNb2RlbF06bm90KFtmb3JtQ29udHJvbE5hbWVdKTpub3QoW2Zvcm1Db250cm9sXSknLFxuICBwcm92aWRlcnM6IFtmb3JtQ29udHJvbEJpbmRpbmddLFxuICBleHBvcnRBczogJ25nTW9kZWwnXG59KVxuZXhwb3J0IGNsYXNzIE5nTW9kZWwgZXh0ZW5kcyBOZ0NvbnRyb2wgaW1wbGVtZW50cyBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95IHtcbiAgcHVibGljIHJlYWRvbmx5IGNvbnRyb2w6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCk7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX3JlZ2lzdGVyZWQgPSBmYWxzZTtcblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEludGVybmFsIHJlZmVyZW5jZSB0byB0aGUgdmlldyBtb2RlbCB2YWx1ZS5cbiAgICovXG4gIHZpZXdNb2RlbDogYW55O1xuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVHJhY2tzIHRoZSBuYW1lIGJvdW5kIHRvIHRoZSBkaXJlY3RpdmUuIFRoZSBwYXJlbnQgZm9ybVxuICAgKiB1c2VzIHRoaXMgbmFtZSBhcyBhIGtleSB0byByZXRyaWV2ZSB0aGlzIGNvbnRyb2wncyB2YWx1ZS5cbiAgICovXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBASW5wdXQoKSBuYW1lICE6IHN0cmluZztcblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRyYWNrcyB3aGV0aGVyIHRoZSBjb250cm9sIGlzIGRpc2FibGVkLlxuICAgKi9cbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIEBJbnB1dCgnZGlzYWJsZWQnKSBpc0Rpc2FibGVkICE6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUcmFja3MgdGhlIHZhbHVlIGJvdW5kIHRvIHRoaXMgZGlyZWN0aXZlLlxuICAgKi9cbiAgQElucHV0KCduZ01vZGVsJykgbW9kZWw6IGFueTtcblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRyYWNrcyB0aGUgY29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB0aGlzIGBuZ01vZGVsYCBpbnN0YW5jZS5cbiAgICpcbiAgICogKipuYW1lKio6IEFuIGFsdGVybmF0aXZlIHRvIHNldHRpbmcgdGhlIG5hbWUgYXR0cmlidXRlIG9uIHRoZSBmb3JtIGNvbnRyb2wgZWxlbWVudC4gU2VlXG4gICAqIHRoZSBbZXhhbXBsZV0oYXBpL2Zvcm1zL05nTW9kZWwjdXNpbmctbmdtb2RlbC1vbi1hLXN0YW5kYWxvbmUtY29udHJvbCkgZm9yIHVzaW5nIGBOZ01vZGVsYFxuICAgKiBhcyBhIHN0YW5kYWxvbmUgY29udHJvbC5cbiAgICpcbiAgICogKipzdGFuZGFsb25lKio6IFdoZW4gc2V0IHRvIHRydWUsIHRoZSBgbmdNb2RlbGAgd2lsbCBub3QgcmVnaXN0ZXIgaXRzZWxmIHdpdGggaXRzIHBhcmVudCBmb3JtLFxuICAgKiBhbmQgYWN0cyBhcyBpZiBpdCdzIG5vdCBpbiB0aGUgZm9ybS4gRGVmYXVsdHMgdG8gZmFsc2UuXG4gICAqXG4gICAqICoqdXBkYXRlT24qKjogRGVmaW5lcyB0aGUgZXZlbnQgdXBvbiB3aGljaCB0aGUgZm9ybSBjb250cm9sIHZhbHVlIGFuZCB2YWxpZGl0eSB1cGRhdGUuXG4gICAqIERlZmF1bHRzIHRvICdjaGFuZ2UnLiBQb3NzaWJsZSB2YWx1ZXM6IGAnY2hhbmdlJ2AgfCBgJ2JsdXInYCB8IGAnc3VibWl0J2AuXG4gICAqXG4gICAqL1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQElucHV0KCduZ01vZGVsT3B0aW9ucycpXG4gIG9wdGlvbnMgIToge25hbWU/OiBzdHJpbmcsIHN0YW5kYWxvbmU/OiBib29sZWFuLCB1cGRhdGVPbj86IEZvcm1Ib29rc307XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBFdmVudCBlbWl0dGVyIGZvciBwcm9kdWNpbmcgdGhlIGBuZ01vZGVsQ2hhbmdlYCBldmVudCBhZnRlclxuICAgKiB0aGUgdmlldyBtb2RlbCB1cGRhdGVzLlxuICAgKi9cbiAgQE91dHB1dCgnbmdNb2RlbENoYW5nZScpIHVwZGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBASG9zdCgpIHBhcmVudDogQ29udHJvbENvbnRhaW5lcixcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBASW5qZWN0KE5HX1ZBTElEQVRPUlMpIHZhbGlkYXRvcnM6IEFycmF5PFZhbGlkYXRvcnxWYWxpZGF0b3JGbj4sXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgQEluamVjdChOR19BU1lOQ19WQUxJREFUT1JTKSBhc3luY1ZhbGlkYXRvcnM6IEFycmF5PEFzeW5jVmFsaWRhdG9yfEFzeW5jVmFsaWRhdG9yRm4+LFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIEBJbmplY3QoTkdfVkFMVUVfQUNDRVNTT1IpXG4gICAgICAgICAgICAgIHZhbHVlQWNjZXNzb3JzOiBDb250cm9sVmFsdWVBY2Nlc3NvcltdKSB7XG4gICAgICAgICAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmF3VmFsaWRhdG9ycyA9IHZhbGlkYXRvcnMgfHwgW107XG4gICAgICAgICAgICAgICAgdGhpcy5fcmF3QXN5bmNWYWxpZGF0b3JzID0gYXN5bmNWYWxpZGF0b3JzIHx8IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWVBY2Nlc3NvciA9IHNlbGVjdFZhbHVlQWNjZXNzb3IodGhpcywgdmFsdWVBY2Nlc3NvcnMpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAgICAgICAgICAgKiBBIGxpZmVjeWNsZSBtZXRob2QgY2FsbGVkIHdoZW4gdGhlIGRpcmVjdGl2ZSdzIGlucHV0cyBjaGFuZ2UuIEZvciBpbnRlcm5hbCB1c2VcbiAgICAgICAgICAgICAgICogb25seS5cbiAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICogQHBhcmFtIGNoYW5nZXMgQSBvYmplY3Qgb2Yga2V5L3ZhbHVlIHBhaXJzIGZvciB0aGUgc2V0IG9mIGNoYW5nZWQgaW5wdXRzLlxuICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrRm9yRXJyb3JzKCk7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9yZWdpc3RlcmVkKSB0aGlzLl9zZXRVcENvbnRyb2woKTtcbiAgICAgICAgICAgICAgICBpZiAoJ2lzRGlzYWJsZWQnIGluIGNoYW5nZXMpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZURpc2FibGVkKGNoYW5nZXMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpc1Byb3BlcnR5VXBkYXRlZChjaGFuZ2VzLCB0aGlzLnZpZXdNb2RlbCkpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVZhbHVlKHRoaXMubW9kZWwpO1xuICAgICAgICAgICAgICAgICAgdGhpcy52aWV3TW9kZWwgPSB0aGlzLm1vZGVsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgICAgICAgICAgICogTGlmZWN5Y2xlIG1ldGhvZCBjYWxsZWQgYmVmb3JlIHRoZSBkaXJlY3RpdmUncyBpbnN0YW5jZSBpcyBkZXN0cm95ZWQuIEZvciBpbnRlcm5hbFxuICAgICAgICAgICAgICAgKiB1c2Ugb25seS5cbiAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgIG5nT25EZXN0cm95KCk6IHZvaWQgeyB0aGlzLmZvcm1EaXJlY3RpdmUgJiYgdGhpcy5mb3JtRGlyZWN0aXZlLnJlbW92ZUNvbnRyb2wodGhpcyk7IH1cblxuICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICogQGRlc2NyaXB0aW9uXG4gICAgICAgICAgICAgICAqIFJldHVybnMgYW4gYXJyYXkgdGhhdCByZXByZXNlbnRzIHRoZSBwYXRoIGZyb20gdGhlIHRvcC1sZXZlbCBmb3JtIHRvIHRoaXMgY29udHJvbC5cbiAgICAgICAgICAgICAgICogRWFjaCBpbmRleCBpcyB0aGUgc3RyaW5nIG5hbWUgb2YgdGhlIGNvbnRyb2wgb24gdGhhdCBsZXZlbC5cbiAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgIGdldCBwYXRoKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50ID8gY29udHJvbFBhdGgodGhpcy5uYW1lLCB0aGlzLl9wYXJlbnQpIDogW3RoaXMubmFtZV07XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICogQGRlc2NyaXB0aW9uXG4gICAgICAgICAgICAgICAqIFRoZSB0b3AtbGV2ZWwgZGlyZWN0aXZlIGZvciB0aGlzIGNvbnRyb2wgaWYgcHJlc2VudCwgb3RoZXJ3aXNlIG51bGwuXG4gICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICBnZXQgZm9ybURpcmVjdGl2ZSgpOiBhbnkgeyByZXR1cm4gdGhpcy5fcGFyZW50ID8gdGhpcy5fcGFyZW50LmZvcm1EaXJlY3RpdmUgOiBudWxsOyB9XG5cbiAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAgICAgICAgICAgKiBTeW5jaHJvbm91cyB2YWxpZGF0b3IgZnVuY3Rpb24gY29tcG9zZWQgb2YgYWxsIHRoZSBzeW5jaHJvbm91cyB2YWxpZGF0b3JzXG4gICAgICAgICAgICAgICAqIHJlZ2lzdGVyZWQgd2l0aCB0aGlzIGRpcmVjdGl2ZS5cbiAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgIGdldCB2YWxpZGF0b3IoKTogVmFsaWRhdG9yRm58bnVsbCB7IHJldHVybiBjb21wb3NlVmFsaWRhdG9ycyh0aGlzLl9yYXdWYWxpZGF0b3JzKTsgfVxuXG4gICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgICAgICAgICAgICogQXN5bmMgdmFsaWRhdG9yIGZ1bmN0aW9uIGNvbXBvc2VkIG9mIGFsbCB0aGUgYXN5bmMgdmFsaWRhdG9ycyByZWdpc3RlcmVkIHdpdGggdGhpc1xuICAgICAgICAgICAgICAgKiBkaXJlY3RpdmUuXG4gICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICBnZXQgYXN5bmNWYWxpZGF0b3IoKTogQXN5bmNWYWxpZGF0b3JGbnxudWxsIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tcG9zZUFzeW5jVmFsaWRhdG9ycyh0aGlzLl9yYXdBc3luY1ZhbGlkYXRvcnMpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAgICAgICAgICAgKiBTZXRzIHRoZSBuZXcgdmFsdWUgZm9yIHRoZSB2aWV3IG1vZGVsIGFuZCBlbWl0cyBhbiBgbmdNb2RlbENoYW5nZWAgZXZlbnQuXG4gICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAqIEBwYXJhbSBuZXdWYWx1ZSBUaGUgbmV3IHZhbHVlIGVtaXR0ZWQgYnkgYG5nTW9kZWxDaGFuZ2VgLlxuICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgdmlld1RvTW9kZWxVcGRhdGUobmV3VmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICAgICAgICAgIHRoaXMudmlld01vZGVsID0gbmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGUuZW1pdChuZXdWYWx1ZSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBwcml2YXRlIF9zZXRVcENvbnRyb2woKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2V0VXBkYXRlU3RyYXRlZ3koKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9pc1N0YW5kYWxvbmUoKSA/IHRoaXMuX3NldFVwU3RhbmRhbG9uZSgpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybURpcmVjdGl2ZS5hZGRDb250cm9sKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlZ2lzdGVyZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcHJpdmF0ZSBfc2V0VXBkYXRlU3RyYXRlZ3koKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMudXBkYXRlT24gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5jb250cm9sLl91cGRhdGVPbiA9IHRoaXMub3B0aW9ucy51cGRhdGVPbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBwcml2YXRlIF9pc1N0YW5kYWxvbmUoKTogYm9vbGVhbiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICF0aGlzLl9wYXJlbnQgfHwgISEodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5zdGFuZGFsb25lKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHByaXZhdGUgX3NldFVwU3RhbmRhbG9uZSgpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICBzZXRVcENvbnRyb2wodGhpcy5jb250cm9sLCB0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2wudXBkYXRlVmFsdWVBbmRWYWxpZGl0eSh7ZW1pdEV2ZW50OiBmYWxzZX0pO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcHJpdmF0ZSBfY2hlY2tGb3JFcnJvcnMoKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9pc1N0YW5kYWxvbmUoKSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5fY2hlY2tQYXJlbnRUeXBlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrTmFtZSgpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcHJpdmF0ZSBfY2hlY2tQYXJlbnRUeXBlKCk6IHZvaWQge1xuICAgICAgICAgICAgICAgIGlmICghKHRoaXMuX3BhcmVudCBpbnN0YW5jZW9mIE5nTW9kZWxHcm91cCkgJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGFyZW50IGluc3RhbmNlb2YgQWJzdHJhY3RGb3JtR3JvdXBEaXJlY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgIFRlbXBsYXRlRHJpdmVuRXJyb3JzLmZvcm1Hcm91cE5hbWVFeGNlcHRpb24oKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgICAgICAhKHRoaXMuX3BhcmVudCBpbnN0YW5jZW9mIE5nTW9kZWxHcm91cCkgJiYgISh0aGlzLl9wYXJlbnQgaW5zdGFuY2VvZiBOZ0Zvcm0pKSB7XG4gICAgICAgICAgICAgICAgICBUZW1wbGF0ZURyaXZlbkVycm9ycy5tb2RlbFBhcmVudEV4Y2VwdGlvbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHByaXZhdGUgX2NoZWNrTmFtZSgpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5uYW1lKSB0aGlzLm5hbWUgPSB0aGlzLm9wdGlvbnMubmFtZTtcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5faXNTdGFuZGFsb25lKCkgJiYgIXRoaXMubmFtZSkge1xuICAgICAgICAgICAgICAgICAgVGVtcGxhdGVEcml2ZW5FcnJvcnMubWlzc2luZ05hbWVFeGNlcHRpb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBwcml2YXRlIF91cGRhdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZWRQcm9taXNlLnRoZW4oXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHsgdGhpcy5jb250cm9sLnNldFZhbHVlKHZhbHVlLCB7ZW1pdFZpZXdUb01vZGVsQ2hhbmdlOiBmYWxzZX0pOyB9KTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHByaXZhdGUgX3VwZGF0ZURpc2FibGVkKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXNhYmxlZFZhbHVlID0gY2hhbmdlc1snaXNEaXNhYmxlZCddLmN1cnJlbnRWYWx1ZTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGlzRGlzYWJsZWQgPVxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZFZhbHVlID09PSAnJyB8fCAoZGlzYWJsZWRWYWx1ZSAmJiBkaXNhYmxlZFZhbHVlICE9PSAnZmFsc2UnKTtcblxuICAgICAgICAgICAgICAgIHJlc29sdmVkUHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChpc0Rpc2FibGVkICYmICF0aGlzLmNvbnRyb2wuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250cm9sLmRpc2FibGUoKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIWlzRGlzYWJsZWQgJiYgdGhpcy5jb250cm9sLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbC5lbmFibGUoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxufVxuIl19