import {
  ApiProperty,
  ApiPropertyOptions,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class ProductDTO {
  @ApiProperty({
    type: String,
    description: 'Product Name is Required',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Product description is Required',
  })
  description: string;

  @ApiProperty({
    type: String,
    description: 'Category is mandatory to mention',
  })
  category: string;

  @ApiProperty({
    type: String,
    description: 'Product Image is mandatory to mention',
  })
  image: string;

  @ApiProperty({
    type: Number,
    description: 'Product price is required',
  })
  price: number;

  @ApiProperty({
    type: Number,
    description: 'Qunatity is default as 1',
  })
  quantity: Number;

  @ApiPropertyOptional({
    description: 'Role is optional',
  })
  rates: number;
}
