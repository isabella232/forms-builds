/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { Directive, EventEmitter, Inject, Input, Optional, Self, forwardRef } from '@angular/core';
import { FormGroup } from '../model';
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS } from '../validators';
import { ControlContainer } from './control_container';
import { composeAsyncValidators, composeValidators, removeDir, setUpControl, setUpFormContainer, syncPendingControls } from './shared';
export const formDirectiveProvider = {
    provide: ControlContainer,
    useExisting: forwardRef(() => NgForm)
};
const resolvedPromise = Promise.resolve(null);
/**
 * @description
 *
 * Creates a top-level `FormGroup` instance and binds it to a form
 * to track aggregate form value and validation status.
 *
 * As soon as you import the `FormsModule`, this directive becomes active by default on
 * all `<form>` tags.  You don't need to add a special selector.
 *
 * You can export the directive into a local template variable using `ngForm` as the key
 * (ex: `#myForm="ngForm"`). This is optional, but useful.  Many properties from the underlying
 * `FormGroup` instance are duplicated on the directive itself, so a reference to it
 * will give you access to the aggregate value and validity status of the form, as well as
 * user interaction properties like `dirty` and `touched`.
 *
 * To register child controls with the form, you'll want to use `NgModel` with a
 * `name` attribute.  You can also use `NgModelGroup` if you'd like to create
 * sub-groups within the form.
 *
 * You can listen to the directive's `ngSubmit` event to be notified when the user has
 * triggered a form submission. The `ngSubmit` event will be emitted with the original form
 * submission event.
 *
 * In template driven forms, all `<form>` tags are automatically tagged as `NgForm`.
 * If you want to import the `FormsModule` but skip its usage in some forms,
 * for example, to use native HTML5 validation, you can add `ngNoForm` and the `<form>`
 * tags won't create an `NgForm` directive. In reactive forms, using `ngNoForm` is
 * unnecessary because the `<form>` tags are inert. In that case, you would
 * refrain from using the `formGroup` directive.
 *
 * Support for using `ngForm` element selector has been deprecated in Angular v6 and will be removed
 * in Angular v9.
 *
 * This has been deprecated to keep selectors consistent with other core Angular selectors,
 * as element selectors are typically written in kebab-case.
 *
 * Now deprecated:
 * ```html
 * <ngForm #myForm="ngForm">
 * ```
 *
 * After:
 * ```html
 * <ng-form #myForm="ngForm">
 * ```
 *
 * {@example forms/ts/simpleForm/simple_form_example.ts region='Component'}
 *
 * * **npm package**: `@angular/forms`
 *
 * * **NgModule**: `FormsModule`
 *
 */
let NgForm = class NgForm extends ControlContainer {
    constructor(validators, asyncValidators) {
        super();
        this.submitted = false;
        this._directives = [];
        this.ngSubmit = new EventEmitter();
        this.form =
            new FormGroup({}, composeValidators(validators), composeAsyncValidators(asyncValidators));
    }
    ngAfterViewInit() { this._setUpdateStrategy(); }
    get formDirective() { return this; }
    get control() { return this.form; }
    get path() { return []; }
    get controls() { return this.form.controls; }
    addControl(dir) {
        resolvedPromise.then(() => {
            const container = this._findContainer(dir.path);
            dir.control =
                container.registerControl(dir.name, dir.control);
            setUpControl(dir.control, dir);
            dir.control.updateValueAndValidity({ emitEvent: false });
            this._directives.push(dir);
        });
    }
    getControl(dir) { return this.form.get(dir.path); }
    removeControl(dir) {
        resolvedPromise.then(() => {
            const container = this._findContainer(dir.path);
            if (container) {
                container.removeControl(dir.name);
            }
            removeDir(this._directives, dir);
        });
    }
    addFormGroup(dir) {
        resolvedPromise.then(() => {
            const container = this._findContainer(dir.path);
            const group = new FormGroup({});
            setUpFormContainer(group, dir);
            container.registerControl(dir.name, group);
            group.updateValueAndValidity({ emitEvent: false });
        });
    }
    removeFormGroup(dir) {
        resolvedPromise.then(() => {
            const container = this._findContainer(dir.path);
            if (container) {
                container.removeControl(dir.name);
            }
        });
    }
    getFormGroup(dir) { return this.form.get(dir.path); }
    updateModel(dir, value) {
        resolvedPromise.then(() => {
            const ctrl = this.form.get(dir.path);
            ctrl.setValue(value);
        });
    }
    setValue(value) { this.control.setValue(value); }
    onSubmit($event) {
        this.submitted = true;
        syncPendingControls(this.form, this._directives);
        this.ngSubmit.emit($event);
        return false;
    }
    onReset() { this.resetForm(); }
    resetForm(value = undefined) {
        this.form.reset(value);
        this.submitted = false;
    }
    _setUpdateStrategy() {
        if (this.options && this.options.updateOn != null) {
            this.form._updateOn = this.options.updateOn;
        }
    }
    /** @internal */
    _findContainer(path) {
        path.pop();
        return path.length ? this.form.get(path) : this.form;
    }
};
tslib_1.__decorate([
    Input('ngFormOptions'),
    tslib_1.__metadata("design:type", Object)
], NgForm.prototype, "options", void 0);
NgForm = tslib_1.__decorate([
    Directive({
        selector: 'form:not([ngNoForm]):not([formGroup]),ngForm,ng-form,[ngForm]',
        providers: [formDirectiveProvider],
        host: { '(submit)': 'onSubmit($event)', '(reset)': 'onReset()' },
        outputs: ['ngSubmit'],
        exportAs: 'ngForm'
    }),
    tslib_1.__param(0, Optional()), tslib_1.__param(0, Self()), tslib_1.__param(0, Inject(NG_VALIDATORS)),
    tslib_1.__param(1, Optional()), tslib_1.__param(1, Self()), tslib_1.__param(1, Inject(NG_ASYNC_VALIDATORS)),
    tslib_1.__metadata("design:paramtypes", [Array, Array])
], NgForm);
export { NgForm };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Zvcm1zL3NyYy9kaXJlY3RpdmVzL25nX2Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBZ0IsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWhILE9BQU8sRUFBK0IsU0FBUyxFQUFZLE1BQU0sVUFBVSxDQUFDO0FBQzVFLE9BQU8sRUFBQyxtQkFBbUIsRUFBRSxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFakUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFLckQsT0FBTyxFQUFDLHNCQUFzQixFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsbUJBQW1CLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFFckksTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQVE7SUFDeEMsT0FBTyxFQUFFLGdCQUFnQjtJQUN6QixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztDQUN0QyxDQUFDO0FBRUYsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUU5Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9ERztBQVFILElBQWEsTUFBTSxHQUFuQixZQUFvQixTQUFRLGdCQUFnQjtJQTBCMUMsWUFDK0MsVUFBaUIsRUFDWCxlQUFzQjtRQUN6RSxLQUFLLEVBQUUsQ0FBQztRQTNCTSxjQUFTLEdBQVksS0FBSyxDQUFDO1FBRW5DLGdCQUFXLEdBQWMsRUFBRSxDQUFDO1FBR3BDLGFBQVEsR0FBRyxJ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R0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQztTQUM3QztJQUNILENBQUM7SUFFRCxnQkFBZ0I7SUFDaEIsY0FBYyxDQUFDLElBQWM7UUFDM0IsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ1gsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBWSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNsRSxDQUFDO0NBQ0YsQ0FBQTtBQWxHeUI7SUFBdkIsS0FBSyxDQUFDLGVBQWUsQ0FBQzs7dUNBQW1DO0FBeEIvQyxNQUFNO0lBUGxCLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSwrREFBK0Q7UUFDekUsU0FBUyxFQUFFLENBQUMscUJBQXFCLENBQUM7UUFDbEMsSUFBSSxFQUFFLEVBQUMsVUFBVSxFQUFFLGtCQUFrQixFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUM7UUFDOUQsT0FBTyxFQUFFLENBQUMsVUFBVSxDQUFDO1FBQ3JCLFFBQVEsRUFBRSxRQUFRO0tBQ25CLENBQUM7SUE0QkssbUJBQUEsUUFBUSxFQUFFLENBQUEsRUFBRSxtQkFBQSxJQUFJLEVBQUUsQ0FBQSxFQUFFLG1CQUFBLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUN6QyxtQkFBQSxRQUFRLEVBQUUsQ0FBQSxFQUFFLG1CQUFBLElBQUksRUFBRSxDQUFBLEVBQUUsbUJBQUEsTUFBTSxDQUFDLG1CQUFtQixDQUFDLENBQUE7O0dBNUJ6QyxNQUFNLENBMEhsQjtTQTFIWSxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0FmdGVyVmlld0luaXQsIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbmplY3QsIElucHV0LCBPcHRpb25hbCwgU2VsZiwgZm9yd2FyZFJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWJzdHJhY3RDb250cm9sLCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBGb3JtSG9va3N9IGZyb20gJy4uL21vZGVsJztcbmltcG9ydCB7TkdfQVNZTkNfVkFMSURBVE9SUywgTkdfVkFMSURBVE9SU30gZnJvbSAnLi4vdmFsaWRhdG9ycyc7XG5cbmltcG9ydCB7Q29udHJvbENvbnRhaW5lcn0gZnJvbSAnLi9jb250cm9sX2NvbnRhaW5lcic7XG5pbXBvcnQge0Zvcm19IGZyb20gJy4vZm9ybV9pbnRlcmZhY2UnO1xuaW1wb3J0IHtOZ0NvbnRyb2x9IGZyb20gJy4vbmdfY29udHJvbCc7XG5pbXBvcnQge05nTW9kZWx9IGZyb20gJy4vbmdfbW9kZWwnO1xuaW1wb3J0IHtOZ01vZGVsR3JvdXB9IGZyb20gJy4vbmdfbW9kZWxfZ3JvdXAnO1xuaW1wb3J0IHtjb21wb3NlQXN5bmNWYWxpZGF0b3JzLCBjb21wb3NlVmFsaWRhdG9ycywgcmVtb3ZlRGlyLCBzZXRVcENvbnRyb2wsIHNldFVwRm9ybUNvbnRhaW5lciwgc3luY1BlbmRpbmdDb250cm9sc30gZnJvbSAnLi9zaGFyZWQnO1xuXG5leHBvcnQgY29uc3QgZm9ybURpcmVjdGl2ZVByb3ZpZGVyOiBhbnkgPSB7XG4gIHByb3ZpZGU6IENvbnRyb2xDb250YWluZXIsXG4gIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE5nRm9ybSlcbn07XG5cbmNvbnN0IHJlc29sdmVkUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShudWxsKTtcblxuLyoqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBDcmVhdGVzIGEgdG9wLWxldmVsIGBGb3JtR3JvdXBgIGluc3RhbmNlIGFuZCBiaW5kcyBpdCB0byBhIGZvcm1cbiAqIHRvIHRyYWNrIGFnZ3JlZ2F0ZSBmb3JtIHZhbHVlIGFuZCB2YWxpZGF0aW9uIHN0YXR1cy5cbiAqXG4gKiBBcyBzb29uIGFzIHlvdSBpbXBvcnQgdGhlIGBGb3Jtc01vZHVsZWAsIHRoaXMgZGlyZWN0aXZlIGJlY29tZXMgYWN0aXZlIGJ5IGRlZmF1bHQgb25cbiAqIGFsbCBgPGZvcm0+YCB0YWdzLiAgWW91IGRvbid0IG5lZWQgdG8gYWRkIGEgc3BlY2lhbCBzZWxlY3Rvci5cbiAqXG4gKiBZb3UgY2FuIGV4cG9ydCB0aGUgZGlyZWN0aXZlIGludG8gYSBsb2NhbCB0ZW1wbGF0ZSB2YXJpYWJsZSB1c2luZyBgbmdGb3JtYCBhcyB0aGUga2V5XG4gKiAoZXg6IGAjbXlGb3JtPVwibmdGb3JtXCJgKS4gVGhpcyBpcyBvcHRpb25hbCwgYnV0IHVzZWZ1bC4gIE1hbnkgcHJvcGVydGllcyBmcm9tIHRoZSB1bmRlcmx5aW5nXG4gKiBgRm9ybUdyb3VwYCBpbnN0YW5jZSBhcmUgZHVwbGljYXRlZCBvbiB0aGUgZGlyZWN0aXZlIGl0c2VsZiwgc28gYSByZWZlcmVuY2UgdG8gaXRcbiAqIHdpbGwgZ2l2ZSB5b3UgYWNjZXNzIHRvIHRoZSBhZ2dyZWdhdGUgdmFsdWUgYW5kIHZhbGlkaXR5IHN0YXR1cyBvZiB0aGUgZm9ybSwgYXMgd2VsbCBhc1xuICogdXNlciBpbnRlcmFjdGlvbiBwcm9wZXJ0aWVzIGxpa2UgYGRpcnR5YCBhbmQgYHRvdWNoZWRgLlxuICpcbiAqIFRvIHJlZ2lzdGVyIGNoaWxkIGNvbnRyb2xzIHdpdGggdGhlIGZvcm0sIHlvdSdsbCB3YW50IHRvIHVzZSBgTmdNb2RlbGAgd2l0aCBhXG4gKiBgbmFtZWAgYXR0cmlidXRlLiAgWW91IGNhbiBhbHNvIHVzZSBgTmdNb2RlbEdyb3VwYCBpZiB5b3UnZCBsaWtlIHRvIGNyZWF0ZVxuICogc3ViLWdyb3VwcyB3aXRoaW4gdGhlIGZvcm0uXG4gKlxuICogWW91IGNhbiBsaXN0ZW4gdG8gdGhlIGRpcmVjdGl2ZSdzIGBuZ1N1Ym1pdGAgZXZlbnQgdG8gYmUgbm90aWZpZWQgd2hlbiB0aGUgdXNlciBoYXNcbiAqIHRyaWdnZXJlZCBhIGZvcm0gc3VibWlzc2lvbi4gVGhlIGBuZ1N1Ym1pdGAgZXZlbnQgd2lsbCBiZSBlbWl0dGVkIHdpdGggdGhlIG9yaWdpbmFsIGZvcm1cbiAqIHN1Ym1pc3Npb24gZXZlbnQuXG4gKlxuICogSW4gdGVtcGxhdGUgZHJpdmVuIGZvcm1zLCBhbGwgYDxmb3JtPmAgdGFncyBhcmUgYXV0b21hdGljYWxseSB0YWdnZWQgYXMgYE5nRm9ybWAuXG4gKiBJZiB5b3Ugd2FudCB0byBpbXBvcnQgdGhlIGBGb3Jtc01vZHVsZWAgYnV0IHNraXAgaXRzIHVzYWdlIGluIHNvbWUgZm9ybXMsXG4gKiBmb3IgZXhhbXBsZSwgdG8gdXNlIG5hdGl2ZSBIVE1MNSB2YWxpZGF0aW9uLCB5b3UgY2FuIGFkZCBgbmdOb0Zvcm1gIGFuZCB0aGUgYDxmb3JtPmBcbiAqIHRhZ3Mgd29uJ3QgY3JlYXRlIGFuIGBOZ0Zvcm1gIGRpcmVjdGl2ZS4gSW4gcmVhY3RpdmUgZm9ybXMsIHVzaW5nIGBuZ05vRm9ybWAgaXNcbiAqIHVubmVjZXNzYXJ5IGJlY2F1c2UgdGhlIGA8Zm9ybT5gIHRhZ3MgYXJlIGluZXJ0LiBJbiB0aGF0IGNhc2UsIHlvdSB3b3VsZFxuICogcmVmcmFpbiBmcm9tIHVzaW5nIHRoZSBgZm9ybUdyb3VwYCBkaXJlY3RpdmUuXG4gKlxuICogU3VwcG9ydCBmb3IgdXNpbmcgYG5nRm9ybWAgZWxlbWVudCBzZWxlY3RvciBoYXMgYmVlbiBkZXByZWNhdGVkIGluIEFuZ3VsYXIgdjYgYW5kIHdpbGwgYmUgcmVtb3ZlZFxuICogaW4gQW5ndWxhciB2OS5cbiAqXG4gKiBUaGlzIGhhcyBiZWVuIGRlcHJlY2F0ZWQgdG8ga2VlcCBzZWxlY3RvcnMgY29uc2lzdGVudCB3aXRoIG90aGVyIGNvcmUgQW5ndWxhciBzZWxlY3RvcnMsXG4gKiBhcyBlbGVtZW50IHNlbGVjdG9ycyBhcmUgdHlwaWNhbGx5IHdyaXR0ZW4gaW4ga2ViYWItY2FzZS5cbiAqXG4gKiBOb3cgZGVwcmVjYXRlZDpcbiAqIGBgYGh0bWxcbiAqIDxuZ0Zvcm0gI215Rm9ybT1cIm5nRm9ybVwiPlxuICogYGBgXG4gKlxuICogQWZ0ZXI6XG4gKiBgYGBodG1sXG4gKiA8bmctZm9ybSAjbXlGb3JtPVwibmdGb3JtXCI+XG4gKiBgYGBcbiAqXG4gKiB7QGV4YW1wbGUgZm9ybXMvdHMvc2ltcGxlRm9ybS9zaW1wbGVfZm9ybV9leGFtcGxlLnRzIHJlZ2lvbj0nQ29tcG9uZW50J31cbiAqXG4gKiAqICoqbnBtIHBhY2thZ2UqKjogYEBhbmd1bGFyL2Zvcm1zYFxuICpcbiAqICogKipOZ01vZHVsZSoqOiBgRm9ybXNNb2R1bGVgXG4gKlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdmb3JtOm5vdChbbmdOb0Zvcm1dKTpub3QoW2Zvcm1Hcm91cF0pLG5nRm9ybSxuZy1mb3JtLFtuZ0Zvcm1dJyxcbiAgcHJvdmlkZXJzOiBbZm9ybURpcmVjdGl2ZVByb3ZpZGVyXSxcbiAgaG9zdDogeycoc3VibWl0KSc6ICdvblN1Ym1pdCgkZXZlbnQpJywgJyhyZXNldCknOiAnb25SZXNldCgpJ30sXG4gIG91dHB1dHM6IFsnbmdTdWJtaXQnXSxcbiAgZXhwb3J0QXM6ICduZ0Zvcm0nXG59KVxuZXhwb3J0IGNsYXNzIE5nRm9ybSBleHRlbmRzIENvbnRyb2xDb250YWluZXIgaW1wbGVtZW50cyBGb3JtLFxuICAgIEFmdGVyVmlld0luaXQge1xuICBwdWJsaWMgcmVhZG9ubHkgc3VibWl0dGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfZGlyZWN0aXZlczogTmdNb2RlbFtdID0gW107XG5cbiAgZm9ybTogRm9ybUdyb3VwO1xuICBuZ1N1Ym1pdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogT3B0aW9ucyBmb3IgdGhlIGBOZ0Zvcm1gIGluc3RhbmNlLiBBY2NlcHRzIHRoZSBmb2xsb3dpbmcgcHJvcGVydGllczpcbiAgICpcbiAgICogKip1cGRhdGVPbioqOiBTZXJ2ZXMgYXMgdGhlIGRlZmF1bHQgYHVwZGF0ZU9uYCB2YWx1ZSBmb3IgYWxsIGNoaWxkIGBOZ01vZGVsc2AgYmVsb3cgaXRcbiAgICogKHVubGVzcyBhIGNoaWxkIGhhcyBleHBsaWNpdGx5IHNldCBpdHMgb3duIHZhbHVlIGZvciB0aGlzIGluIGBuZ01vZGVsT3B0aW9uc2ApLlxuICAgKiBQb3RlbnRpYWwgdmFsdWVzOiBgJ2NoYW5nZSdgIHwgYCdibHVyJ2AgfCBgJ3N1Ym1pdCdgXG4gICAqXG4gICAqIGBgYGh0bWxcbiAgICogPGZvcm0gW25nRm9ybU9wdGlvbnNdPVwie3VwZGF0ZU9uOiAnYmx1cid9XCI+XG4gICAqICAgIDxpbnB1dCBuYW1lPVwib25lXCIgbmdNb2RlbD4gIDwhLS0gdGhpcyBuZ01vZGVsIHdpbGwgdXBkYXRlIG9uIGJsdXIgLS0+XG4gICAqIDwvZm9ybT5cbiAgICogYGBgXG4gICAqXG4gICAqL1xuICAvLyBUT0RPKGlzc3VlLzI0NTcxKTogcmVtb3ZlICchJy5cbiAgQElucHV0KCduZ0Zvcm1PcHRpb25zJykgb3B0aW9ucyAhOiB7dXBkYXRlT24/OiBGb3JtSG9va3N9O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBASW5qZWN0KE5HX1ZBTElEQVRPUlMpIHZhbGlkYXRvcnM6IGFueVtdLFxuICAgICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBASW5qZWN0KE5HX0FTWU5DX1ZBTElEQVRPUlMpIGFzeW5jVmFsaWRhdG9yczogYW55W10pIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuZm9ybSA9XG4gICAgICAgIG5ldyBGb3JtR3JvdXAoe30sIGNvbXBvc2VWYWxpZGF0b3JzKHZhbGlkYXRvcnMpLCBjb21wb3NlQXN5bmNWYWxpZGF0b3JzKGFzeW5jVmFsaWRhdG9ycykpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkgeyB0aGlzLl9zZXRVcGRhdGVTdHJhdGVneSgpOyB9XG5cbiAgZ2V0IGZvcm1EaXJlY3RpdmUoKTogRm9ybSB7IHJldHVybiB0aGlzOyB9XG5cbiAgZ2V0IGNvbnRyb2woKTogRm9ybUdyb3VwIHsgcmV0dXJuIHRoaXMuZm9ybTsgfVxuXG4gIGdldCBwYXRoKCk6IHN0cmluZ1tdIHsgcmV0dXJuIFtdOyB9XG5cbiAgZ2V0IGNvbnRyb2xzKCk6IHtba2V5OiBzdHJpbmddOiBBYnN0cmFjdENvbnRyb2x9IHsgcmV0dXJuIHRoaXMuZm9ybS5jb250cm9sczsgfVxuXG4gIGFkZENvbnRyb2woZGlyOiBOZ01vZGVsKTogdm9pZCB7XG4gICAgcmVzb2x2ZWRQcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5fZmluZENvbnRhaW5lcihkaXIucGF0aCk7XG4gICAgICAoZGlyIGFze2NvbnRyb2w6IEZvcm1Db250cm9sfSkuY29udHJvbCA9XG4gICAgICAgICAgPEZvcm1Db250cm9sPmNvbnRhaW5lci5yZWdpc3RlckNvbnRyb2woZGlyLm5hbWUsIGRpci5jb250cm9sKTtcbiAgICAgIHNldFVwQ29udHJvbChkaXIuY29udHJvbCwgZGlyKTtcbiAgICAgIGRpci5jb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoe2VtaXRFdmVudDogZmFsc2V9KTtcbiAgICAgIHRoaXMuX2RpcmVjdGl2ZXMucHVzaChkaXIpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q29udHJvbChkaXI6IE5nTW9kZWwpOiBGb3JtQ29udHJvbCB7IHJldHVybiA8Rm9ybUNvbnRyb2w+dGhpcy5mb3JtLmdldChkaXIucGF0aCk7IH1cblxuICByZW1vdmVDb250cm9sKGRpcjogTmdNb2RlbCk6IHZvaWQge1xuICAgIHJlc29sdmVkUHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuX2ZpbmRDb250YWluZXIoZGlyLnBhdGgpO1xuICAgICAgaWYgKGNvbnRhaW5lcikge1xuICAgICAgICBjb250YWluZXIucmVtb3ZlQ29udHJvbChkaXIubmFtZSk7XG4gICAgICB9XG4gICAgICByZW1vdmVEaXI8TmdNb2RlbD4odGhpcy5fZGlyZWN0aXZlcywgZGlyKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZEZvcm1Hcm91cChkaXI6IE5nTW9kZWxHcm91cCk6IHZvaWQge1xuICAgIHJlc29sdmVkUHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuX2ZpbmRDb250YWluZXIoZGlyLnBhdGgpO1xuICAgICAgY29uc3QgZ3JvdXAgPSBuZXcgRm9ybUdyb3VwKHt9KTtcbiAgICAgIHNldFVwRm9ybUNvbnRhaW5lcihncm91cCwgZGlyKTtcbiAgICAgIGNvbnRhaW5lci5yZWdpc3RlckNvbnRyb2woZGlyLm5hbWUsIGdyb3VwKTtcbiAgICAgIGdyb3VwLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoe2VtaXRFdmVudDogZmFsc2V9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZUZvcm1Hcm91cChkaXI6IE5nTW9kZWxHcm91cCk6IHZvaWQge1xuICAgIHJlc29sdmVkUHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuX2ZpbmRDb250YWluZXIoZGlyLnBhdGgpO1xuICAgICAgaWYgKGNvbnRhaW5lcikge1xuICAgICAgICBjb250YWluZXIucmVtb3ZlQ29udHJvbChkaXIubmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXRGb3JtR3JvdXAoZGlyOiBOZ01vZGVsR3JvdXApOiBGb3JtR3JvdXAgeyByZXR1cm4gPEZvcm1Hcm91cD50aGlzLmZvcm0uZ2V0KGRpci5wYXRoKTsgfVxuXG4gIHVwZGF0ZU1vZGVsKGRpcjogTmdDb250cm9sLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgcmVzb2x2ZWRQcm9taXNlLnRoZW4oKCkgPT4ge1xuICAgICAgY29uc3QgY3RybCA9IDxGb3JtQ29udHJvbD50aGlzLmZvcm0uZ2V0KGRpci5wYXRoICEpO1xuICAgICAgY3RybC5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRWYWx1ZSh2YWx1ZToge1trZXk6IHN0cmluZ106IGFueX0pOiB2b2lkIHsgdGhpcy5jb250cm9sLnNldFZhbHVlKHZhbHVlKTsgfVxuXG4gIG9uU3VibWl0KCRldmVudDogRXZlbnQpOiBib29sZWFuIHtcbiAgICAodGhpcyBhc3tzdWJtaXR0ZWQ6IGJvb2xlYW59KS5zdWJtaXR0ZWQgPSB0cnVlO1xuICAgIHN5bmNQZW5kaW5nQ29udHJvbHModGhpcy5mb3JtLCB0aGlzLl9kaXJlY3RpdmVzKTtcbiAgICB0aGlzLm5nU3VibWl0LmVtaXQoJGV2ZW50KTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBvblJlc2V0KCk6IHZvaWQgeyB0aGlzLnJlc2V0Rm9ybSgpOyB9XG5cbiAgcmVzZXRGb3JtKHZhbHVlOiBhbnkgPSB1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLmZvcm0ucmVzZXQodmFsdWUpO1xuICAgICh0aGlzIGFze3N1Ym1pdHRlZDogYm9vbGVhbn0pLnN1Ym1pdHRlZCA9IGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0VXBkYXRlU3RyYXRlZ3koKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMudXBkYXRlT24gIT0gbnVsbCkge1xuICAgICAgdGhpcy5mb3JtLl91cGRhdGVPbiA9IHRoaXMub3B0aW9ucy51cGRhdGVPbjtcbiAgICB9XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIF9maW5kQ29udGFpbmVyKHBhdGg6IHN0cmluZ1tdKTogRm9ybUdyb3VwIHtcbiAgICBwYXRoLnBvcCgpO1xuICAgIHJldHVybiBwYXRoLmxlbmd0aCA/IDxGb3JtR3JvdXA+dGhpcy5mb3JtLmdldChwYXRoKSA6IHRoaXMuZm9ybTtcbiAgfVxufVxuIl19