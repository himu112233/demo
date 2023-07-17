import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/entity/product';
import { environment } from 'src/environments/environment';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Module } from 'src/app/models/entity/module';
import { AccessService } from 'src/app/services/access.service';
import { AccessDTO } from 'src/app/models/DTO/AccessDTO';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css'],
  animations: [
    trigger('activeProduct', [
      state('true', style({
        position: 'relative',
        overflow: 'hidden'
      })),
      state('false', style({
        position: 'relative'
      })),
      transition('false => true', [
        animate('0.5s ease-in-out', style({
          transform: 'translateY(0%)'
        }))
      ]),
      transition('true => false', [
        animate('0.5s ease-in-out', style({
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
})
export class ListProductComponent implements OnInit {
  listPrducts: Product[]=[];
  filteredProducts: Product[] =[];
  modules: Module[] =[];
  filteredAccess: AccessDTO[] =[];
  selectedProductAcces : AccessDTO[]= []
  UserProduct: any
  AccessProduct !: AccessDTO[];
  productStatus = 'All Products';
  PathImage = environment.logoPath ;
  showNoModulesMessage!: boolean;
  selectedProductModules: Module[] = [];
  products: Product[] = [];
  accesss: AccessDTO[] = [];
  selectedProduct !: Product ;
  selectedAccess !: AccessDTO;
  constructor(private productService: ProductService, private accessService : AccessService, private dialog: MatDialog,private _Snackbar: MatSnackBar, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getModuleProducts()
  }

// filter module by product
filterAccessModulesProduct(product: Product): void {
  this.selectedProduct = product;
  if (product) {
    this.accessService.getModuleProducts().subscribe(res => {
      // Filter the modules based on the selected product
      this.accesss = Array.isArray(res) ? res.filter(access => access.productName == product.productName).map(access => {
        access.moduleName = access.moduleName;
        return access;
      }) : [];
    }

    )}
}

 
  // get all products 

  getProducts() {
    this.productService.getallProducts().subscribe((res: any) => {
      console.log('result of the product ====================>', res)
    
      this.listPrducts = res;
      this.filteredProducts = this.listPrducts;
    },
      (err: any) => { console.log('result of the product ====================>', err) })
  }

 // get products - module childrens 

 getModuleProducts(){
  this.accessService.getModuleProducts().subscribe((res: AccessDTO[]) => {
    this.AccessProduct = res;
  });
}
    
 

  //search by products status 
  filterByStatus(status: boolean) {
    this.filteredProducts = this.listPrducts.filter(product => product.productStatus === status);
  }



}