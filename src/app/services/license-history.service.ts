import { Injectable } from '@angular/core';
import { LicenseHistory } from '../models/entity/lisenceHistory';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

/*************************
 * 
 * @Author Tarchoun Abir
 * 
 ************************/

export class LicenseHistoryService {

   //api backend
 private base_url = environment.publicApi+ '/LicenseHistory';
  
 constructor(private http: HttpClient) { }
  
    //http opttion
    httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
  
      })
    }
    //handel api  errors 
    handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        //a client-side or a neetwork error occurend .Handel it accordingly
        console.error('An Error occurend', error.error.message)
  
      }
      else {
        // the backend may returned an successfully response code 
        // the response body may contain clues as to what went wrong 
        console.error(`backend returned code ${error.status}, ` +
          `body was : ${error.error}`
        );
      }
      // return an observabel with a user-facing error message 
      return throwError('something bad happined , please try again later .');
    };
  
  
   
    //get all data 
    getallLicenseHistory(): Observable<LicenseHistory[]> {
      return this.http.get<LicenseHistory[]>(`${this.base_url}` + '/GetAllHistoryLicense').pipe(retry(2), catchError(this.handleError));
    }
  
  
  
   
  
  
}
