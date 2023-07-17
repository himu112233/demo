import { Injectable } from '@angular/core';
import { Access } from '../models/entity/access';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { Product } from '../models/entity/product';
import { AccessDTO } from '../models/DTO/AccessDTO';
import { ModuleDTO } from '../models/DTO/ModuleDTO';
import { UpdateAccessRequest } from '../models/Request/UpdateAccessRequest';

@Injectable({
  providedIn: 'root'
})



export class AccessService {


  //api backend
  private base_url = environment.publicApi + '/Access';

  constructor(private http: HttpClient) { }

  /**
   * insert a new Access 
   * @param item 
   * @returns new Access
   */

  createAccess(item: any): Observable<Access> {
 return this.http.post<Access>(`${this.base_url}` + '/addNewAccess', item);
  }

  /**
   * 
   * @returns all access
   */

  getallAccess(): Observable<AccessDTO[]> {
    return this.http.get<AccessDTO[]>(`${this.base_url}` + '/GetAllAccess')
  }

  /**
   * 
   * @param id 
   * @returns access by id 
   */

  getByidAccess(id: number): Observable<Access> {
    return this.http.get<Access>(`${this.base_url}` + '/GetAccessByOne/' + id)
  }



  /**************************************
   * 
   * @returns products - module childrens
   */

  getModuleProducts(): Observable<AccessDTO[]> {
    return this.http.get<AccessDTO[]>(`${this.base_url}` + '/products' )
  }

  /**************************
   * 
   * @param item 
   * @returns updated access
   */

  updateAccess(item: UpdateAccessRequest) {
    return this.http.put<UpdateAccessRequest>(`${this.base_url}` + '/UpdateAccess' + '/' + item.accessId, item)
  }


  /*********************
   * to deleted access
   * @param accessId 
   * @returns 
   */

  deleteAccess(accessId: number) {
    return this.http.delete<Access>(`${this.base_url}` + '/DeleteAccess/' + accessId)
  }

  /**
   * for asign a Access an product or multiple products
   * @param productId 
   * @param AccessIds 
   * @returns 
   */

  assignAccessToAnProduct(productId: any, AccessIds: any): any {
    return this.http.get<any>(environment.privateApi + '/product/assign-AccessIds/' + productId + "/" + AccessIds);
  }


  /**
   * 
   * @returns all Products 
   */

  getallProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.publicApi + '/Products' + '/GetAllProducts');
  }


  /**
   * 
   * @returns  all modules
   */

  getallModule(): Observable<ModuleDTO[]> {
    return this.http.get<ModuleDTO[]>(environment.publicApi + '/Module' + '/GetAllModules')
  }


  //get value for update 
  populateForm(access: any) {
    this.form.patchValue(_.omit(access));
  }



  //validation form
  form: FormGroup = new FormGroup({
    accessId: new FormControl(null),
    accessName: new FormControl('', [Validators.required]),
   // createdBy:  new FormControl('', [Validators.required]),
    moduleName: new FormControl('', [Validators.required]),
    productId: new FormControl('', [Validators.required]),
    createdDate: new FormControl(''),
    //moduleNames: new FormControl(''),
    productName:new FormControl(''),
    lastModificatedDate: new FormControl('')
  });

  // inialisation form
  initializeFormGroup() {
    this.form.setValue({
      accessId: null,
      accessName: '',
      moduleName: '',
      //createdBy: '',
      productName:'',
      lastModificatedDate: new Date(),
      createdDate: ''
    });
  }

}
