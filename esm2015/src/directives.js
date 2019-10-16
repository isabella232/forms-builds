/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CheckboxControlValueAccessor } from './directives/checkbox_value_accessor';
import { DefaultValueAccessor } from './directives/default_value_accessor';
import { NgControlStatus, NgControlStatusGroup } from './directives/ng_control_status';
import { NgForm } from './directives/ng_form';
import { NgModel } from './directives/ng_model';
import { NgModelGroup } from './directives/ng_model_group';
import { NgNoValidate } from './directives/ng_no_validate_directive';
import { NumberValueAccessor } from './directives/number_value_accessor';
import { RadioControlValueAccessor } from './directives/radio_control_value_accessor';
import { RangeValueAccessor } from './directives/range_value_accessor';
import { FormControlDirective } from './directives/reactive_directives/form_control_directive';
import { FormControlName } from './directives/reactive_directives/form_control_name';
import { FormGroupDirective } from './directives/reactive_directives/form_group_directive';
import { FormArrayName, FormGroupName } from './directives/reactive_directives/form_group_name';
import { NgSelectOption, SelectControlValueAccessor } from './directives/select_control_value_accessor';
import { NgSelectMultipleOption, SelectMultipleControlValueAccessor } from './directives/select_multiple_control_value_accessor';
import { CheckboxRequiredValidator, EmailValidator, MaxLengthValidator, MinLengthValidator, PatternValidator, RequiredValidator } from './directives/validators';
import * as i0 from "@angular/core";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export { CheckboxControlValueAccessor } from './directives/checkbox_value_accessor';
export { DefaultValueAccessor } from './directives/default_value_accessor';
export { NgControl } from './directives/ng_control';
export { NgControlStatus, NgControlStatusGroup } from './directives/ng_control_status';
export { NgForm } from './directives/ng_form';
export { NgModel } from './directives/ng_model';
export { NgModelGroup } from './directives/ng_model_group';
export { NumberValueAccessor } from './directives/number_value_accessor';
export { RadioControlValueAccessor } from './directives/radio_control_value_accessor';
export { RangeValueAccessor } from './directives/range_value_accessor';
export { FormControlDirective, NG_MODEL_WITH_FORM_CONTROL_WARNING } from './directives/reactive_directives/form_control_directive';
export { FormControlName } from './directives/reactive_directives/form_control_name';
export { FormGroupDirective } from './directives/reactive_directives/form_group_directive';
export { FormArrayName, FormGroupName } from './directives/reactive_directives/form_group_name';
export { NgSelectOption, SelectControlValueAccessor } from './directives/select_control_value_accessor';
export { NgSelectMultipleOption, SelectMultipleControlValueAccessor } from './directives/select_multiple_control_value_accessor';
/** @type {?} */
export const SHARED_FORM_DIRECTIVES = [
    NgNoValidate,
    NgSelectOption,
    NgSelectMultipleOption,
    DefaultValueAccessor,
    NumberValueAccessor,
    RangeValueAccessor,
    CheckboxControlValueAccessor,
    SelectControlValueAccessor,
    SelectMultipleControlValueAccessor,
    RadioControlValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    RequiredValidator,
    MinLengthValidator,
    MaxLengthValidator,
    PatternValidator,
    CheckboxRequiredValidator,
    EmailValidator,
];
/** @type {?} */
export const TEMPLATE_DRIVEN_DIRECTIVES = [NgModel, NgModelGroup, NgForm];
/** @type {?} */
export const REACTIVE_DRIVEN_DIRECTIVES = [FormControlDirective, FormGroupDirective, FormControlName, FormGroupName, FormArrayName];
/**
 * Internal module used for sharing directives between FormsModule and ReactiveFormsModule
 */
export class ɵInternalFormsSharedModule {
}
ɵInternalFormsSharedModule.decorators = [
    { type: NgModule, args: [{
                declarations: SHARED_FORM_DIRECTIVES,
                exports: SHARED_FORM_DIRECTIVES,
            },] },
];
/** @nocollapse */ ɵInternalFormsSharedModule.ɵmod = i0.ɵɵdefineNgModule({ type: ɵInternalFormsSharedModule });
/** @nocollapse */ ɵInternalFormsSharedModule.ɵinj = i0.ɵɵdefineInjector({ factory: function ɵInternalFormsSharedModule_Factory(t) { return new (t || ɵInternalFormsSharedModule)(); } });
/*@__PURE__*/ i0.ɵɵsetNgModuleScope(ɵInternalFormsSharedModule, { declarations: [NgNoValidate,
        NgSelectOption,
        NgSelectMultipleOption,
        DefaultValueAccessor,
        NumberValueAccessor,
        RangeValueAccessor,
        CheckboxControlValueAccessor,
        SelectControlValueAccessor,
        SelectMultipleControlValueAccessor,
        RadioControlValueAccessor,
        NgControlStatus,
        NgControlStatusGroup,
        RequiredValidator,
        MinLengthValidator,
        MaxLengthValidator,
        PatternValidator,
        CheckboxRequiredValidator,
        EmailValidator], exports: [NgNoValidate,
        NgSelectOption,
        NgSelectMultipleOption,
        DefaultValueAccessor,
        NumberValueAccessor,
        RangeValueAccessor,
        CheckboxControlValueAccessor,
        SelectControlValueAccessor,
        SelectMultipleControlValueAccessor,
        RadioControlValueAccessor,
        NgControlStatus,
        NgControlStatusGroup,
        RequiredValidator,
        MinLengthValidator,
        MaxLengthValidator,
        PatternValidator,
        CheckboxRequiredValidator,
        EmailValidator] });
/*@__PURE__*/ i0.ɵsetClassMetadata(ɵInternalFormsSharedModule, [{
        type: NgModule,
        args: [{
                declarations: SHARED_FORM_DIRECTIVES,
                exports: SHARED_FORM_DIRECTIVES,
            }]
    }], null, null);
export { ɵInternalFormsSharedModule as InternalFormsSharedModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Zvcm1zL3NyYy9kaXJlY3RpdmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFRQSxPQUFPLEVBQUMsUUFBUSxFQUFPLE1BQU0sZUFBZSxDQUFDO0FBRTdDLE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQ2xGLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxlQUFlLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNyRixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDNUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzlDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFDbkUsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFDdkUsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFDcEYsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDckUsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0seURBQXlELENBQUM7QUFDN0YsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLG9EQUFvRCxDQUFDO0FBQ25GLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHVEQUF1RCxDQUFDO0FBQ3pGLE9BQU8sRUFBQyxhQUFhLEVBQUUsYUFBYSxFQUFDLE1BQU0sa0RBQWtELENBQUM7QUFDOUYsT0FBTyxFQUFDLGNBQWMsRUFBRSwwQkFBMEIsRUFBQyxNQUFNLDRDQUE0QyxDQUFDO0FBQ3RHLE9BQU8sRUFBQyxzQkFBc0Is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QkFBeUI7UUFDekIsZUFBZTtRQUNmLG9CQUFvQjtRQUNwQixpQkFBaUI7UUFDakIsa0JBQWtCO1FBQ2xCLGtCQUFrQjtRQUNsQixnQkFBZ0I7UUFDaEIseUJBQXlCO1FBQ3pCLGNBQWM7bUNBZUgsMEJBQTBCO2NBSnRDLFFBQVE7ZUFBQztnQkFDUixZQUFZLEVBQUUsc0JBQXNCO2dCQUNwQyxPQUFPLEVBQUUsc0JBQXNCO2FBQ2hDOztBQUlELE9BQU8sRUFBQywwQkFBMEIsSUFBSSx5QkFBeUIsRUFBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge05nTW9kdWxlLCBUeXBlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtDaGVja2JveENvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL2RpcmVjdGl2ZXMvY2hlY2tib3hfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtEZWZhdWx0VmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9kaXJlY3RpdmVzL2RlZmF1bHRfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtOZ0NvbnRyb2xTdGF0dXMsIE5nQ29udHJvbFN0YXR1c0dyb3VwfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmdfY29udHJvbF9zdGF0dXMnO1xuaW1wb3J0IHtOZ0Zvcm19IGZyb20gJy4vZGlyZWN0aXZlcy9uZ19mb3JtJztcbmltcG9ydCB7TmdNb2RlbH0gZnJvbSAnLi9kaXJlY3RpdmVzL25nX21vZGVsJztcbmltcG9ydCB7TmdNb2RlbEdyb3VwfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmdfbW9kZWxfZ3JvdXAnO1xuaW1wb3J0IHtOZ05vVmFsaWRhdGV9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ19ub192YWxpZGF0ZV9kaXJlY3RpdmUnO1xuaW1wb3J0IHtOdW1iZXJWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL2RpcmVjdGl2ZXMvbnVtYmVyX3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7UmFkaW9Db250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9kaXJlY3RpdmVzL3JhZGlvX2NvbnRyb2xfdmFsdWVfYWNjZXNzb3InO1xuaW1wb3J0IHtSYW5nZVZhbHVlQWNjZXNzb3J9IGZyb20gJy4vZGlyZWN0aXZlcy9yYW5nZV92YWx1ZV9hY2Nlc3Nvcic7XG5pbXBvcnQge0Zvcm1Db250cm9sRGlyZWN0aXZlfSBmcm9tICcuL2RpcmVjdGl2ZXMvcmVhY3RpdmVfZGlyZWN0aXZlcy9mb3JtX2NvbnRyb2xfZGlyZWN0aXZlJztcbmltcG9ydCB7Rm9ybUNvbnRyb2xOYW1lfSBmcm9tICcuL2RpcmVjdGl2ZXMvcmVhY3RpdmVfZGlyZWN0aXZlcy9mb3JtX2NvbnRyb2xfbmFtZSc7XG5pbXBvcnQge0Zvcm1Hcm91cERpcmVjdGl2ZX0gZnJvbSAnLi9kaXJlY3RpdmVzL3JlYWN0aXZlX2RpcmVjdGl2ZXMvZm9ybV9ncm91cF9kaXJlY3RpdmUnO1xuaW1wb3J0IHtGb3JtQXJyYXlOYW1lLCBGb3JtR3JvdXBOYW1lfSBmcm9tICcuL2RpcmVjdGl2ZXMvcmVhY3RpdmVfZGlyZWN0aXZlcy9mb3JtX2dyb3VwX25hbWUnO1xuaW1wb3J0IHtOZ1NlbGVjdE9wdGlvbiwgU2VsZWN0Q29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJy4vZGlyZWN0aXZlcy9zZWxlY3RfY29udHJvbF92YWx1ZV9hY2Nlc3Nvcic7XG5pbXBvcnQge05nU2VsZWN0TXVsdGlwbGVPcHRpb24sIFNlbGVjdE11bHRpcGxlQ29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJy4vZGlyZWN0aXZlcy9zZWxlY3RfbXVsdGlwbGVfY29udHJvbF92YWx1ZV9hY2Nlc3Nvcic7XG5pbXBvcnQge0NoZWNrYm94UmVxdWlyZWRWYWxpZGF0b3IsIEVtYWlsVmFsaWRhdG9yLCBNYXhMZW5ndGhWYWxpZGF0b3IsIE1pbkxlbmd0aFZhbGlkYXRvciwgUGF0dGVyblZhbGlkYXRvciwgUmVxdWlyZWRWYWxpZGF0b3J9IGZyb20gJy4vZGlyZWN0aXZlcy92YWxpZGF0b3JzJztcblxuZXhwb3J0IHtDaGVja2JveENvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL2RpcmVjdGl2ZXMvY2hlY2tib3hfdmFsdWVfYWNjZXNzb3InO1xuZXhwb3J0IHtDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9kaXJlY3RpdmVzL2NvbnRyb2xfdmFsdWVfYWNjZXNzb3InO1xuZXhwb3J0IHtEZWZhdWx0VmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9kaXJlY3RpdmVzL2RlZmF1bHRfdmFsdWVfYWNjZXNzb3InO1xuZXhwb3J0IHtOZ0NvbnRyb2x9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ19jb250cm9sJztcbmV4cG9ydCB7TmdDb250cm9sU3RhdHVzLCBOZ0NvbnRyb2xTdGF0dXNHcm91cH0gZnJvbSAnLi9kaXJlY3RpdmVzL25nX2NvbnRyb2xfc3RhdHVzJztcbmV4cG9ydCB7TmdGb3JtfSBmcm9tICcuL2RpcmVjdGl2ZXMvbmdfZm9ybSc7XG5leHBvcnQge05nTW9kZWx9IGZyb20gJy4vZGlyZWN0aXZlcy9uZ19tb2RlbCc7XG5leHBvcnQge05nTW9kZWxHcm91cH0gZnJvbSAnLi9kaXJlY3RpdmVzL25nX21vZGVsX2dyb3VwJztcbmV4cG9ydCB7TnVtYmVyVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnLi9kaXJlY3RpdmVzL251bWJlcl92YWx1ZV9hY2Nlc3Nvcic7XG5leHBvcnQge1JhZGlvQ29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJy4vZGlyZWN0aXZlcy9yYWRpb19jb250cm9sX3ZhbHVlX2FjY2Vzc29yJztcbmV4cG9ydCB7UmFuZ2VWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL2RpcmVjdGl2ZXMvcmFuZ2VfdmFsdWVfYWNjZXNzb3InO1xuZXhwb3J0IHtGb3JtQ29udHJvbERpcmVjdGl2ZSwgTkdfTU9ERUxfV0lUSF9GT1JNX0NPTlRST0xfV0FSTklOR30gZnJvbSAnLi9kaXJlY3RpdmVzL3JlYWN0aXZlX2RpcmVjdGl2ZXMvZm9ybV9jb250cm9sX2RpcmVjdGl2ZSc7XG5leHBvcnQge0Zvcm1Db250cm9sTmFtZX0gZnJvbSAnLi9kaXJlY3RpdmVzL3JlYWN0aXZlX2RpcmVjdGl2ZXMvZm9ybV9jb250cm9sX25hbWUnO1xuZXhwb3J0IHtGb3JtR3JvdXBEaXJlY3RpdmV9IGZyb20gJy4vZGlyZWN0aXZlcy9yZWFjdGl2ZV9kaXJlY3RpdmVzL2Zvcm1fZ3JvdXBfZGlyZWN0aXZlJztcbmV4cG9ydCB7Rm9ybUFycmF5TmFtZSwgRm9ybUdyb3VwTmFtZX0gZnJvbSAnLi9kaXJlY3RpdmVzL3JlYWN0aXZlX2RpcmVjdGl2ZXMvZm9ybV9ncm91cF9uYW1lJztcbmV4cG9ydCB7TmdTZWxlY3RPcHRpb24sIFNlbGVjdENvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL2RpcmVjdGl2ZXMvc2VsZWN0X2NvbnRyb2xfdmFsdWVfYWNjZXNzb3InO1xuZXhwb3J0IHtOZ1NlbGVjdE11bHRpcGxlT3B0aW9uLCBTZWxlY3RNdWx0aXBsZUNvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICcuL2RpcmVjdGl2ZXMvc2VsZWN0X211bHRpcGxlX2NvbnRyb2xfdmFsdWVfYWNjZXNzb3InO1xuXG5leHBvcnQgY29uc3QgU0hBUkVEX0ZPUk1fRElSRUNUSVZFUzogVHlwZTxhbnk+W10gPSBbXG4gIE5nTm9WYWxpZGF0ZSxcbiAgTmdTZWxlY3RPcHRpb24sXG4gIE5nU2VsZWN0TXVsdGlwbGVPcHRpb24sXG4gIERlZmF1bHRWYWx1ZUFjY2Vzc29yLFxuICBOdW1iZXJWYWx1ZUFjY2Vzc29yLFxuICBSYW5nZVZhbHVlQWNjZXNzb3IsXG4gIENoZWNrYm94Q29udHJvbFZhbHVlQWNjZXNzb3IsXG4gIFNlbGVjdENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBTZWxlY3RNdWx0aXBsZUNvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBSYWRpb0NvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICBOZ0NvbnRyb2xTdGF0dXMsXG4gIE5nQ29udHJvbFN0YXR1c0dyb3VwLFxuICBSZXF1aXJlZFZhbGlkYXRvcixcbiAgTWluTGVuZ3RoVmFsaWRhdG9yLFxuICBNYXhMZW5ndGhWYWxpZGF0b3IsXG4gIFBhdHRlcm5WYWxpZGF0b3IsXG4gIENoZWNrYm94UmVxdWlyZWRWYWxpZGF0b3IsXG4gIEVtYWlsVmFsaWRhdG9yLFxuXTtcblxuZXhwb3J0IGNvbnN0IFRFTVBMQVRFX0RSSVZFTl9ESVJFQ1RJVkVTOiBUeXBlPGFueT5bXSA9IFtOZ01vZGVsLCBOZ01vZGVsR3JvdXAsIE5nRm9ybV07XG5cbmV4cG9ydCBjb25zdCBSRUFDVElWRV9EUklWRU5fRElSRUNUSVZFUzogVHlwZTxhbnk+W10gPVxuICAgIFtGb3JtQ29udHJvbERpcmVjdGl2ZSwgRm9ybUdyb3VwRGlyZWN0aXZlLCBGb3JtQ29udHJvbE5hbWUsIEZvcm1Hcm91cE5hbWUsIEZvcm1BcnJheU5hbWVdO1xuXG4vKipcbiAqIEludGVybmFsIG1vZHVsZSB1c2VkIGZvciBzaGFyaW5nIGRpcmVjdGl2ZXMgYmV0d2VlbiBGb3Jtc01vZHVsZSBhbmQgUmVhY3RpdmVGb3Jtc01vZHVsZVxuICovXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFNIQVJFRF9GT1JNX0RJUkVDVElWRVMsXG4gIGV4cG9ydHM6IFNIQVJFRF9GT1JNX0RJUkVDVElWRVMsXG59KVxuZXhwb3J0IGNsYXNzIMm1SW50ZXJuYWxGb3Jtc1NoYXJlZE1vZHVsZSB7XG59XG5cbmV4cG9ydCB7ybVJbnRlcm5hbEZvcm1zU2hhcmVkTW9kdWxlIGFzIEludGVybmFsRm9ybXNTaGFyZWRNb2R1bGV9O1xuIl19