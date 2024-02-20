import { Request, Response } from 'express';
import { Categoryservice } from '../services/categoryservice';
import { Category} from '../entity/Category';
const categoryservice =new Categoryservice();


//  import {Apiresponse } from '../response/Response'
export class CategoryController {


  
  public async createcat(req:Request,res:Response){

    const input:Partial<Category>=req.body;
    const newtag: Category=await categoryservice.create(input);
    res.json(newtag);
  }


    
  public async showcat(req:Request,res:Response){
    const newtag=await categoryservice.getCategrory();
    res.json(newtag);
  }


  public async deletecat(req:Request,res:Response){

    const tag=parseInt(req.params.id);
    await categoryservice.removecat(tag);
    res.sendStatus(204)
  }
 






  public async updatecat(req:Request,res:Response){

    const tag=parseInt(req.params.id);
     const upadte:Partial<Category>=req.body;
   const updatetag=await categoryservice.update(tag,upadte);
   if(updatetag){
    res.json(updatetag);
   }



  }


  public async showproductbycat(req:Request,res:Response){

    const tag=parseInt(req.params.id);

    const showproduct= await categoryservice.getcategoryproduct(tag)
    return res.json(showproduct);

  }
}