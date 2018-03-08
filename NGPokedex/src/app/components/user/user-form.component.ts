import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'my-user-form',
    template: `
        <form [formGroup]="userForm">
            <div class="row">
                <div class="col-6 pl-0 form-group">
                    <label> Name </label>
                    <input formControlName="name" class="w-100 form-control"/>
                </div>
                <div class="col-6 pl-0 form-group">
                    <label> Email </label>
                    <input formControlName="email" class="w-100 form-control"/>
                    <div class="error mt-2" *ngIf="formErrors['email']">{{ formErrors['email'] }}</div>
                </div>
                <div class="col-6 pl-0 form-group">
                    <label> Password </label>
                    <input formControlName="password" class="w-100 form-control"/>
                    <div class="error mt-2" *ngIf="formErrors['password']">{{ formErrors['password'] }}</div>
                </div>
            </div>
        </form>
    `,
    styles: [`

    `]
})
export class UserFormComponent implements OnInit {
    @Input() user: User;
    @Input() askForValidation: boolean = false;
    @Output() onChangeUser = new EventEmitter;

    @Input('group')
    public userForm: FormGroup;

    formErrors = {
        'email': '',
        'password': ''
    };
    validationMessages = {
        'email': {'required': 'The email is required'},
        'password': {'required': 'The password is required'}
    };

    constructor(
        private fb: FormBuilder,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.initForm();
        // if (!this.userForm) {
        //     this.initForm(this.user)
        //         .valueChanges
        //         .subscribe(changes => this.onChangeUser.emit(this.userForm.value));
        // }
    }

    initForm(user?: User) {
        this.userForm = this.fb.group({
            name: [user && user.name || null, Validators.required],
            email: [user && user.email || null, Validators.required],
            password: [user && user.password || null, Validators.required]
        });
        return this.userForm;
    }

    validate() {
        const form = this.userForm;
        let hasError = 0;
        if (this.formErrors) {
            for (const field in this.formErrors) {
                if (this.formErrors.hasOwnProperty(field)) {
                    const control = form.get(field);
                    this.formErrors[field] = '';
                    if (control && !control.valid) {
                        const messages = this.validationMessages[field];
                        for (const key in control.errors) {
                            if (control.errors.hasOwnProperty(key)) {
                                this.formErrors[field] += messages[key] + ' ';
                                hasError += 1;
                            }
                        }
                    }
                }
            }
        }
        if (hasError > 0) {
            return false;
        } else {
            return true;
        }
    }

}
