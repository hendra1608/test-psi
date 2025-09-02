import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class OAuthUserDto {
  @ApiProperty({
    description: 'Unique identifier of the user from the OAuth provider',
    example: '1234567890',
  })
  id: string;

  @ApiProperty({
    description: 'The username of the OAuth user',
    example: 'john_doe',
  })
  username: string;
}

export class OAuthResponseDto {
  @ApiProperty({
    description: 'Response message from OAuth authentication',
    example: 'Login successful',
  })
  message: string;

  @ApiProperty({
    description: 'User information retrieved from the OAuth provider',
    type: () => OAuthUserDto,
  })
  user: OAuthUserDto;
}

export class UserDto {
  @ApiProperty({
    description: 'Unique identifier of the user',
    example: 'uuid-123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
  })
  name: string;
}

export class LoginResponseDto {
  @ApiProperty({
    description: 'Response message after login attempt',
    example: 'Login successful',
  })
  message: string;

  @ApiProperty({
    description: 'User data after successful login',
    type: () => UserDto,
  })
  user: UserDto;
}
