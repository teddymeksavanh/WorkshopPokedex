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
export class UserService {

    constructor(
        private localStorageService: LocalStorageService,
        private apiService: ApiService
    ) { }

    fetchAll(): Observable<User[]> {
        return this.apiService.get('/users');
    }

    fetchOne(id: number): Observable<User> {
        return this.apiService.get(`/users/${id}`);
    }

    create(user: User): Observable<User> {
        return this.apiService.post('/users', user);
    }

    update(user: User): Observable<User> {
        return this.apiService.put(`/users/${user.id}`, user);
    }

    delete(user: User): any {
        return this.apiService.delete(`/users/${user.id}`);
    }
}
