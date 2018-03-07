import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, ResponseContentType } from '@angular/http';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import { resolve } from 'dns';

@Injectable()
export class ApiService {
    private _apiUrl: string;
    get apiUrl() { return this._apiUrl; }
    set apiUrl(url: string) { this._apiUrl = url; }

    constructor(
        private http: Http,
        private router: Router
    ) {
        this.apiUrl = "localhost:3001/api";
    }

    public get(url: string): any {
        return this.http.get(this.apiUrl + url)
                   .map(this.handleResponse)
                   .catch(this.handleError);
    }

    public post(url: string, data): any {
        return this.http.post(this.apiUrl + url, JSON.stringify(data))
                   .map(this.handleResponse)
                   .catch(this.handleError);
    }

    public put(url: string, data): any {
        return this.http.put(this.apiUrl + url, JSON.stringify(data))
                   .map(this.handleResponse)
                   .catch(this.handleError);
    }

    public delete (url: string): any {
        return this.http.delete(this.apiUrl + url)
                   .map(this.handleResponse)
                   .catch(this.handleError);
    }

    private handleResponse(response: Response) {
        if (response.status !== 204) {
            return response.json();
        }
        return {};
    }

    private handleError(error: any): any {
        if (error.status === 401) {
            setTimeout(() => window.location.replace('/login'), 2000);
            return Observable.throw(error);
        }
        if (error && typeof error !== 'undefined' && typeof error._body !== 'undefined') {
            return Observable.throw(error);
        }
    }

}
