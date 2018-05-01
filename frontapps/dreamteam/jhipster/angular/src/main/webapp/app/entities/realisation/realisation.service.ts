import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Realisation } from './realisation.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Realisation>;

@Injectable()
export class RealisationService {

    private resourceUrl =  SERVER_API_URL + 'api/realisations';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/realisations';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(realisation: Realisation): Observable<EntityResponseType> {
        const copy = this.convert(realisation);
        return this.http.post<Realisation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(realisation: Realisation): Observable<EntityResponseType> {
        const copy = this.convert(realisation);
        return this.http.put<Realisation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Realisation>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Realisation[]>> {
        const options = createRequestOption(req);
        return this.http.get<Realisation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Realisation[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Realisation[]>> {
        const options = createRequestOption(req);
        return this.http.get<Realisation[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Realisation[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Realisation = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Realisation[]>): HttpResponse<Realisation[]> {
        const jsonResponse: Realisation[] = res.body;
        const body: Realisation[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Realisation.
     */
    private convertItemFromServer(realisation: Realisation): Realisation {
        const copy: Realisation = Object.assign({}, realisation);
        copy.creationDate = this.dateUtils
            .convertDateTimeFromServer(realisation.creationDate);
        copy.actionDate = this.dateUtils
            .convertDateTimeFromServer(realisation.actionDate);
        return copy;
    }

    /**
     * Convert a Realisation to a JSON which can be sent to the server.
     */
    private convert(realisation: Realisation): Realisation {
        const copy: Realisation = Object.assign({}, realisation);

        copy.creationDate = this.dateUtils.toDate(realisation.creationDate);

        copy.actionDate = this.dateUtils.toDate(realisation.actionDate);
        return copy;
    }
}
