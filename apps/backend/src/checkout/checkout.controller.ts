import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CheckoutService } from './checkout.service';
import { CheckoutRequestDto, CheckoutResponseDto } from './dto/checkout.dto';
import { CommonResponseDTO } from 'src/common/common.dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private service: CheckoutService) {}

  @ApiResponse({
    status: 200,
    description: 'Checkout success',
    type: CheckoutResponseDto,
  })
  @Post('/checkout')
  checkout(
    @Body() payload: CheckoutRequestDto,
  ): CommonResponseDTO<CheckoutResponseDto> {
    const data = this.service.checkout(payload);
    return {
      success: true,
      message: 'Checkout success',
      data,
    };
  }
}
