/**
 * @fileoverview added by tsickle
 * Generated from: packages/forms/src/directives/ng_model_group.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, forwardRef, Host, Inject, Input, Optional, Self, SkipSelf } from '@angular/core';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS } from '../validators';
import { AbstractFormGroupDirective } from './abstract_form_group_directive';
import { ControlContainer } from './control_container';
import { NgForm } from './ng_form';
import { TemplateDrivenErrors } from './template_driven_errors';
import * as i0 from "@angular/core";
import * as i1 from "./control_container";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** @type {?} */
export const modelGroupProvider = {
    provide: ControlContainer,
    useExisting: forwardRef((/**
     * @return {?}
     */
    () => NgModelGroup))
};
/**
 * \@description
 * Creates and binds a `FormGroup` instance to a DOM element.
 *
 * This directive can only be used as a child of `NgForm` (within `<form>` tags).
 *
 * Use this directive to validate a sub-group of your form separately from the
 * rest of your form, or if some values in your domain model make more sense
 * to consume together in a nested object.
 *
 * Provide a name for the sub-group and it will become the key
 * for the sub-group in the form's full value. If you need direct access, export the directive into
 * a local template variable using `ngModelGroup` (ex: `#myGroup="ngModelGroup"`).
 *
 * \@usageNotes
 *
 * ### Consuming controls in a grouping
 *
 * The following example shows you how to combine controls together in a sub-group
 * of the form.
 *
 * {\@example forms/ts/ngModelGroup/ng_model_group_example.ts region='Component'}
 *
 * \@ngModule FormsModule
 * \@publicApi
 */
let NgModelGroup = /** @class */ (() => {
    /**
     * \@description
     * Creates and binds a `FormGroup` instance to a DOM element.
     *
     * This directive can only be used as a child of `NgForm` (within `<form>` tags).
     *
     * Use this directive to validate a sub-group of your form separately from the
     * rest of your form, or if some values in your domain model make more sense
     * to consume together in a nested object.
     *
     * Provide a name for the sub-group and it will become the key
     * for the sub-group in the form's full value. If you need direct access, export the directive into
     * a local template variable using `ngModelGroup` (ex: `#myGroup="ngModelGroup"`).
     *
     * \@usageNotes
     *
     * ### Consuming controls in a grouping
     *
     * The following example shows you how to combine controls together in a sub-group
     * of the form.
     *
     * {\@example forms/ts/ngModelGroup/ng_model_group_example.ts region='Component'}
     *
     * \@ngModule FormsModule
     * \@publicApi
     */
    class NgModelGroup extends AbstractFormGroupDirective {
        /**
         * @param {?} parent
         * @param {?} validators
         * @param {?} asyncValidators
         */
        constructor(parent, validators, asyncValidators) {
            super();
            this._parent = parent;
            this._validators = validators;
            this._asyncValidators = asyncValidators;
        }
        /**
         * \@internal
         * @return {?}
         */
        _checkParentType() {
            if (!(this._parent instanceof NgModelGroup) && !(this._parent instanceof NgForm)) {
                TemplateDrivenErrors.modelGroupParentException();
            }
        }
    }
    NgModelGroup.decorators = [
        { type: Directive, args: [{ selector: '[ngModelGroup]', providers: [modelGroupProvider], exportAs: 'ngModelGroup' },] },
    ];
    /** @nocollapse */
    NgModelGroup.ctorParameters = () => [
        { type: ControlContainer, decorators: [{ type: Host }, { type: SkipSelf }] },
        { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_VALIDATORS,] }] },
        { type: Array, decorators: [{ type: Optional }, { type: Self }, { type: Inject, args: [NG_ASYNC_VALIDATORS,] }] }
    ];
    NgModelGroup.propDecorators = {
        name: [{ type: Input, args: ['ngModelGroup',] }]
    };
    /** @nocollapse */ NgModelGroup.ɵfac = function NgModelGroup_Factory(t) { return new (t || NgModelGroup)(i0.ɵɵdirectiveInject(i1.ControlContainer, 5), i0.ɵɵdirectiveInject(NG_VALIDATORS, 10), i0.ɵɵdirectiveInject(NG_ASYNC_VALIDATORS, 10)); };
    /** @nocollapse */ NgModelGroup.ɵdir = i0.ɵɵdefineDirective({ type: NgModelGroup, selectors: [["", "ngModelGroup", ""]], inputs: { name: ["ngModelGroup", "name"] }, exportAs: ["ngModelGroup"], features: [i0.ɵɵProvidersFeature([modelGroupProvider]), i0.ɵɵInheritDefinitionFeature] });
    return NgModelGroup;
})();
export { NgModelGroup };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(NgModelGroup, [{
        type: Directive,
        args: [{ selector: '[ngModelGroup]', providers: [modelGroupProvider], exportAs: 'ngModelGroup' }]
    }], function () { return [{ type: i1.ControlContainer, decorators: [{
                type: Host
            }, {
                type: SkipSelf
            }] }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Self
            }, {
                type: Inject,
                args: [NG_VALIDATORS]
            }] }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Self
            }, {
                type: Inject,
                args: [NG_ASYNC_VALIDATORS]
            }] }]; }, { name: [{
            type: Input,
            args: ['ngModelGroup']
        }] }); })();
if (false) {
    /**
     * \@description
     * Tracks the name of the `NgModelGroup` bound to the directive. The name corresponds
     * to a key in the parent `NgForm`.
     * @type {?}
     */
    NgModelGroup.prototype.name;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfbW9kZWxfZ3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9mb3Jtcy9zcmMvZGlyZWN0aXZlcy9uZ19tb2RlbF9ncm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQVFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFxQixRQUFRLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV0SCxPQUFPLEVBQUMsbUJBQW1CLEVBQUUsYUFBYSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWpFLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQzNFLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDakMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7Ozs7Ozs7Ozs7O0FBRTlELE1BQU0sT0FBTyxrQkFBa0IsR0FBUTtJQUNyQyxPQUFPLEVBQUUsZ0JBQWdCO0lBQ3pCLFdBQVcsRUFBRSxVQUFVOzs7SUFBQyxHQUFHLEVBQUUsQ0FBQyxZQUFZLEVBQUM7Q0FDNUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRCRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsTUFDYSxZQUFhLFNBQVEsMEJBQTBCOzs7Ozs7UUFTMUQsWUFDd0IsTUFBd0IsRUFDRCxVQUFpQixFQUNYLGVBQXNCO1lBQ3pFLEtBQUssRUFBRSxDQUFDO1lBQ1IsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDdEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7WUFDOUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGVBQWUsQ0FBQztRQUMxQyxDQUFDOzs7OztRQUdELGdCQUFnQjtZQUNkLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLFlBQVksWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLFlBQVksTUFBTSxDQUFDLEVBQUU7Z0JBQ2hGLG9CQUFvQixDQUFDLHlCQUF5QixFQUFFLENBQUM7YUFDbEQ7UUFDSCxDQUFDOzs7Z0JBekJGLFNBQVMsU0FBQyxFQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUM7Ozs7Z0JBbkMxRixnQkFBZ0IsdUJBOENqQixJQUFJLFlBQUksUUFBUTs0Q0FDaEIsUUFBUSxZQUFJLElBQUksWUFBSSxNQUFNLFNBQUMsYUFBYTs0Q0FDeEMsUUFBUSxZQUFJLElBQUksWUFBSSxNQUFNLFNBQUMsbUJBQW1COzs7dUJBTGxELEtBQUssU0FBQyxjQUFjOzsrRkFQVixZQUFZLHFFQVdTLGFBQWEsNEJBQ2IsbUJBQW1CO3dFQVp4QyxZQUFZLGtKQUQwQixDQUFDLGtCQUFrQixDQUFDO3VCQWhEdkU7S0EwRUM7U0F6QlksWUFBWTtrREFBWixZQUFZO2NBRHhCLFNBQVM7ZUFBQyxFQUFDLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUM7O3NCQVczRixJQUFJOztzQkFBSSxRQUFROztzQkFDaEIsUUFBUTs7c0JBQUksSUFBSTs7c0JBQUksTUFBTTt1QkFBQyxhQUFhOztzQkFDeEMsUUFBUTs7c0JBQUksSUFBSTs7c0JBQUksTUFBTTt1QkFBQyxtQkFBbUI7O2tCQUxsRCxLQUFLO21CQUFDLGNBQWM7Ozs7Ozs7OztJQUFyQiw0QkFBcUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlLCBmb3J3YXJkUmVmLCBIb3N0LCBJbmplY3QsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3B0aW9uYWwsIFNlbGYsIFNraXBTZWxmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtOR19BU1lOQ19WQUxJREFUT1JTLCBOR19WQUxJREFUT1JTfSBmcm9tICcuLi92YWxpZGF0b3JzJztcblxuaW1wb3J0IHtBYnN0cmFjdEZvcm1Hcm91cERpcmVjdGl2ZX0gZnJvbSAnLi9hYnN0cmFjdF9mb3JtX2dyb3VwX2RpcmVjdGl2ZSc7XG5pbXBvcnQge0NvbnRyb2xDb250YWluZXJ9IGZyb20gJy4vY29udHJvbF9jb250YWluZXInO1xuaW1wb3J0IHtOZ0Zvcm19IGZyb20gJy4vbmdfZm9ybSc7XG5pbXBvcnQge1RlbXBsYXRlRHJpdmVuRXJyb3JzfSBmcm9tICcuL3RlbXBsYXRlX2RyaXZlbl9lcnJvcnMnO1xuXG5leHBvcnQgY29uc3QgbW9kZWxHcm91cFByb3ZpZGVyOiBhbnkgPSB7XG4gIHByb3ZpZGU6IENvbnRyb2xDb250YWluZXIsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nTW9kZWxHcm91cClcbn07XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDcmVhdGVzIGFuZCBiaW5kcyBhIGBGb3JtR3JvdXBgIGluc3RhbmNlIHRvIGEgRE9NIGVsZW1lbnQuXG4gKlxuICogVGhpcyBkaXJlY3RpdmUgY2FuIG9ubHkgYmUgdXNlZCBhcyBhIGNoaWxkIG9mIGBOZ0Zvcm1gICh3aXRoaW4gYDxmb3JtPmAgdGFncykuXG4gKlxuICogVXNlIHRoaXMgZGlyZWN0aXZlIHRvIHZhbGlkYXRlIGEgc3ViLWdyb3VwIG9mIHlvdXIgZm9ybSBzZXBhcmF0ZWx5IGZyb20gdGhlXG4gKiByZXN0IG9mIHlvdXIgZm9ybSwgb3IgaWYgc29tZSB2YWx1ZXMgaW4geW91ciBkb21haW4gbW9kZWwgbWFrZSBtb3JlIHNlbnNlXG4gKiB0byBjb25zdW1lIHRvZ2V0aGVyIGluIGEgbmVzdGVkIG9iamVjdC5cbiAqXG4gKiBQcm92aWRlIGEgbmFtZSBmb3IgdGhlIHN1Yi1ncm91cCBhbmQgaXQgd2lsbCBiZWNvbWUgdGhlIGtleVxuICogZm9yIHRoZSBzdWItZ3JvdXAgaW4gdGhlIGZvcm0ncyBmdWxsIHZhbHVlLiBJZiB5b3UgbmVlZCBkaXJlY3QgYWNjZXNzLCBleHBvcnQgdGhlIGRpcmVjdGl2ZSBpbnRvXG4gKiBhIGxvY2FsIHRlbXBsYXRlIHZhcmlhYmxlIHVzaW5nIGBuZ01vZGVsR3JvdXBgIChleDogYCNteUdyb3VwPVwibmdNb2RlbEdyb3VwXCJgKS5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICpcbiAqICMjIyBDb25zdW1pbmcgY29udHJvbHMgaW4gYSBncm91cGluZ1xuICpcbiAqIFRoZSBmb2xsb3dpbmcgZXhhbXBsZSBzaG93cyB5b3UgaG93IHRvIGNvbWJpbmUgY29udHJvbHMgdG9nZXRoZXIgaW4gYSBzdWItZ3JvdXBcbiAqIG9mIHRoZSBmb3JtLlxuICpcbiAqIHtAZXhhbXBsZSBmb3Jtcy90cy9uZ01vZGVsR3JvdXAvbmdfbW9kZWxfZ3JvdXBfZXhhbXBsZS50cyByZWdpb249J0NvbXBvbmVudCd9XG4gKlxuICogQG5nTW9kdWxlIEZvcm1zTW9kdWxlXG4gKiBAcHVibGljQXBpXG4gKi9cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW25nTW9kZWxHcm91cF0nLCBwcm92aWRlcnM6IFttb2RlbEdyb3VwUHJvdmlkZXJdLCBleHBvcnRBczogJ25nTW9kZWxHcm91cCd9KVxuZXhwb3J0IGNsYXNzIE5nTW9kZWxHcm91cCBleHRlbmRzIEFic3RyYWN0Rm9ybUdyb3VwRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRyYWNrcyB0aGUgbmFtZSBvZiB0aGUgYE5nTW9kZWxHcm91cGAgYm91bmQgdG8gdGhlIGRpcmVjdGl2ZS4gVGhlIG5hbWUgY29ycmVzcG9uZHNcbiAgICogdG8gYSBrZXkgaW4gdGhlIHBhcmVudCBgTmdGb3JtYC5cbiAgICovXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBASW5wdXQoJ25nTW9kZWxHcm91cCcpIG5hbWUhOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBASG9zdCgpIEBTa2lwU2VsZigpIHBhcmVudDogQ29udHJvbENvbnRhaW5lcixcbiAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgQEluamVjdChOR19WQUxJREFUT1JTKSB2YWxpZGF0b3JzOiBhbnlbXSxcbiAgICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgQEluamVjdChOR19BU1lOQ19WQUxJREFUT1JTKSBhc3luY1ZhbGlkYXRvcnM6IGFueVtdKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5fdmFsaWRhdG9ycyA9IHZhbGlkYXRvcnM7XG4gICAgdGhpcy5fYXN5bmNWYWxpZGF0b3JzID0gYXN5bmNWYWxpZGF0b3JzO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY2hlY2tQYXJlbnRUeXBlKCk6IHZvaWQge1xuICAgIGlmICghKHRoaXMuX3BhcmVudCBpbnN0YW5jZW9mIE5nTW9kZWxHcm91cCkgJiYgISh0aGlzLl9wYXJlbnQgaW5zdGFuY2VvZiBOZ0Zvcm0pKSB7XG4gICAgICBUZW1wbGF0ZURyaXZlbkVycm9ycy5tb2RlbEdyb3VwUGFyZW50RXhjZXB0aW9uKCk7XG4gICAgfVxuICB9XG59XG4iXX0=