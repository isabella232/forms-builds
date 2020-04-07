/**
 * @fileoverview added by tsickle
 * Generated from: packages/forms/src/directives/ng_model.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
/** @type {?} */
export const formControlBinding = {
    provide: NgControl,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => NgModel))
};
const ɵ0 = /**
 * @return {?}
 */
() => Promise.resolve(null);
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
 * @type {?}
 */
const resolvedPromise = ((ɵ0))();
/**
 * \@description
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
 * \@usageNotes
 *
 * ### Using ngModel on a standalone control
 *
 * The following examples show a simple standalone control using `ngModel`:
 *
 * {\@example forms/ts/simpleNgModel/simple_ng_model_example.ts region='Component'}
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
 * {\@example forms/ts/simpleForm/simple_form_example.ts region='Component'}
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
 * within a custom form component, and the name `\@Input` property serves a different purpose.
 *
 * ```html
 * <form>
 *   <my-person-control name="Nancy" ngModel [ngModelOptions]="{name: 'user'}">
 *   </my-person-control>
 * </form>
 * <!-- form value: {user: ''} -->
 * ```
 *
 * \@ngModule FormsModule
 * \@publicApi
 */
export class NgModel extends NgControl {
    /**
     * @param {?} parent
     * @param {?} validators
     * @param {?} asyncValidators
     * @param {?} valueAccessors
     */
    constructor(parent, validators, asyncValidators, valueAccessors) {
        super();
        this.control = new FormControl();
        /**
         * \@internal
         */
        this._registered = false;
        /**
         * \@description
         * Event emitter for producing the `ngModelChange` event after
         * the view model updates.
         */
        this.update = new EventEmitter();
        this._parent = parent;
        this._rawValidators = validators || [];
        this._rawAsyncValidators = asyncValidators || [];
        this.valueAccessor = selectValueAccessor(this, valueAccessors);
    }
    /**
     * \@description
     * A lifecycle method called when the directive's inputs change. For internal use
     * only.
     *
     * @param {?} changes A object of key/value pairs for the set of changed inputs.
     * @return {?}
     */
    ngOnChanges(changes) {
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
    }
    /**
     * \@description
     * Lifecycle method called before the directive's instance is destroyed. For internal
     * use only.
     * @return {?}
     */
    ngOnDestroy() { this.formDirective && this.formDirective.removeControl(this); }
    /**
     * \@description
     * Returns an array that represents the path from the top-level form to this control.
     * Each index is the string name of the control on that level.
     * @return {?}
     */
    get path() {
        return this._parent ? controlPath(this.name, this._parent) : [this.name];
    }
    /**
     * \@description
     * The top-level directive for this control if present, otherwise null.
     * @return {?}
     */
    get formDirective() { return this._parent ? this._parent.formDirective : null; }
    /**
     * \@description
     * Synchronous validator function composed of all the synchronous validators
     * registered with this directive.
     * @return {?}
     */
    get validator() { return composeValidators(this._rawValidators); }
    /**
     * \@description
     * Async validator function composed of all the async validators registered with this
     * directive.
     * @return {?}
     */
    get asyncValidator() {
        return composeAsyncValidators(this._rawAsyncValidators);
    }
    /**
     * \@description
     * Sets the new value for the view model and emits an `ngModelChange` event.
     *
     * @param {?} newValue The new value emitted by `ngModelChange`.
     * @return {?}
     */
    viewToModelUpdate(newValue) {
        this.viewModel = newValue;
        this.update.emit(newValue);
    }
    /**
     * @private
     * @return {?}
     */
    _setUpControl() {
        this._setUpdateStrategy();
        this._isStandalone() ? this._setUpStandalone() :
            this.formDirective.addControl(this);
        this._registered = true;
    }
    /**
     * @private
     * @return {?}
     */
    _setUpdateStrategy() {
        if (this.options && this.options.updateOn != null) {
            this.control._updateOn = this.options.updateOn;
        }
    }
    /**
     * @private
     * @return {?}
     */
    _isStandalone() {
        return !this._parent || !!(this.options && this.options.standalone);
    }
    /**
     * @private
     * @return {?}
     */
    _setUpStandalone() {
        setUpControl(this.control, this);
        this.control.updateValueAndValidity({ emitEvent: false });
    }
    /**
     * @private
     * @return {?}
     */
    _checkForErrors() {
        if (!this._isStandalone()) {
            this._checkParentType();
        }
        this._checkName();
    }
    /**
     * @private
     * @return {?}
     */
    _checkParentType() {
        if (!(this._parent instanceof NgModelGroup) &&
            this._parent instanceof AbstractFormGroupDirective) {
            TemplateDrivenErrors.formGroupNameException();
        }
        else if (!(this._parent instanceof NgModelGroup) && !(this._parent instanceof NgForm)) {
            TemplateDrivenErrors.modelParentException();
        }
    }
    /**
     * @private
     * @return {?}
     */
    _checkName() {
        if (this.options && this.options.name)
            this.name = this.options.name;
        if (!this._isStandalone() && !this.name) {
            TemplateDrivenErrors.missingNameException();
        }
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    _updateValue(value) {
        resolvedPromise.then((/**
         * @return {?}
         */
        () => { this.control.setValue(value, { emitViewToModelChange: false }); }));
    }
    /**
     * @private
     * @param {?} changes
     * @return {?}
     */
    _updateDisabled(changes) {
        /** @type {?} */
        const disabledValue = changes['isDisabled'].currentValue;
        /** @type {?} */
        const isDisabled = disabledValue === '' || (disabledValue && disabledValue !== 'false');
        resolvedPromise.then((/**
         * @return {?}
         */
        () => {
            if (isDisabled && !this.control.disabled) {
                this.control.disable();
            }
            else if (!isDisabled && this.control.disabled) {
                this.control.enable();
            }
        }));
    }
}
NgModel.decorators = [
    { type: Directive, args: [{
                selector: '[ngModel]:not([formControlName]):not([formControl])',
                providers: [formControlBinding],
                exportAs: 'ngModel'
            },] }
];
/** @nocollapse */
NgModel.ctorParameters = () => [
    { type: ControlContainer, decorators: [{ type: Optional }, { type: Host }] },
    { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_VALIDATORS,] }] },
    { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_ASYNC_VALIDATORS,] }] },
    { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_VALUE_ACCESSOR,] }] }
];
NgModel.propDecorators = {
    name: [{ type: Input }],
    isDisabled: [{ type: Input, args: ['disabled',] }],
    model: [{ type: Input, args: ['ngModel',] }],
    options: [{ type: Input, args: ['ngModelOptions',] }],
    update: [{ type: Output, args: ['ngModelChange',] }]
};
if (false) {
    /**
     * \@nodoc
     * @type {?}
     */
    NgModel.ngAcceptInputType_isDisabled;
    /** @type {?} */
    NgModel.prototype.control;
    /**
     * \@internal
     * @type {?}
     */
    NgModel.prototype._registered;
    /**
     * \@description
     * Internal reference to the view model value.
     * @type {?}
     */
    NgModel.prototype.viewModel;
    /**
     * \@description
     * Tracks the name bound to the directive. The parent form
     * uses this name as a key to retrieve this control's value.
     * @type {?}
     */
    NgModel.prototype.name;
    /**
     * \@description
     * Tracks whether the control is disabled.
     * @type {?}
     */
    NgModel.prototype.isDisabled;
    /**
     * \@description
     * Tracks the value bound to this directive.
     * @type {?}
     */
    NgModel.prototype.model;
    /**
     * \@description
     * Tracks the configuration options for this `ngModel` instance.
     *
     * **name**: An alternative to setting the name attribute on the form control element. See
     * the [example](api/forms/NgModel#using-ngmodel-on-a-standalone-control) for using `NgModel`
     * as a standalone control.
     *
     * **standalone**: When set to true, the `ngModel` will not register itself with its parent form,
     * and acts as if it's not in the form. Defaults to false.
     *
     * **updateOn**: Defines the event upon which the form control value and validity update.
     * Defaults to 'change'. Possible values: `'change'` | `'blur'` | `'submit'`.
     *
     * @type {?}
     */
    NgModel.prototype.options;
    /**
     * \@description
     * Event emitter for producing the `ngModelChange` event after
     * the view model updates.
     * @type {?}
     */
    NgModel.prototype.update;
}
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfbW9kZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9mb3Jtcy9zcmMvZGlyZWN0aXZlcy9uZ19tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFRQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBd0IsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQWlCLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVwSixPQUFPLEVBQUMsV0FBVyxFQUFZLE1BQU0sVUFBVSxDQUFDO0FBQ2hELE9BQU8sRUFBQyxtQkFBbUIsRUFBRSxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFakUsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDM0UsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUF1QixpQkFBaUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ2pGLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUNqQyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDOUMsT0FBTyxFQUFDLHNCQUFzQixFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBRSxpQkFBaUIsRUFBRSxtQkFBbUIsRUFBRSxZQUFZLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDdEksT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7O0FBRzlELE1BQU0sT0FBTyxrQkFBa0IsR0FBUTtJQUNyQyxPQUFPLEVBQUUsU0FBUztJQUNsQixXQUFXLEVBQUUsVUFBVTs7O0lBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFDO0NBQ3ZDOzs7O0FBbUJ3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QztnQkFDVCxRQUFRLEVBQUUscURBQXFEO2dCQUMvRCxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztnQkFDL0IsUUFBUSxFQUFFLFNBQVM7YUFDcEI7Ozs7WUF4SE8sZ0JBQWdCLHVCQThMVCxRQUFRLFlBQUksSUFBSTtZQUNzQyxLQUFLLHVCQUEzRCxRQUFRLFlBQUksSUFBSSxZQUFJLE1BQU0sU0FBQyxhQUFhO1lBQ3lCLEtBQUssdUJBQXRFLFFBQVEsWUFBSSxJQUFJLFlBQUksTUFBTSxTQUFDLG1CQUFtQjt3Q0FDOUMsUUFBUSxZQUFJLElBQUksWUFBSSxNQUFNLFNBQUMsaUJBQWlCOzs7bUJBNUN4RCxLQUFLO3lCQU9MLEtBQUssU0FBQyxVQUFVO29CQU1oQixLQUFLLFNBQUMsU0FBUztzQkFrQmYsS0FBSyxTQUFDLGdCQUFnQjtxQkFRdEIsTUFBTSxTQUFDLGVBQWU7Ozs7Ozs7SUF4RHZCLHFDQUFvRDs7SUFUcEQsMEJBQXlEOzs7OztJQVl6RCw4QkFBb0I7Ozs7OztJQU1wQiw0QkFBZTs7Ozs7OztJQVFmLHVCQUF3Qjs7Ozs7O0lBT3hCLDZCQUF5Qzs7Ozs7O0lBTXpDLHdCQUE2Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFrQjdCLDBCQUN1RTs7Ozs7OztJQU92RSx5QkFBcUQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIEhvc3QsIEluamVjdCwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPcHRpb25hbCwgT3V0cHV0LCBTZWxmLCBTaW1wbGVDaGFuZ2VzLCBmb3J3YXJkUmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtGb3JtQ29udHJvbCwgRm9ybUhvb2tzfSBmcm9tICcuLi9tb2RlbCc7XG5pbXBvcnQge05HX0FTWU5DX1ZBTElEQVRPUlMsIE5HX1ZBTElEQVRPUlN9IGZyb20gJy4uL3ZhbGlkYXRvcnMnO1xuXG5pbXBvcnQge0Fic3RyYWN0Rm9ybUdyb3VwRGlyZWN0aXZlfSBmcm9tICcuL2Fic3RyYWN0X2Zvcm1fZ3JvdXBfZGlyZWN0aXZlJztcbmltcG9ydCB7Q29udHJvbENvbnRhaW5lcn0gZnJvbSAnLi9jb250cm9sX2NvbnRhaW5lcic7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnLi9jb250cm9sX3ZhbHVlX2FjY2Vzc29yJztcbmltcG9ydCB7TmdDb250cm9sfSBmcm9tICcuL25nX2NvbnRyb2wnO1xuaW1wb3J0IHtOZ0Zvcm19IGZyb20gJy4vbmdfZm9ybSc7XG5pbXBvcnQge05nTW9kZWxHcm91cH0gZnJvbSAnLi9uZ19tb2RlbF9ncm91cCc7XG5pbXBvcnQge2NvbXBvc2VBc3luY1ZhbGlkYXRvcnMsIGNvbXBvc2VWYWxpZGF0b3JzLCBjb250cm9sUGF0aCwgaXNQcm9wZXJ0eVVwZGF0ZWQsIHNlbGVjdFZhbHVlQWNjZXNzb3IsIHNldFVwQ29udHJvbH0gZnJvbSAnLi9zaGFyZWQnO1xuaW1wb3J0IHtUZW1wbGF0ZURyaXZlbkVycm9yc30gZnJvbSAnLi90ZW1wbGF0ZV9kcml2ZW5fZXJyb3JzJztcbmltcG9ydCB7QXN5bmNWYWxpZGF0b3IsIEFzeW5jVmFsaWRhdG9yRm4sIFZhbGlkYXRvciwgVmFsaWRhdG9yRm59IGZyb20gJy4vdmFsaWRhdG9ycyc7XG5cbmV4cG9ydCBjb25zdCBmb3JtQ29udHJvbEJpbmRpbmc6IGFueSA9IHtcbiAgcHJvdmlkZTogTmdDb250cm9sLFxuICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ01vZGVsKVxufTtcblxuLyoqXG4gKiBgbmdNb2RlbGAgZm9yY2VzIGFuIGFkZGl0aW9uYWwgY2hhbmdlIGRldGVjdGlvbiBydW4gd2hlbiBpdHMgaW5wdXRzIGNoYW5nZTpcbiAqIEUuZy46XG4gKiBgYGBcbiAqIDxkaXY+e3tteU1vZGVsLnZhbGlkfX08L2Rpdj5cbiAqIDxpbnB1dCBbKG5nTW9kZWwpXT1cIm15VmFsdWVcIiAjbXlNb2RlbD1cIm5nTW9kZWxcIj5cbiAqIGBgYFxuICogSS5lLiBgbmdNb2RlbGAgY2FuIGV4cG9ydCBpdHNlbGYgb24gdGhlIGVsZW1lbnQgYW5kIHRoZW4gYmUgdXNlZCBpbiB0aGUgdGVtcGxhdGUuXG4gKiBOb3JtYWxseSwgdGhpcyB3b3VsZCByZXN1bHQgaW4gZXhwcmVzc2lvbnMgYmVmb3JlIHRoZSBgaW5wdXRgIHRoYXQgdXNlIHRoZSBleHBvcnRlZCBkaXJlY3RpdmVcbiAqIHRvIGhhdmUgYW5kIG9sZCB2YWx1ZSBhcyB0aGV5IGhhdmUgYmVlblxuICogZGlydHkgY2hlY2tlZCBiZWZvcmUuIEFzIHRoaXMgaXMgYSB2ZXJ5IGNvbW1vbiBjYXNlIGZvciBgbmdNb2RlbGAsIHdlIGFkZGVkIHRoaXMgc2Vjb25kIGNoYW5nZVxuICogZGV0ZWN0aW9uIHJ1bi5cbiAqXG4gKiBOb3RlczpcbiAqIC0gdGhpcyBpcyBqdXN0IG9uZSBleHRyYSBydW4gbm8gbWF0dGVyIGhvdyBtYW55IGBuZ01vZGVsYCBoYXZlIGJlZW4gY2hhbmdlZC5cbiAqIC0gdGhpcyBpcyBhIGdlbmVyYWwgcHJvYmxlbSB3aGVuIHVzaW5nIGBleHBvcnRBc2AgZm9yIGRpcmVjdGl2ZXMhXG4gKi9cbmNvbnN0IHJlc29sdmVkUHJvbWlzZSA9ICgoKSA9PiBQcm9taXNlLnJlc29sdmUobnVsbCkpKCk7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDcmVhdGVzIGEgYEZvcm1Db250cm9sYCBpbnN0YW5jZSBmcm9tIGEgZG9tYWluIG1vZGVsIGFuZCBiaW5kcyBpdFxuICogdG8gYSBmb3JtIGNvbnRyb2wgZWxlbWVudC5cbiAqXG4gKiBUaGUgYEZvcm1Db250cm9sYCBpbnN0YW5jZSB0cmFja3MgdGhlIHZhbHVlLCB1c2VyIGludGVyYWN0aW9uLCBhbmRcbiAqIHZhbGlkYXRpb24gc3RhdHVzIG9mIHRoZSBjb250cm9sIGFuZCBrZWVwcyB0aGUgdmlldyBzeW5jZWQgd2l0aCB0aGUgbW9kZWwuIElmIHVzZWRcbiAqIHdpdGhpbiBhIHBhcmVudCBmb3JtLCB0aGUgZGlyZWN0aXZlIGFsc28gcmVnaXN0ZXJzIGl0c2VsZiB3aXRoIHRoZSBmb3JtIGFzIGEgY2hpbGRcbiAqIGNvbnRyb2wuXG4gKlxuICogVGhpcyBkaXJlY3RpdmUgaXMgdXNlZCBieSBpdHNlbGYgb3IgYXMgcGFydCBvZiBhIGxhcmdlciBmb3JtLiBVc2UgdGhlXG4gKiBgbmdNb2RlbGAgc2VsZWN0b3IgdG8gYWN0aXZhdGUgaXQuXG4gKlxuICogSXQgYWNjZXB0cyBhIGRvbWFpbiBtb2RlbCBhcyBhbiBvcHRpb25hbCBgSW5wdXRgLiBJZiB5b3UgaGF2ZSBhIG9uZS13YXkgYmluZGluZ1xuICogdG8gYG5nTW9kZWxgIHdpdGggYFtdYCBzeW50YXgsIGNoYW5naW5nIHRoZSB2YWx1ZSBvZiB0aGUgZG9tYWluIG1vZGVsIGluIHRoZSBjb21wb25lbnRcbiAqIGNsYXNzIHNldHMgdGhlIHZhbHVlIGluIHRoZSB2aWV3LiBJZiB5b3UgaGF2ZSBhIHR3by13YXkgYmluZGluZyB3aXRoIGBbKCldYCBzeW50YXhcbiAqIChhbHNvIGtub3duIGFzICdiYW5hbmEtYm94IHN5bnRheCcpLCB0aGUgdmFsdWUgaW4gdGhlIFVJIGFsd2F5cyBzeW5jcyBiYWNrIHRvXG4gKiB0aGUgZG9tYWluIG1vZGVsIGluIHlvdXIgY2xhc3MuXG4gKlxuICogVG8gaW5zcGVjdCB0aGUgcHJvcGVydGllcyBvZiB0aGUgYXNzb2NpYXRlZCBgRm9ybUNvbnRyb2xgIChsaWtlIHZhbGlkaXR5IHN0YXRlKSwgXG4gKiBleHBvcnQgdGhlIGRpcmVjdGl2ZSBpbnRvIGEgbG9jYWwgdGVtcGxhdGUgdmFyaWFibGUgdXNpbmcgYG5nTW9kZWxgIGFzIHRoZSBrZXkgKGV4OiBgI215VmFyPVwibmdNb2RlbFwiYCkuXG4gKiBZb3UgdGhlbiBhY2Nlc3MgdGhlIGNvbnRyb2wgdXNpbmcgdGhlIGRpcmVjdGl2ZSdzIGBjb250cm9sYCBwcm9wZXJ0eSwgXG4gKiBidXQgbW9zdCBwcm9wZXJ0aWVzIHVzZWQgKGxpa2UgYHZhbGlkYCBhbmQgYGRpcnR5YCkgZmFsbCB0aHJvdWdoIHRvIHRoZSBjb250cm9sIGFueXdheSBmb3IgZGlyZWN0IGFjY2Vzcy4gXG4gKiBTZWUgYSBmdWxsIGxpc3Qgb2YgcHJvcGVydGllcyBkaXJlY3RseSBhdmFpbGFibGUgaW4gYEFic3RyYWN0Q29udHJvbERpcmVjdGl2ZWAuXG4gKlxuICogQHNlZSBgUmFkaW9Db250cm9sVmFsdWVBY2Nlc3NvcmAgXG4gKiBAc2VlIGBTZWxlY3RDb250cm9sVmFsdWVBY2Nlc3NvcmBcbiAqIFxuICogQHVzYWdlTm90ZXNcbiAqIFxuICogIyMjIFVzaW5nIG5nTW9kZWwgb24gYSBzdGFuZGFsb25lIGNvbnRyb2xcbiAqXG4gKiBUaGUgZm9sbG93aW5nIGV4YW1wbGVzIHNob3cgYSBzaW1wbGUgc3RhbmRhbG9uZSBjb250cm9sIHVzaW5nIGBuZ01vZGVsYDpcbiAqXG4gKiB7QGV4YW1wbGUgZm9ybXMvdHMvc2ltcGxlTmdNb2RlbC9zaW1wbGVfbmdfbW9kZWxfZXhhbXBsZS50cyByZWdpb249J0NvbXBvbmVudCd9XG4gKlxuICogV2hlbiB1c2luZyB0aGUgYG5nTW9kZWxgIHdpdGhpbiBgPGZvcm0+YCB0YWdzLCB5b3UnbGwgYWxzbyBuZWVkIHRvIHN1cHBseSBhIGBuYW1lYCBhdHRyaWJ1dGVcbiAqIHNvIHRoYXQgdGhlIGNvbnRyb2wgY2FuIGJlIHJlZ2lzdGVyZWQgd2l0aCB0aGUgcGFyZW50IGZvcm0gdW5kZXIgdGhhdCBuYW1lLlxuICpcbiAqIEluIHRoZSBjb250ZXh0IG9mIGEgcGFyZW50IGZvcm0sIGl0J3Mgb2Z0ZW4gdW5uZWNlc3NhcnkgdG8gaW5jbHVkZSBvbmUtd2F5IG9yIHR3by13YXkgYmluZGluZywgXG4gKiBhcyB0aGUgcGFyZW50IGZvcm0gc3luY3MgdGhlIHZhbHVlIGZvciB5b3UuIFlvdSBhY2Nlc3MgaXRzIHByb3BlcnRpZXMgYnkgZXhwb3J0aW5nIGl0IGludG8gYSBcbiAqIGxvY2FsIHRlbXBsYXRlIHZhcmlhYmxlIHVzaW5nIGBuZ0Zvcm1gIHN1Y2ggYXMgKGAjZj1cIm5nRm9ybVwiYCkuIFVzZSB0aGUgdmFyaWFibGUgd2hlcmUgXG4gKiBuZWVkZWQgb24gZm9ybSBzdWJtaXNzaW9uLlxuICpcbiAqIElmIHlvdSBkbyBuZWVkIHRvIHBvcHVsYXRlIGluaXRpYWwgdmFsdWVzIGludG8geW91ciBmb3JtLCB1c2luZyBhIG9uZS13YXkgYmluZGluZyBmb3JcbiAqIGBuZ01vZGVsYCB0ZW5kcyB0byBiZSBzdWZmaWNpZW50IGFzIGxvbmcgYXMgeW91IHVzZSB0aGUgZXhwb3J0ZWQgZm9ybSdzIHZhbHVlIHJhdGhlclxuICogdGhhbiB0aGUgZG9tYWluIG1vZGVsJ3MgdmFsdWUgb24gc3VibWl0LlxuICogXG4gKiAjIyMgVXNpbmcgbmdNb2RlbCB3aXRoaW4gYSBmb3JtXG4gKlxuICogVGhlIGZvbGxvd2luZyBleGFtcGxlIHNob3dzIGNvbnRyb2xzIHVzaW5nIGBuZ01vZGVsYCB3aXRoaW4gYSBmb3JtOlxuICpcbiAqIHtAZXhhbXBsZSBmb3Jtcy90cy9zaW1wbGVGb3JtL3NpbXBsZV9mb3JtX2V4YW1wbGUudHMgcmVnaW9uPSdDb21wb25lbnQnfVxuICogXG4gKiAjIyMgVXNpbmcgYSBzdGFuZGFsb25lIG5nTW9kZWwgd2l0aGluIGEgZ3JvdXBcbiAqIFxuICogVGhlIGZvbGxvd2luZyBleGFtcGxlIHNob3dzIHlvdSBob3cgdG8gdXNlIGEgc3RhbmRhbG9uZSBuZ01vZGVsIGNvbnRyb2xcbiAqIHdpdGhpbiBhIGZvcm0uIFRoaXMgY29udHJvbHMgdGhlIGRpc3BsYXkgb2YgdGhlIGZvcm0sIGJ1dCBkb2Vzbid0IGNvbnRhaW4gZm9ybSBkYXRhLlxuICpcbiAqIGBgYGh0bWxcbiAqIDxmb3JtPlxuICogICA8aW5wdXQgbmFtZT1cImxvZ2luXCIgbmdNb2RlbCBwbGFjZWhvbGRlcj1cIkxvZ2luXCI+XG4gKiAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuZ01vZGVsIFtuZ01vZGVsT3B0aW9uc109XCJ7c3RhbmRhbG9uZTogdHJ1ZX1cIj4gU2hvdyBtb3JlIG9wdGlvbnM/XG4gKiA8L2Zvcm0+XG4gKiA8IS0tIGZvcm0gdmFsdWU6IHtsb2dpbjogJyd9IC0tPlxuICogYGBgXG4gKiBcbiAqICMjIyBTZXR0aW5nIHRoZSBuZ01vZGVsIG5hbWUgYXR0cmlidXRlIHRocm91Z2ggb3B0aW9uc1xuICogXG4gKiBUaGUgZm9sbG93aW5nIGV4YW1wbGUgc2hvd3MgeW91IGFuIGFsdGVybmF0ZSB3YXkgdG8gc2V0IHRoZSBuYW1lIGF0dHJpYnV0ZS4gVGhlIG5hbWUgYXR0cmlidXRlIGlzIHVzZWRcbiAqIHdpdGhpbiBhIGN1c3RvbSBmb3JtIGNvbXBvbmVudCwgYW5kIHRoZSBuYW1lIGBASW5wdXRgIHByb3BlcnR5IHNlcnZlcyBhIGRpZmZlcmVudCBwdXJwb3NlLlxuICpcbiAqIGBgYGh0bWxcbiAqIDxmb3JtPlxuICogICA8bXktcGVyc29uLWNvbnRyb2wgbmFtZT1cIk5hbmN5XCIgbmdNb2RlbCBbbmdNb2RlbE9wdGlvbnNdPVwie25hbWU6ICd1c2VyJ31cIj5cbiAqICAgPC9teS1wZXJzb24tY29udHJvbD5cbiAqIDwvZm9ybT5cbiAqIDwhLS0gZm9ybSB2YWx1ZToge3VzZXI6ICcnfSAtLT5cbiAqIGBgYFxuICpcbiAqIEBuZ01vZHVsZSBGb3Jtc01vZHVsZVxuICogQHB1YmxpY0FwaVxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdNb2RlbF06bm90KFtmb3JtQ29udHJvbE5hbWVdKTpub3QoW2Zvcm1Db250cm9sXSknLFxuICBwcm92aWRlcnM6IFtmb3JtQ29udHJvbEJpbmRpbmddLFxuICBleHBvcnRBczogJ25nTW9kZWwnXG59KVxuZXhwb3J0IGNsYXNzIE5nTW9kZWwgZXh0ZW5kcyBOZ0NvbnRyb2wgaW1wbGVtZW50cyBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95IHtcbiAgcHVibGljIHJlYWRvbmx5IGNvbnRyb2w6IEZvcm1Db250cm9sID0gbmV3IEZvcm1Db250cm9sKCk7XG5cbiAgLy8gQXQgcnVudGltZSB3ZSBjb2VyY2UgYXJiaXRyYXJ5IHZhbHVlcyBhc3NpZ25lZCB0byB0aGUgXCJkaXNhYmxlZFwiIGlucHV0IHRvIGEgXCJib29sZWFuXCIuXG4gIC8vIFRoaXMgaXMgbm90IHJlZmxlY3RlZCBpbiB0aGUgdHlwZSBvZiB0aGUgcHJvcGVydHkgYmVjYXVzZSBvdXRzaWRlIG9mIHRlbXBsYXRlcywgY29uc3VtZXJzXG4gIC8vIHNob3VsZCBvbmx5IGRlYWwgd2l0aCBib29sZWFucy4gSW4gdGVtcGxhdGVzLCBhIHN0cmluZyBpcyBhbGxvd2VkIGZvciBjb252ZW5pZW5jZSBhbmQgdG9cbiAgLy8gbWF0Y2ggdGhlIG5hdGl2ZSBcImRpc2FibGVkIGF0dHJpYnV0ZVwiIHNlbWFudGljcyB3aGljaCBjYW4gYmUgb2JzZXJ2ZWQgb24gaW5wdXQgZWxlbWVudHMuXG4gIC8vIFRoaXMgc3RhdGljIG1lbWJlciB0ZWxscyB0aGUgY29tcGlsZXIgdGhhdCB2YWx1ZXMgb2YgdHlwZSBcInN0cmluZ1wiIGNhbiBhbHNvIGJlIGFzc2lnbmVkXG4gIC8vIHRvIHRoZSBpbnB1dCBpbiBhIHRlbXBsYXRlLlxuICAvKiogQG5vZG9jICovXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9pc0Rpc2FibGVkOiBib29sZWFufHN0cmluZztcblxuICAvKiogQGludGVybmFsICovXG4gIF9yZWdpc3RlcmVkID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBJbnRlcm5hbCByZWZlcmVuY2UgdG8gdGhlIHZpZXcgbW9kZWwgdmFsdWUuXG4gICAqL1xuICB2aWV3TW9kZWw6IGFueTtcblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRyYWNrcyB0aGUgbmFtZSBib3VuZCB0byB0aGUgZGlyZWN0aXZlLiBUaGUgcGFyZW50IGZvcm1cbiAgICogdXNlcyB0aGlzIG5hbWUgYXMgYSBrZXkgdG8gcmV0cmlldmUgdGhpcyBjb250cm9sJ3MgdmFsdWUuXG4gICAqL1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQElucHV0KCkgbmFtZSAhOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUcmFja3Mgd2hldGhlciB0aGUgY29udHJvbCBpcyBkaXNhYmxlZC5cbiAgICovXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBASW5wdXQoJ2Rpc2FibGVkJykgaXNEaXNhYmxlZCAhOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVHJhY2tzIHRoZSB2YWx1ZSBib3VuZCB0byB0aGlzIGRpcmVjdGl2ZS5cbiAgICovXG4gIEBJbnB1dCgnbmdNb2RlbCcpIG1vZGVsOiBhbnk7XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUcmFja3MgdGhlIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3IgdGhpcyBgbmdNb2RlbGAgaW5zdGFuY2UuXG4gICAqXG4gICAqICoqbmFtZSoqOiBBbiBhbHRlcm5hdGl2ZSB0byBzZXR0aW5nIHRoZSBuYW1lIGF0dHJpYnV0ZSBvbiB0aGUgZm9ybSBjb250cm9sIGVsZW1lbnQuIFNlZVxuICAgKiB0aGUgW2V4YW1wbGVdKGFwaS9mb3Jtcy9OZ01vZGVsI3VzaW5nLW5nbW9kZWwtb24tYS1zdGFuZGFsb25lLWNvbnRyb2wpIGZvciB1c2luZyBgTmdNb2RlbGBcbiAgICogYXMgYSBzdGFuZGFsb25lIGNvbnRyb2wuXG4gICAqXG4gICAqICoqc3RhbmRhbG9uZSoqOiBXaGVuIHNldCB0byB0cnVlLCB0aGUgYG5nTW9kZWxgIHdpbGwgbm90IHJlZ2lzdGVyIGl0c2VsZiB3aXRoIGl0cyBwYXJlbnQgZm9ybSxcbiAgICogYW5kIGFjdHMgYXMgaWYgaXQncyBub3QgaW4gdGhlIGZvcm0uIERlZmF1bHRzIHRvIGZhbHNlLlxuICAgKlxuICAgKiAqKnVwZGF0ZU9uKio6IERlZmluZXMgdGhlIGV2ZW50IHVwb24gd2hpY2ggdGhlIGZvcm0gY29udHJvbCB2YWx1ZSBhbmQgdmFsaWRpdHkgdXBkYXRlLlxuICAgKiBEZWZhdWx0cyB0byAnY2hhbmdlJy4gUG9zc2libGUgdmFsdWVzOiBgJ2NoYW5nZSdgIHwgYCdibHVyJ2AgfCBgJ3N1Ym1pdCdgLlxuICAgKlxuICAgKi9cbiAgLy8gVE9ETyhpc3N1ZS8yNDU3MSk6IHJlbW92ZSAnIScuXG4gIEBJbnB1dCgnbmdNb2RlbE9wdGlvbnMnKVxuICBvcHRpb25zICE6IHtuYW1lPzogc3RyaW5nLCBzdGFuZGFsb25lPzogYm9vbGVhbiwgdXBkYXRlT24/OiBGb3JtSG9va3N9O1xuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogRXZlbnQgZW1pdHRlciBmb3IgcHJvZHVjaW5nIHRoZSBgbmdNb2RlbENoYW5nZWAgZXZlbnQgYWZ0ZXJcbiAgICogdGhlIHZpZXcgbW9kZWwgdXBkYXRlcy5cbiAgICovXG4gIEBPdXRwdXQoJ25nTW9kZWxDaGFuZ2UnKSB1cGRhdGUgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEhvc3QoKSBwYXJlbnQ6IENvbnRyb2xDb250YWluZXIsXG4gICAgICAgICAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgQEluamVjdChOR19WQUxJREFUT1JTKSB2YWxpZGF0b3JzOiBBcnJheTxWYWxpZGF0b3J8VmFsaWRhdG9yRm4+LFxuICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBAU2VsZigpIEBJbmplY3QoTkdfQVNZTkNfVkFMSURBVE9SUykgYXN5bmNWYWxpZGF0b3JzOiBBcnJheTxBc3luY1ZhbGlkYXRvcnxBc3luY1ZhbGlkYXRvckZuPixcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBASW5qZWN0KE5HX1ZBTFVFX0FDQ0VTU09SKVxuICAgICAgICAgICAgICB2YWx1ZUFjY2Vzc29yczogQ29udHJvbFZhbHVlQWNjZXNzb3JbXSkge1xuICAgICAgICAgICAgICAgIHN1cGVyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jhd1ZhbGlkYXRvcnMgPSB2YWxpZGF0b3JzIHx8IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jhd0FzeW5jVmFsaWRhdG9ycyA9IGFzeW5jVmFsaWRhdG9ycyB8fCBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlQWNjZXNzb3IgPSBzZWxlY3RWYWx1ZUFjY2Vzc29yKHRoaXMsIHZhbHVlQWNjZXNzb3JzKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgICAgICAgICAgICogQSBsaWZlY3ljbGUgbWV0aG9kIGNhbGxlZCB3aGVuIHRoZSBkaXJlY3RpdmUncyBpbnB1dHMgY2hhbmdlLiBGb3IgaW50ZXJuYWwgdXNlXG4gICAgICAgICAgICAgICAqIG9ubHkuXG4gICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAqIEBwYXJhbSBjaGFuZ2VzIEEgb2JqZWN0IG9mIGtleS92YWx1ZSBwYWlycyBmb3IgdGhlIHNldCBvZiBjaGFuZ2VkIGlucHV0cy5cbiAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGVja0ZvckVycm9ycygpO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5fcmVnaXN0ZXJlZCkgdGhpcy5fc2V0VXBDb250cm9sKCk7XG4gICAgICAgICAgICAgICAgaWYgKCdpc0Rpc2FibGVkJyBpbiBjaGFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVEaXNhYmxlZChjaGFuZ2VzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNQcm9wZXJ0eVVwZGF0ZWQoY2hhbmdlcywgdGhpcy52aWV3TW9kZWwpKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLl91cGRhdGVWYWx1ZSh0aGlzLm1vZGVsKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMudmlld01vZGVsID0gdGhpcy5tb2RlbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICogQGRlc2NyaXB0aW9uXG4gICAgICAgICAgICAgICAqIExpZmVjeWNsZSBtZXRob2QgY2FsbGVkIGJlZm9yZSB0aGUgZGlyZWN0aXZlJ3MgaW5zdGFuY2UgaXMgZGVzdHJveWVkLiBGb3IgaW50ZXJuYWxcbiAgICAgICAgICAgICAgICogdXNlIG9ubHkuXG4gICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHsgdGhpcy5mb3JtRGlyZWN0aXZlICYmIHRoaXMuZm9ybURpcmVjdGl2ZS5yZW1vdmVDb250cm9sKHRoaXMpOyB9XG5cbiAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAgICAgICAgICAgKiBSZXR1cm5zIGFuIGFycmF5IHRoYXQgcmVwcmVzZW50cyB0aGUgcGF0aCBmcm9tIHRoZSB0b3AtbGV2ZWwgZm9ybSB0byB0aGlzIGNvbnRyb2wuXG4gICAgICAgICAgICAgICAqIEVhY2ggaW5kZXggaXMgdGhlIHN0cmluZyBuYW1lIG9mIHRoZSBjb250cm9sIG9uIHRoYXQgbGV2ZWwuXG4gICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICBnZXQgcGF0aCgpOiBzdHJpbmdbXSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudCA/IGNvbnRyb2xQYXRoKHRoaXMubmFtZSwgdGhpcy5fcGFyZW50KSA6IFt0aGlzLm5hbWVdO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAgICAgICAgICAgKiBUaGUgdG9wLWxldmVsIGRpcmVjdGl2ZSBmb3IgdGhpcyBjb250cm9sIGlmIHByZXNlbnQsIG90aGVyd2lzZSBudWxsLlxuICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgZ2V0IGZvcm1EaXJlY3RpdmUoKTogYW55IHsgcmV0dXJuIHRoaXMuX3BhcmVudCA/IHRoaXMuX3BhcmVudC5mb3JtRGlyZWN0aXZlIDogbnVsbDsgfVxuXG4gICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgICAgICAgICAgICogU3luY2hyb25vdXMgdmFsaWRhdG9yIGZ1bmN0aW9uIGNvbXBvc2VkIG9mIGFsbCB0aGUgc3luY2hyb25vdXMgdmFsaWRhdG9yc1xuICAgICAgICAgICAgICAgKiByZWdpc3RlcmVkIHdpdGggdGhpcyBkaXJlY3RpdmUuXG4gICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICBnZXQgdmFsaWRhdG9yKCk6IFZhbGlkYXRvckZufG51bGwgeyByZXR1cm4gY29tcG9zZVZhbGlkYXRvcnModGhpcy5fcmF3VmFsaWRhdG9ycyk7IH1cblxuICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICogQGRlc2NyaXB0aW9uXG4gICAgICAgICAgICAgICAqIEFzeW5jIHZhbGlkYXRvciBmdW5jdGlvbiBjb21wb3NlZCBvZiBhbGwgdGhlIGFzeW5jIHZhbGlkYXRvcnMgcmVnaXN0ZXJlZCB3aXRoIHRoaXNcbiAgICAgICAgICAgICAgICogZGlyZWN0aXZlLlxuICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgZ2V0IGFzeW5jVmFsaWRhdG9yKCk6IEFzeW5jVmFsaWRhdG9yRm58bnVsbCB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VBc3luY1ZhbGlkYXRvcnModGhpcy5fcmF3QXN5bmNWYWxpZGF0b3JzKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgICAgICAgICAgICogU2V0cyB0aGUgbmV3IHZhbHVlIGZvciB0aGUgdmlldyBtb2RlbCBhbmQgZW1pdHMgYW4gYG5nTW9kZWxDaGFuZ2VgIGV2ZW50LlxuICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgKiBAcGFyYW0gbmV3VmFsdWUgVGhlIG5ldyB2YWx1ZSBlbWl0dGVkIGJ5IGBuZ01vZGVsQ2hhbmdlYC5cbiAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgIHZpZXdUb01vZGVsVXBkYXRlKG5ld1ZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZpZXdNb2RlbCA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlLmVtaXQobmV3VmFsdWUpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcHJpdmF0ZSBfc2V0VXBDb250cm9sKCk6IHZvaWQge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NldFVwZGF0ZVN0cmF0ZWd5KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5faXNTdGFuZGFsb25lKCkgPyB0aGlzLl9zZXRVcFN0YW5kYWxvbmUoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1EaXJlY3RpdmUuYWRkQ29udHJvbCh0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWdpc3RlcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHByaXZhdGUgX3NldFVwZGF0ZVN0cmF0ZWd5KCk6IHZvaWQge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLnVwZGF0ZU9uICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbC5fdXBkYXRlT24gPSB0aGlzLm9wdGlvbnMudXBkYXRlT247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcHJpdmF0ZSBfaXNTdGFuZGFsb25lKCk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAhdGhpcy5fcGFyZW50IHx8ICEhKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuc3RhbmRhbG9uZSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBwcml2YXRlIF9zZXRVcFN0YW5kYWxvbmUoKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgc2V0VXBDb250cm9sKHRoaXMuY29udHJvbCwgdGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoe2VtaXRFdmVudDogZmFsc2V9KTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHByaXZhdGUgX2NoZWNrRm9yRXJyb3JzKCk6IHZvaWQge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5faXNTdGFuZGFsb25lKCkpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuX2NoZWNrUGFyZW50VHlwZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl9jaGVja05hbWUoKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHByaXZhdGUgX2NoZWNrUGFyZW50VHlwZSgpOiB2b2lkIHtcbiAgICAgICAgICAgICAgICBpZiAoISh0aGlzLl9wYXJlbnQgaW5zdGFuY2VvZiBOZ01vZGVsR3JvdXApICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BhcmVudCBpbnN0YW5jZW9mIEFic3RyYWN0Rm9ybUdyb3VwRGlyZWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICBUZW1wbGF0ZURyaXZlbkVycm9ycy5mb3JtR3JvdXBOYW1lRXhjZXB0aW9uKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgICAgISh0aGlzLl9wYXJlbnQgaW5zdGFuY2VvZiBOZ01vZGVsR3JvdXApICYmICEodGhpcy5fcGFyZW50IGluc3RhbmNlb2YgTmdGb3JtKSkge1xuICAgICAgICAgICAgICAgICAgVGVtcGxhdGVEcml2ZW5FcnJvcnMubW9kZWxQYXJlbnRFeGNlcHRpb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBwcml2YXRlIF9jaGVja05hbWUoKTogdm9pZCB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMubmFtZSkgdGhpcy5uYW1lID0gdGhpcy5vcHRpb25zLm5hbWU7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2lzU3RhbmRhbG9uZSgpICYmICF0aGlzLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgIFRlbXBsYXRlRHJpdmVuRXJyb3JzLm1pc3NpbmdOYW1lRXhjZXB0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcHJpdmF0ZSBfdXBkYXRlVmFsdWUodmFsdWU6IGFueSk6IHZvaWQge1xuICAgICAgICAgICAgICAgIHJlc29sdmVkUHJvbWlzZS50aGVuKFxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7IHRoaXMuY29udHJvbC5zZXRWYWx1ZSh2YWx1ZSwge2VtaXRWaWV3VG9Nb2RlbENoYW5nZTogZmFsc2V9KTsgfSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBwcml2YXRlIF91cGRhdGVEaXNhYmxlZChjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGlzYWJsZWRWYWx1ZSA9IGNoYW5nZXNbJ2lzRGlzYWJsZWQnXS5jdXJyZW50VmFsdWU7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBpc0Rpc2FibGVkID1cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWRWYWx1ZSA9PT0gJycgfHwgKGRpc2FibGVkVmFsdWUgJiYgZGlzYWJsZWRWYWx1ZSAhPT0gJ2ZhbHNlJyk7XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlZFByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAoaXNEaXNhYmxlZCAmJiAhdGhpcy5jb250cm9sLmRpc2FibGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbC5kaXNhYmxlKCk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFpc0Rpc2FibGVkICYmIHRoaXMuY29udHJvbC5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2wuZW5hYmxlKCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbn1cbiJdfQ==