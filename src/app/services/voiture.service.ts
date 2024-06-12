import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {
  private limit_results :string = `100`;
  private apiUrl = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/vehicules-commercialises/records?'+this.limit_results;

  constructor(private http: HttpClient) {}

  searchVoitures(query: string): Observable<any> {
    const url = `${this.apiUrl}&q=${query}`;
    return this.http.get<any>(url);
  }
}