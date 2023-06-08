import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Mongoose } from 'mongoose';


export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({type:String,required:true})
  name: string;

  @Prop({type:String,required:true})
  description: string;

  @Prop({type:String,required:true})
  category: string;

  @Prop({type:String,required:true})
  image: string|ImageData;

  @Prop({type:Number,required:true})
  price: number;

  @Prop({type:Number})
  quantity: number;

  @Prop({type:Number})
  rates: number;

}

export const ProductSchema = SchemaFactory.createForClass(Product);
