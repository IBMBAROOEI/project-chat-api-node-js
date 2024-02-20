import { Tag } from '../entity/Tag';
import { FindOneOptions } from 'typeorm';
import{AppDataSource} from  '../../data-source';
import { Repository } from 'typeorm';
import { Product } from '../../product/entity/Product';
const tagRepository :Repository<Tag>= AppDataSource.getRepository(Tag);

export  class Tagservice{

    


public async create(input:Partial<Tag>):Promise<any>{
 try{

  
     const tag=tagRepository.create({...input});
    
     await tagRepository.save(tag);

     return tag;
    }catch(error){
    console.log(error)
 }
}



 async getTags():Promise<Tag[]|undefined>{


    try{

        const tag=tagRepository.find();
        return tag;

    }catch(error){
        console.log(error)   
    
    }
}


async removetag(tagId:number):Promise<void>{


    try{
        const tag=await tagRepository.findOne({where:{id:tagId}});
        if(tag){
        await tagRepository.remove(tag);
        }
    }catch(error){
        console.log(error)   
    
    }
}



public async update(tagid:number,update:Partial<Tag>):Promise<Tag|undefined>

    {

        try{

            const tag=await tagRepository.findOne({where:{id:tagid}});
            if(tag){
                const updatetag={...tag,...update};
                await tagRepository.save(updatetag);
                return updatetag;
            }

        }catch(error){
            console.log(error)        }
    }




    public async gettagproduct(tagId:number):Promise<Product[]|undefined>{

        try{
        const tagid=await tagRepository.findOne({where:{id:tagId},relations:['products']});
        if(! tagid){
            throw new Error("not found tag")
        }

        return tagid.products;
    }
        catch(error){
            console.log(error)
        }
           
    }
    


}