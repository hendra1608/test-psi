import { Injectable } from '@nestjs/common';
import { CheckoutRequestDto, CheckoutResponseDto } from './dto/checkout.dto';

@Injectable()
export class CheckoutService {
  checkout(payload: CheckoutRequestDto): CheckoutResponseDto {
    const discount = payload.voucherUsed ? payload.price * 0.5 : 0;
    const finalPrice = payload.price - discount;
    const points = discount * 0.2;
    return {
      originalPrice: payload.price,
      discount,
      finalPrice,
      points,
    };
  }
}
