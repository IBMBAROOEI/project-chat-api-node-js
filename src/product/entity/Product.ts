import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm"
import { Category } from "../../Category/entity/Category";
import { Tag } from "../../tag/entity/Tag";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @Column()
    price!: number

   @ManyToMany(() => Category,category=>category.products
   ,{cascade:true})
   @JoinTable()
    categories!: Category[];
 
 
   @ManyToMany(() => Tag,tag=>tag.products
   ,{cascade:true})
   @JoinTable()
    tags!: Tag[];
 

}