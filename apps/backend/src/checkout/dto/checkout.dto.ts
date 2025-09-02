import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';
import { Transform, Type } from 'class-transformer';


export class CheckoutRequestDto {
 @ApiProperty({
    type: Number,
    required: true,
    example: 500000,
    description: 'The price of the product',
  })
  @IsNumber()
  @Type(() => Number)
  price: number;

  @ApiProperty({
    type: Boolean,
    required: true,
    example: true,
    description: 'Is user using discount coupon',
  })
  @IsBoolean()
  @Transform(({ value }) => {
  if (typeof value === 'string') {
    return ['true', '1', 'yes'].includes(value.toLowerCase());
  }
  return Boolean(value);
})
  voucherUsed: boolean;
}

export class CheckoutResponseDto {
  @ApiProperty(
{type:Number, example:5000000, description:"original price before discount"}  )
  originalPrice: number;
  

  @ApiProperty(
{type:Number, example:2500000, description:"final price after discount"}
  )
  finalPrice: number;

  @ApiProperty(
{type:Number, example:2500000, description:"total discount amount"}
  )
  discount: number;

  @ApiProperty(
{type:Number, example:50000, description:"points used for discount"}
  )
  points: number;
}
