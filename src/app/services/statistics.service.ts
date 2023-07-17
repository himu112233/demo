import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {


    private apiUrl = environment.publicApi + '/Statistics';
  constructor(private http: HttpClient) { }

  getUsersStatistics(): Observable<any> {
    return this.http.get<any>('https://localhost:7203/Statistics/users');
  }

  getModulesStatistics(): Observable<any> {
    return this.http.get<any>('https://localhost:7203/Statistics/modules');
  }

  getProductsStatistics(): Observable<any> {
    return this.http.get<any>('https://localhost:7203/Statistics/products');
  }
  getLicensesStatistics(): Observable<any> {
    return this.http.get<any>('https://localhost:7203/Statistics/licenses');
  }

  getProductProgress(): Observable<any> {
    return this.http.get(`${this.apiUrl}/progress`);
  }
  getProductsPercentage(): Promise<number> {
    return this.http.get<number>(`${this.apiUrl}/productsPercentage`).toPromise();
  }
}
