import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService {
    private base_url = environment.publicApi + '/Log';

  constructor(private http: HttpClient) { }

  getLogs() {
    return this.http.get<any[]>(`${this.base_url}/getlogs`);
  }
}
