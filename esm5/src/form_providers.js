import * as i0 from "@angular/core";
import * as i1 from "./directives/ng_model";
import * as i2 from "./directives/ng_model_group";
import * as i3 from "./directives/ng_form";
import * as i4 from "./directives";
import * as i5 from "./directives/reactive_directives/form_control_directive";
import * as i6 from "./directives/reactive_directives/form_group_directive";
import * as i7 from "./directives/reactive_directives/form_control_name";
import * as i8 from "./directives/reactive_directives/form_group_name";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { InternalFormsSharedModule, NG_MODEL_WITH_FORM_CONTROL_WARNING, REACTIVE_DRIVEN_DIRECTIVES, TEMPLATE_DRIVEN_DIRECTIVES } from './directives';
import { RadioControlRegistry } from './directives/radio_control_value_accessor';
import { FormBuilder } from './form_builder';
/**
 * The ng module for forms.
 *
 */
var FormsModule = /** @class */ (function () {
    function FormsModule() {
    }
    FormsModule.ngModuleDef = i0.ɵdefineNgModule({ type: FormsModule, bootstrap: [], declarations: [i1.NgModel, i2.NgModelGroup, i3.NgForm], imports: [], exports: [i4.InternalFormsSharedModule, i1.NgModel, i2.NgModelGroup, i3.NgForm] });
    FormsModule.ngInjectorDef = i0.defineInjector({ factory: function FormsModule_Factory() { return new FormsModule(); }, providers: [RadioControlRegistry], imports: [i4.InternalFormsSharedModule, i1.NgModel, i2.NgModelGroup, i3.NgForm] });
    return FormsModule;
}());
export { FormsModule };
/**
 * The ng module for reactive forms.
 *
 */
var ReactiveFormsModule = /** @class */ (function () {
    function ReactiveFormsModule() {
    }
    ReactiveFormsModule.withConfig = function (opts) {
        return {
            ngModule: ReactiveFormsModule,
            providers: [{
                    provide: NG_MODEL_WITH_FORM_CONTROL_WARNING,
                    useValue: opts.warnOnNgModelWithFormControl
                }]
        };
    };
    ReactiveFormsModule.ngModuleDef = i0.ɵdefineNgModule({ type: ReactiveFormsModule, bootstrap: [], declarations: [i5.FormControlDirective, i6.FormGroupDirective, i7.FormControlName, i8.FormGroupName, i8.FormArrayName], imports: [], exports: [i4.InternalFormsSharedModule, i5.FormControlDirective, i6.FormGroupDirective, i7.FormControlName, i8.FormGroupName, i8.FormArrayName] });
    ReactiveFormsModule.ngInjectorDef = i0.defineInjector({ factory: function ReactiveFormsModule_Factory() { return new ReactiveFormsModule(); }, providers: [FormBuilder, RadioControlRegistry], imports: [i4.InternalFormsSharedModule, i5.FormControlDirective, i6.FormGroupDirective, i7.FormControlName, i8.FormGroupName, i8.FormArrayName] });
    return ReactiveFormsModule;
}());
export { ReactiveFormsModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybV9wcm92aWRlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9mb3Jtcy9zcmMvZm9ybV9wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFzQixRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFNUQsT0FBTyxFQUFDLHlCQUF5QixFQUFFLGtDQUFrQyxFQUFFLDBCQUEwQixFQUFFLDBCQUEwQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ25KLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBQy9FLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUkzQzs7O0dBR0c7QUFDSDtJQUFBO0tBTUM7eURBRFksV0FBVzt5R0FBWCxXQUFXLGtCQUhYLENBQUMsb0JBQW9CLENBQUM7c0JBdEJuQztDQTBCQyxBQU5ELElBTUM7U0FEWSxXQUFXO0FBR3hCOzs7R0FHRztBQUNIO0lBQUE7S0FpQkM7SUFYUSw4QkFBVSxHQUFqQixVQUFrQixJQUVqQjtRQUNDLE9BQU87WUFDTCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFNBQVMsRUFBRSxDQUFDO29CQUNWLE9BQU8sRUFBRSxrQ0FBa0M7b0JBQzNDLFFBQVEsRUFBRSxJQUFJLENBQUMsNEJBQTRCO2lCQUM1QyxDQUFDO1NBQ0gsQ0FBQztJQUNKLENBQUM7aUVBWFUsbUJBQW1CO3lIQUFuQixtQkFBbUIsa0JBSG5CLENBQUMsV0FBVyxFQUFFLG9CQUFvQixDQUFDOzhCQWxDaEQ7Q0FpREMsQUFqQkQsSUFpQkM7U0FaWSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0ludGVybmFsRm9ybXNTaGFyZWRNb2R1bGUsIE5HX01PREVMX1dJVEhfRk9STV9DT05UUk9MX1dBUk5JTkcsIFJFQUNUSVZFX0RSSVZFTl9ESVJFQ1RJVkVTLCBURU1QTEFURV9EUklWRU5fRElSRUNUSVZFU30gZnJvbSAnLi9kaXJlY3RpdmVzJztcbmltcG9ydCB7UmFkaW9Db250cm9sUmVnaXN0cnl9IGZyb20gJy4vZGlyZWN0aXZlcy9yYWRpb19jb250cm9sX3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7Rm9ybUJ1aWxkZXJ9IGZyb20gJy4vZm9ybV9idWlsZGVyJztcblxuXG5cbi8qKlxuICogVGhlIG5nIG1vZHVsZSBmb3IgZm9ybXMuXG4gKlxuICovXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFRFTVBMQVRFX0RSSVZFTl9ESVJFQ1RJVkVTLFxuICBwcm92aWRlcnM6IFtSYWRpb0NvbnRyb2xSZWdpc3RyeV0sXG4gIGV4cG9ydHM6IFtJbnRlcm5hbEZvcm1zU2hhcmVkTW9kdWxlLCBURU1QTEFURV9EUklWRU5fRElSRUNUSVZFU11cbn0pXG5leHBvcnQgY2xhc3MgRm9ybXNNb2R1bGUge1xufVxuXG4vKipcbiAqIFRoZSBuZyBtb2R1bGUgZm9yIHJlYWN0aXZlIGZvcm1zLlxuICpcbiAqL1xuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbUkVBQ1RJVkVfRFJJVkVOX0RJUkVDVElWRVNdLFxuICBwcm92aWRlcnM6IFtGb3JtQnVpbGRlciwgUmFkaW9Db250cm9sUmVnaXN0cnldLFxuICBleHBvcnRzOiBbSW50ZXJuYWxGb3Jtc1NoYXJlZE1vZHVsZSwgUkVBQ1RJVkVfRFJJVkVOX0RJUkVDVElWRVNdXG59KVxuZXhwb3J0IGNsYXNzIFJlYWN0aXZlRm9ybXNNb2R1bGUge1xuICBzdGF0aWMgd2l0aENvbmZpZyhvcHRzOiB7XG4gICAgLyoqIEBkZXByZWNhdGVkIGFzIG9mIHY2ICovIHdhcm5Pbk5nTW9kZWxXaXRoRm9ybUNvbnRyb2w6ICduZXZlcicgfCAnb25jZScgfCAnYWx3YXlzJ1xuICB9KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbe1xuICAgICAgICBwcm92aWRlOiBOR19NT0RFTF9XSVRIX0ZPUk1fQ09OVFJPTF9XQVJOSU5HLFxuICAgICAgICB1c2VWYWx1ZTogb3B0cy53YXJuT25OZ01vZGVsV2l0aEZvcm1Db250cm9sXG4gICAgICB9XVxuICAgIH07XG4gIH1cbn1cbiJdfQ==