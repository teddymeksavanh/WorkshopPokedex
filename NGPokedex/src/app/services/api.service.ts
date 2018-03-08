import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, ResponseContentType } from '@angular/http';
import { Router } from '@angular/router';

import { HeadersService } from './headers.service';

import { Observable, Subscription } from 'rxjs';
import { resolve } from 'dns';

@Injectable()
export class ApiService {
    private _apiUrl: string;
    get apiUrl() { return this._apiUrl; }
    set apiUrl(url: string) { this._apiUrl = url; }

    constructor(
        private http: Http,
        private headersService: HeadersService,
        private router: Router
    ) {
        this.apiUrl = 'http://localhost:3001/api';
    }

    /*
    * Get method for the API
    */
    public get(url: string): any {
        return this.http.get(this.apiUrl + url, this.headersService.tokened())
                   .map(this.handleResponse)
                   .catch(this.handleError);
    }

    /*
    * Head method for the API
    */
    public head(url: string): any {
        this.headersService.append('Access-Control-Expose-Headers', 'X-Total-Count');
        return this.http.head(this.apiUrl + url, this.headersService.tokened())
                   .map(re => re.headers)
                   .catch(this.handleError);
    }

    /*
    * Post method for the API
    */
    public post(url: string, data): any {
        return this.http.post(this.apiUrl + url, JSON.stringify(data), this.headersService.tokened())
                   .map(this.handleResponse)
                   .catch(this.handleError);
    }

    /*
    * Put method for the API
    */
    public put(url: string, data): any {
        return this.http.put(this.apiUrl + url, JSON.stringify(data), this.headersService.tokened())
                   .map(this.handleResponse)
                   .catch(this.handleError);
    }

    /*
    * Delete method for the API
    */
    public delete (url: string): any {
        return this.http.delete(this.apiUrl + url, this.headersService.tokened())
                   .map(this.handleResponse)
                   .catch(this.handleError);
    }

    /*
    * Options method for the API
    */
    public options (url: string): any {
        return this.http.options(this.apiUrl + url, this.headersService.tokened())
                   .map(this.handleResponse)
                   .catch(this.handleError);
    }

    /*
    * Handle the Response
    */
    private handleResponse(response: Response) {
        if (response.status !== 204) {
            // response.headers.get('X-Total-Count');
            return response.json();
        }
        return {};
    }

    /*
    * Broadcast an error message
    */
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
