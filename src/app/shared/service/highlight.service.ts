import { filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ALUGAVEL_STATUS } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class HighlightService {

  public searched = [];
  public hasNext = false;
  public hasPrevious = false;

  private currentPage = 1;
  private currentPageSize = 10;

  constructor(private http: HttpClient) {

  }

  public getSome(quantity: number, type?: number) {
    let filters: any = {
      limit: quantity,
      status: ALUGAVEL_STATUS.APPROVED.value
    }

    if (type) filters.tipo_id = type;

    const params = new HttpParams()
      .set('page', '1')
      .set('limit', quantity.toString())
      .set('filters', JSON.stringify(filters));
    return this.http.get<any>(`${environment.apiUrl}/alugaveis`, { params });
  }

  public search(
    page: number,
    limit: number,
    tipo_id?: number,
    bairro?: string,
    minValue?: number,
    maxValue?: number,
    minArea?: number,
    maxArea?: number
  ) {
    let filters: any = {
      status: ALUGAVEL_STATUS.APPROVED.value
    }

    if (bairro) filters.bairro = bairro;
    if (tipo_id) filters.tipo_id = tipo_id;
    if (minValue) filters.minValue = minValue;
    if (maxValue) filters.maxValue = maxValue;
    if (maxArea) filters.maxArea = maxArea;
    if (minArea) filters.minArea = minArea;

    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('filters', JSON.stringify(filters));
    return this.http.get<any>(`${environment.apiUrl}/alugaveis`, { params });
  }

  public fetch(filters: any = {}) {
    this.search(this.currentPage, this.currentPageSize,
      filters.tipo_id,
      filters.bairro,
      filters.minValue,
      filters.maxValue,
      filters.minArea,
      filters.maxArea
    ).subscribe(response => {
      this.searched = response.results;
      this.hasNext = response.next? true : false;
      this.hasPrevious = response.previous? true : false;
    }, (error) => {
      console.log('Error: ', error);
    });
  }
}
