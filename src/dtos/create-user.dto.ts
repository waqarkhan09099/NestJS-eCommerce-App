import {
  ApiProperty,
  ApiPropertyOptions,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'User Name is Required',
  })
  userName: string;

  @ApiProperty({
    type: String,
    description: 'User Email is Required',
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'Password is mandatory to fill',
  })
  password: string;

  @ApiProperty({
    type: String,
    description: 'Please enter your address',
  })
  address: string;

  @ApiProperty({
    type: String,
    description: 'Please Select any one',
  })
  gender: string | boolean;

  @ApiPropertyOptional({
    description: 'Role is optional',
  })
  roles: string[];
}
