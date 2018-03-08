import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFormComponent } from './user-form.component';

@Component({
  selector: 'my-user-form-modal',
  template: `
    <!--<div class="modal-header">
      <h4 class="modal-title text-left" [innerHtml]="title"></h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <my-user-form
            [user]="user"
            (onChangeUser)="handleOnChangeUser($event)"
        ></my-user-form>
        <br/>
    </div>
    <div class="modal-footer justify-content-between">
        <div class="">
            <button type="button" class="btn btn-default btn-cons" (click)="activeModal.dismiss()" >Abort</button>
        </div>
        <div class="">
            <button type="button" class="btn btn-success w-100" (click)="saveUser()">Validate</button>
        </div>
    </div>-->

    <div class="modal-header">
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <my-user-form
            [user]="user"
            (onChangeUser)="handleOnChangeUser($event)"
        ></my-user-form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-success" (click)="submit()">Validate</button>
      <button type="button" class="btn btn-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `,
  styles: [`
      .btn-success {
          min-width: 120px;
      }
      .modal-body {
          padding: 50px;
      }
  `]
})
export class UserFormModalComponent {
    @Input() type: string;
    @Output() onChangeUser = new EventEmitter();
    @ViewChild(UserFormComponent) userFormComponent: UserFormComponent;

    constructor(
        public activeModal: NgbActiveModal,
        private authService: AuthService
    ) {}

    submit() {
        if(this.userFormComponent.validate()) {
            if(this.type === 'register') {
                this.authService
                    .register(this.userFormComponent.userForm.value)
                    .subscribe(user => {
                        console.log('user saved');
                        console.log('user', user);
                    });
            } else {
                this.authService
                    .signin(this.userFormComponent.userForm.value)
                    .subscribe(user => {
                        console.log('user logged');
                        console.log('user', user);
                    });
            }
        } else {
            console.log('userForm has errors');
        }
    }

    closeModal() {
        this.activeModal.dismiss();
    }
}
