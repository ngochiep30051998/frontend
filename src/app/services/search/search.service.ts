import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    public searchParam: any;
    public searchSubject$ = new BehaviorSubject({});
    constructor() { }
}
