import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/product.schema';
import { ProductDTO } from 'src/dtos/create-product.dto';


@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Products') private readonly productModel: Model<Product>,
  ) {}

  async createProduct(productDto:ProductDTO): Promise<Product> {
    try {
        const newProduct=await this.productModel.create(productDto)
        return newProduct.save()
    } catch (error) {
      throw new HttpException(
        'Please put the required fields correctly',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }
}
