import { Controller, Get ,Post,Body} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductDTO } from 'src/dtos/create-product.dto';
import { ProductService } from './product.service';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post("/getAllProducts")
  async createProduct(@Body() productDto: ProductDTO) {    
    return this.productService.createProduct(productDto);
  }
}
