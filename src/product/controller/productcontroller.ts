import { Request, Response } from 'express';
import { ProductService } from '../services/productservice';
import { Product } from '../entity/Product';
import { Tag } from '../../tag/entity/Tag';
import { error } from 'console';

 const productservice = new ProductService();


export class Productcontroller {


public async getproduct(req:Request ,res:Response):Promise<void>{

const product= await productservice.getproduct();
 
res.json(product)
}

 
public async creatproduct(req:Request ,res:Response):Promise<void>{

try{

const{name,price,tagIds,categoryIds}=req.body;

const product=await productservice.create(name,price,tagIds,categoryIds);
res.json(product)
}
catch(error){

  console.log(error)
}


}

 public async deleteproduct(req:Request,res:Response):Promise<void>{
   try{
    const id = parseInt(req.params.id);
    
    await productservice.delete(id);
    res.sendStatus(204);
   }catch(erorr){
    console.log(error)
   }
 }
 



public async updateproduct(req: Request, res: Response): Promise<void> {
  try {
    const id = parseInt(req.params.id);
    const { name, price, tagIds, categoryIds } = req.body;
    const updateproduct = await productservice.update(id, name, price, tagIds, categoryIds);
    res.json(updateproduct);
  } catch (error) {
    console.log(error);
  }
}
}