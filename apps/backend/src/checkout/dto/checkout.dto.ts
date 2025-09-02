import { ApiProperty } from '@nestjs/swagger';

export class CheckoutRequestDto {
  @ApiProperty({ example: 5000000 })
  price: number;

  @ApiProperty({ example: true })
  voucherUsed: boolean;
}

export class CheckoutResponseDto {
  @ApiProperty()
  originalPrice: number;

  @ApiProperty()
  finalPrice: number;

  @ApiProperty()
  discount: number;

  @ApiProperty()
  points: number;
}
