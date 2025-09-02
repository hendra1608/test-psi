import { ApiProperty } from '@nestjs/swagger';

export class OAuthUserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;
}

export class OAuthResponseDto {
  @ApiProperty()
  message: string;

  @ApiProperty({ type: () => OAuthUserDto })
  user: OAuthUserDto;
}

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;
}

export class LoginResponseDto {
  @ApiProperty()
  message: string;

  @ApiProperty({ type: () => UserDto })
  user: UserDto;
}
