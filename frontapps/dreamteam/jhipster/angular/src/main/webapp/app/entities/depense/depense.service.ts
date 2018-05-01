import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Depense } from './depense.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Depense>;

@Injectable()
export class DepenseService {

    private resourceUrl =  SERVER_API_URL + 'api/depenses';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/depenses';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(depense: Depense): Observable<EntityResponseType> {
        const copy = this.convert(depense);
        return this.http.post<Depense>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(depense: Depense): Observable<EntityResponseType> {
        const copy = this.convert(depense);
        return this.http.put<Depense>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Depense>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Depense[]>> {
        const options = createRequestOption(req);
        return this.http.get<Depense[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Depense[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Depense[]>> {
        const options = createRequestOption(req);
        return this.http.get<Depense[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Depense[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Depense = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Depense[]>): HttpResponse<Depense[]> {
        const jsonResponse: Depense[] = res.body;
        const body: Depense[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Depense.
     */
    private convertItemFromServer(depense: Depense): Depense {
        const copy: Depense = Object.assign({}, depense);
        copy.creationDate = this.dateUtils
            .convertDateTimeFromServer(depense.creationDate);
        copy.eventDate = this.dateUtils
            .convertDateTimeFromServer(depense.eventDate);
        return copy;
    }

    /**
     * Convert a Depense to a JSON which can be sent to the server.
     */
    private convert(depense: Depense): Depense {
        const copy: Depense = Object.assign({}, depense);

        copy.creationDate = this.dateUtils.toDate(depense.creationDate);

        copy.eventDate = this.dateUtils.toDate(depense.eventDate);
        return copy;
    }
}
