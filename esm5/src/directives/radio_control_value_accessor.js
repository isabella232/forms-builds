/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Injectable, Injector, Input, Renderer2, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from './control_value_accessor';
import { NgControl } from './ng_control';
export var RADIO_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return RadioControlValueAccessor; }),
    multi: true
};
/**
 * Internal class used by Angular to uncheck radio buttons with the matching name.
 */
var RadioControlRegistry = /** @class */ (function () {
    function RadioControlRegistry() {
        this._accessors = [];
    }
    RadioControlRegistry.prototype.add = function (control, accessor) {
        this._accessors.push([control, accessor]);
    };
    RadioControlRegistry.prototype.remove = function (accessor) {
        for (var i = this._accessors.length - 1; i >= 0; --i) {
            if (this._accessors[i][1] === accessor) {
                this._accessors.splice(i, 1);
                return;
            }
        }
    };
    RadioControlRegistry.prototype.select = function (accessor) {
        var _this = this;
        this._accessors.forEach(function (c) {
            if (_this._isSameGroup(c, accessor) && c[1] !== accessor) {
                c[1].fireUncheck(accessor.value);
            }
        });
    };
    RadioControlRegistry.prototype._isSameGroup = function (controlPair, accessor) {
        if (!controlPair[0].control)
            return false;
        return controlPair[0]._parent === accessor._control._parent &&
            controlPair[1].name === accessor.name;
    };
    RadioControlRegistry = tslib_1.__decorate([
        Injectable()
    ], RadioControlRegistry);
    return RadioControlRegistry;
}());
export { RadioControlRegistry };
/**
 * @description
 *
 * Writes radio control values and listens to radio control changes.
 *
 * Used by `NgModel`, `FormControlDirective`, and `FormControlName`
 * to keep the view synced with the `FormControl` model.
 *
 * If you have imported the `FormsModule` or the `ReactiveFormsModule`, this
 * value accessor will be active on any radio control that has a form directive. You do
 * **not** need to add a special selector to activate it.
 *
 * ### How to use radio buttons with form directives
 *
 * To use radio buttons in a template-driven form, you'll want to ensure that radio buttons
 * in the same group have the same `name` attribute.  Radio buttons with different `name`
 * attributes do not affect each other.
 *
 * {@example forms/ts/radioButtons/radio_button_example.ts region='TemplateDriven'}
 *
 * When using radio buttons in a reactive form, radio buttons in the same group should have the
 * same `formControlName`. You can also add a `name` attribute, but it's optional.
 *
 * {@example forms/ts/reactiveRadioButtons/reactive_radio_button_example.ts region='Reactive'}
 *
 *  * **npm package**: `@angular/forms`
 *
 *
 */
var RadioControlValueAccessor = /** @class */ (function () {
    function RadioControlValueAccessor(_renderer, _elementRef, _registry, _injector) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._registry = _registry;
        this._injector = _injector;
        this.onChange = function () { };
        this.onTouched = function () { };
    }
    RadioControlValueAccessor.prototype.ngOnInit = function () {
        this._control = this._injector.get(NgControl);
        this._checkName();
        this._registry.add(this._control, this);
    };
    RadioControlValueAccessor.prototype.ngOnDestroy = function () { this._registry.remove(this); };
    RadioControlValueAccessor.prototype.writeValue = function (value) {
        this._state = value === this.value;
        this._renderer.setProperty(this._elementRef.nativeElement, 'checked', this._state);
    };
    RadioControlValueAccessor.prototype.registerOnChange = function (fn) {
        var _this = this;
        this._fn = fn;
        this.onChange = function () {
            fn(_this.value);
            _this._registry.select(_this);
        };
    };
    RadioControlValueAccessor.prototype.fireUncheck = function (value) { this.writeValue(value); };
    RadioControlValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    RadioControlValueAccessor.prototype.setDisabledState = function (isDisabled) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    };
    RadioControlValueAccessor.prototype._checkName = function () {
        if (this.name && this.formControlName && this.name !== this.formControlName) {
            this._throwNameError();
        }
        if (!this.name && this.formControlName)
            this.name = this.formControlName;
    };
    RadioControlValueAccessor.prototype._throwNameError = function () {
        throw new Error("\n      If you define both a name and a formControlName attribute on your radio button, their values\n      must match. Ex: <input type=\"radio\" formControlName=\"food\" name=\"food\">\n    ");
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], RadioControlValueAccessor.prototype, "name", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", String)
    ], RadioControlValueAccessor.prototype, "formControlName", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], RadioControlValueAccessor.prototype, "value", void 0);
    RadioControlValueAccessor = tslib_1.__decorate([
        Directive({
            selector: 'input[type=radio][formControlName],input[type=radio][formControl],input[type=radio][ngModel]',
            host: { '(change)': 'onChange()', '(blur)': 'onTouched()' },
            providers: [RADIO_VALUE_ACCESSOR]
        }),
        tslib_1.__metadata("design:paramtypes", [Renderer2, ElementRef,
            RadioControlRegistry, Injector])
    ], RadioControlValueAccessor);
    return RadioControlValueAccessor;
}());
export { RadioControlValueAccessor };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW9fY29udHJvbF92YWx1ZV9hY2Nlc3Nvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Zvcm1zL3NyYy9kaXJlY3RpdmVzL3JhZGlvX2NvbnRyb2xfdmFsdWVfYWNjZXNzb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFxQixTQUFTLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTNILE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRixPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBRXZDLE1BQU0sQ0FBQyxJQUFNLG9CQUFvQixHQUFRO0lBQ3ZDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEseUJBQXlCLEVBQXpCLENBQXlCLENBQUM7SUFDeEQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBRUY7O0dBRUc7QUFFSDtJQURBO1FBRVUsZUFBVSxHQUFVLEVBQUUsQ0FBQztJQThCakMsQ0FBQztJQTVCQyxrQ0FBRyxHQUFILFVBQUksT0FBa0IsRUFBRSxRQUFtQztRQUN6RCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxxQ0FBTSxHQUFOLFVBQU8sUUFBbUM7UUFDeEMsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtZQUNwRCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENB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aHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlLCBFbGVtZW50UmVmLCBJbmplY3RhYmxlLCBJbmplY3RvciwgSW5wdXQsIE9uRGVzdHJveSwgT25Jbml0LCBSZW5kZXJlcjIsIGZvcndhcmRSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnLi9jb250cm9sX3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7TmdDb250cm9sfSBmcm9tICcuL25nX2NvbnRyb2wnO1xuXG5leHBvcnQgY29uc3QgUkFESU9fVkFMVUVfQUNDRVNTT1I6IGFueSA9IHtcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFJhZGlvQ29udHJvbFZhbHVlQWNjZXNzb3IpLFxuICBtdWx0aTogdHJ1ZVxufTtcblxuLyoqXG4gKiBJbnRlcm5hbCBjbGFzcyB1c2VkIGJ5IEFuZ3VsYXIgdG8gdW5jaGVjayByYWRpbyBidXR0b25zIHdpdGggdGhlIG1hdGNoaW5nIG5hbWUuXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBSYWRpb0NvbnRyb2xSZWdpc3RyeSB7XG4gIHByaXZhdGUgX2FjY2Vzc29yczogYW55W10gPSBbXTtcblxuICBhZGQoY29udHJvbDogTmdDb250cm9sLCBhY2Nlc3NvcjogUmFkaW9Db250cm9sVmFsdWVBY2Nlc3Nvcikge1xuICAgIHRoaXMuX2FjY2Vzc29ycy5wdXNoKFtjb250cm9sLCBhY2Nlc3Nvcl0pO1xuICB9XG5cbiAgcmVtb3ZlKGFjY2Vzc29yOiBSYWRpb0NvbnRyb2xWYWx1ZUFjY2Vzc29yKSB7XG4gICAgZm9yIChsZXQgaSA9IHRoaXMuX2FjY2Vzc29ycy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgaWYgKHRoaXMuX2FjY2Vzc29yc1tpXVsxXSA9PT0gYWNjZXNzb3IpIHtcbiAgICAgICAgdGhpcy5fYWNjZXNzb3JzLnNwbGljZShpLCAxKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNlbGVjdChhY2Nlc3NvcjogUmFkaW9Db250cm9sVmFsdWVBY2Nlc3Nvcikge1xuICAgIHRoaXMuX2FjY2Vzc29ycy5mb3JFYWNoKChjKSA9PiB7XG4gICAgICBpZiAodGhpcy5faXNTYW1lR3JvdXAoYywgYWNjZXNzb3IpICYmIGNbMV0gIT09IGFjY2Vzc29yKSB7XG4gICAgICAgIGNbMV0uZmlyZVVuY2hlY2soYWNjZXNzb3IudmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaXNTYW1lR3JvdXAoXG4gICAgICBjb250cm9sUGFpcjogW05nQ29udHJvbCwgUmFkaW9Db250cm9sVmFsdWVBY2Nlc3Nvcl0sXG4gICAgICBhY2Nlc3NvcjogUmFkaW9Db250cm9sVmFsdWVBY2Nlc3Nvcik6IGJvb2xlYW4ge1xuICAgIGlmICghY29udHJvbFBhaXJbMF0uY29udHJvbCkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBjb250cm9sUGFpclswXS5fcGFyZW50ID09PSBhY2Nlc3Nvci5fY29udHJvbC5fcGFyZW50ICYmXG4gICAgICAgIGNvbnRyb2xQYWlyWzFdLm5hbWUgPT09IGFjY2Vzc29yLm5hbWU7XG4gIH1cbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBXcml0ZXMgcmFkaW8gY29udHJvbCB2YWx1ZXMgYW5kIGxpc3RlbnMgdG8gcmFkaW8gY29udHJvbCBjaGFuZ2VzLlxuICpcbiAqIFVzZWQgYnkgYE5nTW9kZWxgLCBgRm9ybUNvbnRyb2xEaXJlY3RpdmVgLCBhbmQgYEZvcm1Db250cm9sTmFtZWBcbiAqIHRvIGtlZXAgdGhlIHZpZXcgc3luY2VkIHdpdGggdGhlIGBGb3JtQ29udHJvbGAgbW9kZWwuXG4gKlxuICogSWYgeW91IGhhdmUgaW1wb3J0ZWQgdGhlIGBGb3Jtc01vZHVsZWAgb3IgdGhlIGBSZWFjdGl2ZUZvcm1zTW9kdWxlYCwgdGhpc1xuICogdmFsdWUgYWNjZXNzb3Igd2lsbCBiZSBhY3RpdmUgb24gYW55IHJhZGlvIGNvbnRyb2wgdGhhdCBoYXMgYSBmb3JtIGRpcmVjdGl2ZS4gWW91IGRvXG4gKiAqKm5vdCoqIG5lZWQgdG8gYWRkIGEgc3BlY2lhbCBzZWxlY3RvciB0byBhY3RpdmF0ZSBpdC5cbiAqXG4gKiAjIyMgSG93IHRvIHVzZSByYWRpbyBidXR0b25zIHdpdGggZm9ybSBkaXJlY3RpdmVzXG4gKlxuICogVG8gdXNlIHJhZGlvIGJ1dHRvbnMgaW4gYSB0ZW1wbGF0ZS1kcml2ZW4gZm9ybSwgeW91J2xsIHdhbnQgdG8gZW5zdXJlIHRoYXQgcmFkaW8gYnV0dG9uc1xuICogaW4gdGhlIHNhbWUgZ3JvdXAgaGF2ZSB0aGUgc2FtZSBgbmFtZWAgYXR0cmlidXRlLiAgUmFkaW8gYnV0dG9ucyB3aXRoIGRpZmZlcmVudCBgbmFtZWBcbiAqIGF0dHJpYnV0ZXMgZG8gbm90IGFmZmVjdCBlYWNoIG90aGVyLlxuICpcbiAqIHtAZXhhbXBsZSBmb3Jtcy90cy9yYWRpb0J1dHRvbnMvcmFkaW9fYnV0dG9uX2V4YW1wbGUudHMgcmVnaW9uPSdUZW1wbGF0ZURyaXZlbid9XG4gKlxuICogV2hlbiB1c2luZyByYWRpbyBidXR0b25zIGluIGEgcmVhY3RpdmUgZm9ybSwgcmFkaW8gYnV0dG9ucyBpbiB0aGUgc2FtZSBncm91cCBzaG91bGQgaGF2ZSB0aGVcbiAqIHNhbWUgYGZvcm1Db250cm9sTmFtZWAuIFlvdSBjYW4gYWxzbyBhZGQgYSBgbmFtZWAgYXR0cmlidXRlLCBidXQgaXQncyBvcHRpb25hbC5cbiAqXG4gKiB7QGV4YW1wbGUgZm9ybXMvdHMvcmVhY3RpdmVSYWRpb0J1dHRvbnMvcmVhY3RpdmVfcmFkaW9fYnV0dG9uX2V4YW1wbGUudHMgcmVnaW9uPSdSZWFjdGl2ZSd9XG4gKlxuICogICogKipucG0gcGFja2FnZSoqOiBgQGFuZ3VsYXIvZm9ybXNgXG4gKlxuICpcbiAqL1xuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOlxuICAgICAgJ2lucHV0W3R5cGU9cmFkaW9dW2Zvcm1Db250cm9sTmFtZV0saW5wdXRbdHlwZT1yYWRpb11bZm9ybUNvbnRyb2xdLGlucHV0W3R5cGU9cmFkaW9dW25nTW9kZWxdJyxcbiAgaG9zdDogeycoY2hhbmdlKSc6ICdvbkNoYW5nZSgpJywgJyhibHVyKSc6ICdvblRvdWNoZWQoKSd9LFxuICBwcm92aWRlcnM6IFtSQURJT19WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgUmFkaW9Db250cm9sVmFsdWVBY2Nlc3NvciBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLFxuICAgIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfc3RhdGU6IGJvb2xlYW47XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2NvbnRyb2w6IE5nQ29udHJvbDtcbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfZm46IEZ1bmN0aW9uO1xuICBvbkNoYW5nZSA9ICgpID0+IHt9O1xuICBvblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGZvcm1Db250cm9sTmFtZTogc3RyaW5nO1xuICBASW5wdXQoKSB2YWx1ZTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICAgIHByaXZhdGUgX3JlZ2lzdHJ5OiBSYWRpb0NvbnRyb2xSZWdpc3RyeSwgcHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnRyb2wgPSB0aGlzLl9pbmplY3Rvci5nZXQoTmdDb250cm9sKTtcbiAgICB0aGlzLl9jaGVja05hbWUoKTtcbiAgICB0aGlzLl9yZWdpc3RyeS5hZGQodGhpcy5fY29udHJvbCwgdGhpcyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHsgdGhpcy5fcmVnaXN0cnkucmVtb3ZlKHRoaXMpOyB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fc3RhdGUgPSB2YWx1ZSA9PT0gdGhpcy52YWx1ZTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdjaGVja2VkJywgdGhpcy5fc3RhdGUpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKF86IGFueSkgPT4ge30pOiB2b2lkIHtcbiAgICB0aGlzLl9mbiA9IGZuO1xuICAgIHRoaXMub25DaGFuZ2UgPSAoKSA9PiB7XG4gICAgICBmbih0aGlzLnZhbHVlKTtcbiAgICAgIHRoaXMuX3JlZ2lzdHJ5LnNlbGVjdCh0aGlzKTtcbiAgICB9O1xuICB9XG5cbiAgZmlyZVVuY2hlY2sodmFsdWU6IGFueSk6IHZvaWQgeyB0aGlzLndyaXRlVmFsdWUodmFsdWUpOyB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHt9KTogdm9pZCB7IHRoaXMub25Ub3VjaGVkID0gZm47IH1cblxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRQcm9wZXJ0eSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdkaXNhYmxlZCcsIGlzRGlzYWJsZWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2hlY2tOYW1lKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLm5hbWUgJiYgdGhpcy5mb3JtQ29udHJvbE5hbWUgJiYgdGhpcy5uYW1lICE9PSB0aGlzLmZvcm1Db250cm9sTmFtZSkge1xuICAgICAgdGhpcy5fdGhyb3dOYW1lRXJyb3IoKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLm5hbWUgJiYgdGhpcy5mb3JtQ29udHJvbE5hbWUpIHRoaXMubmFtZSA9IHRoaXMuZm9ybUNvbnRyb2xOYW1lO1xuICB9XG5cbiAgcHJpdmF0ZSBfdGhyb3dOYW1lRXJyb3IoKTogdm9pZCB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBcbiAgICAgIElmIHlvdSBkZWZpbmUgYm90aCBhIG5hbWUgYW5kIGEgZm9ybUNvbnRyb2xOYW1lIGF0dHJpYnV0ZSBvbiB5b3VyIHJhZGlvIGJ1dHRvbiwgdGhlaXIgdmFsdWVzXG4gICAgICBtdXN0IG1hdGNoLiBFeDogPGlucHV0IHR5cGU9XCJyYWRpb1wiIGZvcm1Db250cm9sTmFtZT1cImZvb2RcIiBuYW1lPVwiZm9vZFwiPlxuICAgIGApO1xuICB9XG59XG4iXX0=