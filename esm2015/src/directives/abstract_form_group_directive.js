/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive } from '@angular/core';
import { ControlContainer } from './control_container';
import { composeAsyncValidators, composeValidators, controlPath } from './shared';
import * as i0 from "@angular/core";
/**
 * @description
 * A base class for code shared between the `NgModelGroup` and `FormGroupName` directives.
 *
 * @publicApi
 */
export class AbstractFormGroupDirective extends ControlContainer {
    /**
     * @description
     * An internal callback method triggered on the instance after the inputs are set.
     * Registers the group with its parent group.
     */
    ngOnInit() {
        this._checkParentType();
        this.formDirective.addFormGroup(this);
    }
    /**
     * @description
     * An internal callback method triggered before the instance is destroyed.
     * Removes the group from its parent group.
     */
    ngOnDestroy() {
        if (this.formDirective) {
            this.formDirective.removeFormGroup(this);
        }
    }
    /**
     * @description
     * The `FormGroup` bound to this directive.
     */
    get control() {
        return this.formDirective.getFormGroup(this);
    }
    /**
     * @description
     * The path to this group from the top-level directive.
     */
    get path() {
        return controlPath(this.name == null ? this.name : this.name.toString(), this._parent);
    }
    /**
     * @description
     * The top-level directive for this group if present, otherwise null.
     */
    get formDirective() {
        return this._parent ? this._parent.formDirective : null;
    }
    /**
     * @description
     * The synchronous validators registered with this group.
     */
    get validator() {
        return composeValidators(this._validators);
    }
    /**
     * @description
     * The async validators registered with this group.
     */
    get asyncValidator() {
        return composeAsyncValidators(this._asyncValidators);
    }
    /** @internal */
    _checkParentType() { }
}
AbstractFormGroupDirective.ɵfac = function AbstractFormGroupDirective_Factory(t) { return ɵAbstractFormGroupDirective_BaseFactory(t || AbstractFormGroupDirective); };
AbstractFormGroupDirective.ɵdir = i0.ɵɵdefineDirective({ type: AbstractFormGroupDirective, features: [i0.ɵɵInheritDefinitionFeature] });
const ɵAbstractFormGroupDirective_BaseFactory = i0.ɵɵgetInheritedFactory(AbstractFormGroupDirective);
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(AbstractFormGroupDirective, [{
        type: Directive
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3RfZm9ybV9ncm91cF9kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9mb3Jtcy9zcmMvZGlyZWN0aXZlcy9hYnN0cmFjdF9mb3JtX2dyb3VwX2RpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQUMsU0FBUyxFQUFvQixNQUFNLGVBQWUsQ0FBQztBQUkzRCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUVyRCxPQUFPLEVBQUMsc0JBQXNCLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFDLE1BQU0sVUFBVSxDQUFDOztBQUtoRjs7Ozs7R0FLRztBQUVILE1BQU0sT0FBTywwQkFBMkIsU0FBUSxnQkFBZ0I7SUE0QjlEOzs7O09BSUc7SUFDSCxRQUFRO1FBQ04sSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGFBQWMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxXQUFXO1FBQ1QsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzFDO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNILElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLGFBQWMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVEOzs7T0FHRztJQUNILElBQUksSUFBSTtRQUNOLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBSSxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQzFELENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUFJLFNBQVM7UUFDWCxPQUFPLGlCQUFpQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBSSxjQUFjO1FBQ2hCLE9BQU8sc0JBQXNCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELGdCQUFnQjtJQUNoQixnQkFBZ0IsS0FBVSxDQUFDOzt1SUExRmhCLDBCQUEwQjsrREFBMUIsMEJBQTBCO3lFQUExQiwwQkFBMEI7a0RBQTFCLDBCQUEwQjtjQUR0QyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7RGlyZWN0aXZlLCBPbkRlc3Ryb3ksIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7Rm9ybUdyb3VwfSBmcm9tICcuLi9tb2RlbCc7XG5cbmltcG9ydCB7Q29udHJvbENvbnRhaW5lcn0gZnJvbSAnLi9jb250cm9sX2NvbnRhaW5lcic7XG5pbXBvcnQge0Zvcm19IGZyb20gJy4vZm9ybV9pbnRlcmZhY2UnO1xuaW1wb3J0IHtjb21wb3NlQXN5bmNWYWxpZGF0b3JzLCBjb21wb3NlVmFsaWRhdG9ycywgY29udHJvbFBhdGh9IGZyb20gJy4vc2hhcmVkJztcbmltcG9ydCB7QXN5bmNWYWxpZGF0b3JGbiwgVmFsaWRhdG9yRm59IGZyb20gJy4vdmFsaWRhdG9ycyc7XG5cblxuXG4vKipcbiAqIEBkZXNjcmlwdGlvblxuICogQSBiYXNlIGNsYXNzIGZvciBjb2RlIHNoYXJlZCBiZXR3ZWVuIHRoZSBgTmdNb2RlbEdyb3VwYCBhbmQgYEZvcm1Hcm91cE5hbWVgIGRpcmVjdGl2ZXMuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBBYnN0cmFjdEZvcm1Hcm91cERpcmVjdGl2ZSBleHRlbmRzIENvbnRyb2xDb250YWluZXIgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhlIHBhcmVudCBjb250cm9sIGZvciB0aGUgZ3JvdXBcbiAgICpcbiAgICogQGludGVybmFsXG4gICAqL1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgX3BhcmVudCE6IENvbnRyb2xDb250YWluZXI7XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBBbiBhcnJheSBvZiBzeW5jaHJvbm91cyB2YWxpZGF0b3JzIGZvciB0aGUgZ3JvdXBcbiAgICpcbiAgICogQGludGVybmFsXG4gICAqL1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgX3ZhbGlkYXRvcnMhOiBhbnlbXTtcblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEFuIGFycmF5IG9mIGFzeW5jIHZhbGlkYXRvcnMgZm9yIHRoZSBncm91cFxuICAgKlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIC8vIFRPRE8oaXNzdWUvMjQ1NzEpOiByZW1vdmUgJyEnLlxuICBfYXN5bmNWYWxpZGF0b3JzITogYW55W107XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBBbiBpbnRlcm5hbCBjYWxsYmFjayBtZXRob2QgdHJpZ2dlcmVkIG9uIHRoZSBpbnN0YW5jZSBhZnRlciB0aGUgaW5wdXRzIGFyZSBzZXQuXG4gICAqIFJlZ2lzdGVycyB0aGUgZ3JvdXAgd2l0aCBpdHMgcGFyZW50IGdyb3VwLlxuICAgKi9cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fY2hlY2tQYXJlbnRUeXBlKCk7XG4gICAgdGhpcy5mb3JtRGlyZWN0aXZlIS5hZGRGb3JtR3JvdXAodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIEFuIGludGVybmFsIGNhbGxiYWNrIG1ldGhvZCB0cmlnZ2VyZWQgYmVmb3JlIHRoZSBpbnN0YW5jZSBpcyBkZXN0cm95ZWQuXG4gICAqIFJlbW92ZXMgdGhlIGdyb3VwIGZyb20gaXRzIHBhcmVudCBncm91cC5cbiAgICovXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmZvcm1EaXJlY3RpdmUpIHtcbiAgICAgIHRoaXMuZm9ybURpcmVjdGl2ZS5yZW1vdmVGb3JtR3JvdXAodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGUgYEZvcm1Hcm91cGAgYm91bmQgdG8gdGhpcyBkaXJlY3RpdmUuXG4gICAqL1xuICBnZXQgY29udHJvbCgpOiBGb3JtR3JvdXAge1xuICAgIHJldHVybiB0aGlzLmZvcm1EaXJlY3RpdmUhLmdldEZvcm1Hcm91cCh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhlIHBhdGggdG8gdGhpcyBncm91cCBmcm9tIHRoZSB0b3AtbGV2ZWwgZGlyZWN0aXZlLlxuICAgKi9cbiAgZ2V0IHBhdGgoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBjb250cm9sUGF0aCh0aGlzLm5hbWUgPT0gbnVsbCA/IHRoaXMubmFtZSA6IHRoaXMubmFtZS50b1N0cmluZygpLCB0aGlzLl9wYXJlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkZXNjcmlwdGlvblxuICAgKiBUaGUgdG9wLWxldmVsIGRpcmVjdGl2ZSBmb3IgdGhpcyBncm91cCBpZiBwcmVzZW50LCBvdGhlcndpc2UgbnVsbC5cbiAgICovXG4gIGdldCBmb3JtRGlyZWN0aXZlKCk6IEZvcm18bnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX3BhcmVudCA/IHRoaXMuX3BhcmVudC5mb3JtRGlyZWN0aXZlIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhlIHN5bmNocm9ub3VzIHZhbGlkYXRvcnMgcmVnaXN0ZXJlZCB3aXRoIHRoaXMgZ3JvdXAuXG4gICAqL1xuICBnZXQgdmFsaWRhdG9yKCk6IFZhbGlkYXRvckZufG51bGwge1xuICAgIHJldHVybiBjb21wb3NlVmFsaWRhdG9ycyh0aGlzLl92YWxpZGF0b3JzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhlIGFzeW5jIHZhbGlkYXRvcnMgcmVnaXN0ZXJlZCB3aXRoIHRoaXMgZ3JvdXAuXG4gICAqL1xuICBnZXQgYXN5bmNWYWxpZGF0b3IoKTogQXN5bmNWYWxpZGF0b3JGbnxudWxsIHtcbiAgICByZXR1cm4gY29tcG9zZUFzeW5jVmFsaWRhdG9ycyh0aGlzLl9hc3luY1ZhbGlkYXRvcnMpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfY2hlY2tQYXJlbnRUeXBlKCk6IHZvaWQge31cbn1cbiJdfQ==