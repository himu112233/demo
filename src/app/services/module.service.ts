import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Module } from '../models/entity/module';
import { Product } from '../models/entity/product';
import {ModuleDTO } from '../models/DTO/ModuleDTO';
import { UpdateModuleRequest } from '../models/Request/UpdateModuleRequest';
//import { url } from 'inspector';

/************************
 * 
 * @Author Tarchoun Abir
 * 
 ************************/

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  //api backend
  private base_url = environment.publicApi + '/Module';


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




  /**
   * add new module
   * @param item 
   * @returns 
   */
  createModule(item: any): Observable<ModuleDTO> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post<ModuleDTO>(`${this.base_url}` + '/addModule', item,httpOptions);
  }

  /**
   * 
   * @returns  all modules 
   */
  getallModule(): Observable<ModuleDTO[]> {
    return this.http.get<ModuleDTO[]>(`${this.base_url}` + '/GetProductNames').pipe(retry(2), catchError(this.handleError));
  }
  
  /**
   * get module by id 
   * @param id 
   * @returns 
   */

  getByidModule(id: number): Observable<Module> {
    return this.http.get<Module>(`${this.base_url}` + '/GetModuleByOneModule/' + id).pipe(retry(2), catchError(this.handleError));
  }

  getAllModulesByProductId(id: number): Observable<ModuleDTO[]> {
    return this.http.get<ModuleDTO[]>(`${this.base_url}` + '/GetModulesByProductId/' + id).pipe(retry(2), catchError(this.handleError));
  }

  GetModulesByAccessId(id: number): Observable<ModuleDTO[]> {
    return this.http.get<ModuleDTO[]>(`${this.base_url}` + '/GetModulesByAccessId/' + id).pipe(retry(2), catchError(this.handleError));
  }
  
  GetModulesbyname(searchTerm :string): Observable<any> {

    const params=new HttpParams()
    .set("searchTerm", searchTerm);

    return this.http.get<any>(this.base_url, {params}).pipe(retry(2), catchError(this.handleError));
  }

  /*************************
   * get module by product
   * @param productName
   * @returns 
   */
  
    getModulesByProduct(productName: string) {
    return this.http.get(this.base_url + `/GetModuleByProduct?productName=${productName}`);
  }

  

  
  /***********************
   * get module by Name
   * @param moduleName
   * @returns 
   */
  
  getModulesByName(moduleName: string): Observable<ModuleDTO[]> {
    const url = this.base_url + `/GetModuleByName?moduleName=${moduleName}`
    return this.http.get<ModuleDTO[]>(url);
  }


  /**
   * to update a module
   * @param item 
   * @returns 
   */
  updateModule(item: UpdateModuleRequest) {
    return this.http.put<UpdateModuleRequest>(`${this.base_url}` + '/UpdateModule' + '/' + item.moduleId, item, this.httpOptions).pipe(retry(2), catchError(this.handleError));
  }


  /**
   * to delete a module
   * @param moduleId 
   * @returns 
   */
  deleteModule(moduleId: number) {
    return this.http.delete<Module>(`${this.base_url}` + '/DeleteModule/' + moduleId, this.httpOptions).pipe(retry(2), catchError(this.handleError));
  }



 

  /**
   * get value for update 
   * @param Module 
   */
  populateForm(Module: any) {
    this.form.patchValue(_.omit(Module));
  }



  // get all products 

  getallProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.publicApi + '/Products' + '/GetAllProducts');
  }



  //validation form
  form: FormGroup = new FormGroup({
    moduleId: new FormControl(null),
    description: new FormControl(),
    moduleName: new FormControl('', [Validators.required]),
    modulePackage: new FormControl(),
    createdDate: new FormControl(''),
    lastModificatedDate: new FormControl(''),
    moduleStatus: new FormControl(false),
    productId: new FormControl(''),
   // accessId: new FormControl(''),
  });

  // inialisation form
  initializeFormGroup() {
    this.form.setValue({
      moduleId: null,
      moduleName: '',
      description: '',
      modulePackage: '',
      moduleStatus: false,
      lastModificatedDate: new Date(),
      createdDate: '',
      productId: '' ,
     //accessId  : ''
    });
  }

}
