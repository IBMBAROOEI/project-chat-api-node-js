import { Request, Response } from 'express';
import { Tagservice } from '../services/tagservice';
import { Tag } from '../entity/Tag';
const tagservice =new Tagservice();


//  import {Apiresponse } from '../response/Response'
export class TagController {


  
  public async createtag(req:Request,res:Response){

    const input:Partial<Tag>=req.body;
    const newtag: Tag=await tagservice.create(input);
    res.json(newtag);
  }


    
  public async showtag(req:Request,res:Response){
    const newtag=await tagservice.getTags();
    res.json(newtag);
  }




  public async showproductbytag(req:Request,res:Response){

    const tag=parseInt(req.params.id);

    const showproduct= await tagservice.gettagproduct(tag)
    return res.json(showproduct);

  }

  public async deletetag(req:Request,res:Response){

    const tag=parseInt(req.params.id);
    await tagservice.removetag(tag);
    res.sendStatus(204)
  }
 

  public async updatetag(req:Request,res:Response){

    const tag=parseInt(req.params.id);
     const upadte:Partial<Tag>=req.body;
   const updatetag=await tagservice.update(tag,upadte);
   if(updatetag){
    res.json(updatetag);
   }



  }

}