export class CommonResponseDTO<T> {
  success: boolean;
  message: string;
  data: T;
}
