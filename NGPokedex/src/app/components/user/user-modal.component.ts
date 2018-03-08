import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { User } from '../../models/user';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserFormComponent } from './user-form.component';

@Component({
  selector: 'my-user-form-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title text-left" [innerHtml]="title"></h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <my-user-form-light
            [user]="user"
            (onChangeUser)="handleOnChangeUser($event)"
        ></my-user-form-light>
    </div>
    <div class="modal-footer justify-content-between">
        <div class="">
            <button type="button" class="btn btn-default btn-cons" (click)="activeModal.dismiss()" >Abort</button>
        </div>
        <div class="">
            <button type="button" class="btn btn-success w-100" (click)="saveUser()">Validate</button>
        </div>
    </div>
  `,
  styles: [`
      .btn-success {
          min-width: 120px;
      }
  `]
})
export class UserFormModalComponent {
    @Input() title;
    @Input() user: User;
    @Output() onChangeUser = new EventEmitter();
    @ViewChild(UserFormComponent) userFormComponent: UserFormComponent;

    constructor(public activeModal: NgbActiveModal) {}

    saveUser() {
        if(this.userFormComponent.validate()) {
            this.onChangeUser.emit(this.user);
        }
    }

    closeModal() {
        this.activeModal.dismiss();
    }

    handleOnChangeUser($event) {
        this.user = $event;
    }
}
