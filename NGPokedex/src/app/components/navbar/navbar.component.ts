import { Component, OnInit } from '@angular/core';
import { UserFormModalComponent } from '../user/user-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'my-navbar',
    template: `
        <div class="navbar">
            <span class="link"> Login </span>
            <span class="link link2" (click)="openUserModal()"> Register </span>
            <i class="fas fa-user-circle"></i>
        </div>
    `,
    styles: [`
        .navbar .link2{
            padding-right: 15px !important;
        }
        .navbar{
            position: fixed;
            top: 0;
            height: 60px;
            background-color: #CD2431;
            right: 0;
            border-bottom-left-radius: 25px;
            border-top-left-radius: 0;
            border-bottom-right-radius: 0;
            z-index: 10;
            color: white;
            text-align: center;
            padding: 0 15px;
        }
        .navbar .link{
            line-height: 60px;
            text-transform: uppercase;
            font-size: 10px;
            vertical-aign: middle;
            padding: 0 10px;
            cursor: pointer;
        }
        .fas{
            vertical-align: middle;
        }
        svg{
            vertical-align: middle;
        }
    `]
})
export class NavbarComponent implements OnInit {
    constructor(
        private modalService: NgbModal
    ) { }

    ngOnInit() {}

    openUserModal() {
        const modalRef = this.modalService.open(UserFormModalComponent);
    }
}
