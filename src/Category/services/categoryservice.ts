import {Category}from '../entity/Category';

import{AppDataSource} from  '../../data-source';
import { Repository } from 'typeorm';
import { Product } from '../../product/entity/Product';
const catRepository :Repository<Category>= AppDataSource.getRepository(Category);

export  class Categoryservice{

    


public async create(input:Partial<Category>):Promise<any>{
 try{

  
     const Cate=catRepository.create({...input});
    
     await catRepository.save(Cate);

     return Cate;
    }catch(error){
    console.log(error)
 }
}



 async getCategrory():Promise<Category[]|undefined>{


    try{
    const Cate=catRepository.find();
     return Cate;
    }catch(error){
        console.log(error)   
    
    }
}


async removecat(catId:number):Promise<void>{


    try{
        const Cate=await catRepository.findOne({where:{id:catId}});
        if(Cate){
        await catRepository.remove(Cate);
        }
    }catch(error){
        console.log(error)   
    
    }
}



public async update(catid:number,update:Partial<Category>):Promise<Category|undefined>

    {

        try{

            const cate=await catRepository.findOne({where:{id:catid}});
            if(cate){
                const updatecate={...cate,...update};
                await catRepository.save(updatecate);
                return updatecate;
            }

        }catch(error){
            console.log(error)        }
    }




    public async getcategoryproduct(catId:number):Promise<Product[]>{

        const categoryid=await catRepository.findOne({where:{id:catId},relations:['products.tags']});
        if(! categoryid){
            throw new Error("not found category")
        }

        return categoryid.products;
           
    }
    

    

}