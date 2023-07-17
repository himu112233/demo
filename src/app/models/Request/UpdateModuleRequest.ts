export class UpdateModuleRequest{
    moduleId !: number;
    moduleName !: string;
    description !:string;
    modulePackage !: string;
    moduleStatut!:string;
    createdDate!:Date ;
    lastModificatedDate!:Date;
    productNames  !: [] ;
}