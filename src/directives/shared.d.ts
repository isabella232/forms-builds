/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FormArray, FormControl, FormGroup } from '../model';
import { AbstractFormGroupDirective } from './abstract_form_group_directive';
import { ControlContainer } from './control_container';
import { ControlValueAccessor } from './control_value_accessor';
import { NgControl } from './ng_control';
import { FormArrayName } from './reactive_directives/form_group_name';
export declare function controlPath(name: string | null, parent: ControlContainer): string[];
export declare function setUpControl(control: FormControl, dir: NgControl): void;
export declare function cleanUpControl(control: FormControl, dir: NgControl): void;
export declare function setUpFormContainer(control: FormGroup | FormArray, dir: AbstractFormGroupDirective | FormArrayName): void;
export declare function isPropertyUpdated(changes: {
    [key: string]: any;
}, viewModel: any): boolean;
export declare function isBuiltInAccessor(valueAccessor: ControlValueAccessor): boolean;
export declare function syncPendingControls(form: FormGroup, directives: NgControl[]): void;
export declare function selectValueAccessor(dir: NgControl, valueAccessors: ControlValueAccessor[]): ControlValueAccessor | null;
export declare function removeDir<T>(list: T[], el: T): void;
export declare function _ngModelWarning(name: string, type: {
    _ngModelWarningSentOnce: boolean;
}, instance: {
    _ngModelWarningSent: boolean;
}, warningConfig: string | null): void;
