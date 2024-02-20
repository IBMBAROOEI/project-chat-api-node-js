import { Product } from '../entity/Product';
import { AppDataSource } from '../../data-source';
import { Repository } from 'typeorm';
import { Category } from '../../Category/entity/Category';
import { Tag } from '../../tag/entity/Tag';

const productRepository: Repository<Product> = AppDataSource.getRepository(Product);
const tagRepository: Repository<Tag> = AppDataSource.getRepository(Tag);
const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category);

export class ProductService {




public async delete(id:number):Promise<void>{
  try{


const product=await productRepository.findOne({where:{id:id}});


if(!product){
  throw new Error("not found product")
}
await productRepository.remove(product);
  }catch(error){

    console.log(error)
  }
}



 public async getproduct():Promise<Product[]>{


   const products=await productRepository.find({relations:[
'categories','tags'

   ]})

   return products;
 }


 public async update(
  id: number,
  name: string,
  price: number,
  tagIds: number[],
  categoryIds: number[]
): Promise<any> {
  try {
    const product = await productRepository.findOne({
      where: { id: id }
    });

    if (!product) {
      throw new Error("not found product")
    }

    product.name = name;
    product.price = price;
    product.categories = [];
    product.tags = [];

    for (const categoryId of categoryIds) {
      const category = await categoryRepository.findOne({ where: { id: categoryId } });

      if (category) {
        product.categories.push(category);
      }
    }

    for (const tagId of tagIds) {
      const tag = await tagRepository.findOne({ where: { id: tagId } });

      if (tag) {
        product.tags.push(tag);
      }
    }

    const updateProduct = await productRepository.save(product);
    return updateProduct;
  } catch (error) {
    console.log(error);
  }
}


  public async create(name: string, price: number, tagIds: number[], categoryIds: number[]): Promise<any> {
    try {
      const product = new Product();
      product.name = name;
      product.price = price;
      product.categories = [];

      for (const categoryId of categoryIds) {
        const category = await categoryRepository.findOne({ where: { id: categoryId } });
        if (category) {
          product.categories.push(category);
        }

}

      product.tags = [];
      for (const tagId of tagIds) {
        const tag = await tagRepository.findOne({ where: { id: tagId } });

        if (tag) {
          product.tags.push(tag);
        }
      }

      const savedProduct = await productRepository.save(product);
      
      return savedProduct;
    } catch (error) {
      console.log(error);
    }
  }


  



}