import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

// Models
import { User } from '../models/user';

// Services
import { LocalStorageService } from 'angular-2-local-storage';
import { ApiService } from './api.service';

// 3rd tiers
import { Observable, Subscription } from 'rxjs/Rx';

@Injectable()
export class AuthService {

    constructor(
        private localStorageService: LocalStorageService,
        private apiService: ApiService
    ) { }

    register(): Observable<User[]> {
        return this.apiService.get('/auth/register');
    }

    signin(): Observable<User[]> {
        return this.apiService.get('/auth/sign_in');
    }
}
