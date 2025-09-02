import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { randomUUID } from 'crypto';

export class GetUserListResponseDTO {
  @ApiProperty({
    type: String,
    example: randomUUID(),
    description: 'The user id',
  })
  user_id: string;

  @ApiProperty({
    type: String,
    example: randomUUID(),
    description: 'The company id',
  })
  company_id: string;

  @ApiProperty({
    type: String,
    example: 'Juli',
    description: 'The user name',
  })
  nama: string;

  @ApiPropertyOptional({
    type: String,
    example: 'Sammny@mail.com',
    description: 'The user email',
    nullable: true,
  })
  email: string | null;

  @ApiPropertyOptional({
    type: String,
    example: '0987654321',
    description: 'The user phone',
    nullable: true,
  })
  telp: string | null;

  @ApiPropertyOptional({
    type: String,
    example: 'PIC',
    description: 'The company code',
    nullable: true,
  })
  company_code: string | null;

  @ApiPropertyOptional({
    type: String,
    example: 'Samudera',
    description: 'The company name',
    nullable: true,
  })
  company_name: string | null;
}

export class RandomUserApiDTO {
  @ApiProperty({ example: 'female', description: 'User gender' })
  gender: string;

  @ApiProperty({
    description: 'User full name structure',
    example: { title: 'Ms', first: 'Emma', last: 'Hakola' },
  })
  name: {
    title: string;
    first: string;
    last: string;
  };

  @ApiProperty({
    description: 'User location details',
    example: {
      street: { number: 9208, name: 'Nordenskiöldinkatu' },
      city: 'Lieksa',
      state: 'Åland',
      country: 'Finland',
      postcode: 12345,
      coordinates: { latitude: '62.6015', longitude: '29.7676' },
      timezone: { offset: '+2:00', description: 'Helsinki' },
    },
  })
  location: {
    street: { number: number; name: string };
    city: string;
    state: string;
    country: string;
    postcode: number | string;
    coordinates: { latitude: string; longitude: string };
    timezone: { offset: string; description: string };
  };

  @ApiProperty({ example: 'emma.hakola@example.com', description: 'User email' })
  email: string;

  @ApiProperty({
    description: 'User login credentials and hashes',
    example: {
      uuid: 'c7160e99-6b5c-474d-b514-6d9c3cf437c4',
      username: 'orangepeacock490',
      password: 'password123',
      salt: 'abcd1234',
      md5: '098f6bcd4621d373cade4e832627b4f6',
      sha1: 'a9993e364706816aba3e25717850c26c9cd0d89d',
      sha256:
        '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
    },
  })
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };

  @ApiProperty({
    description: 'User date of birth info',
    example: { date: '1999-03-15T07:00:00Z', age: 24 },
  })
  dob: { date: string; age: number };

  @ApiProperty({
    description: 'User registration info',
    example: { date: '2015-05-12T07:00:00Z', age: 8 },
  })
  registered: { date: string; age: number };

  @ApiProperty({ example: '08-761-811', description: 'User phone number' })
  phone: string;

  @ApiProperty({ example: '048-075-31-27', description: 'User cell number' })
  cell: string;

  @ApiProperty({
    description: 'User identity information',
    example: { name: 'SSN', value: '123-45-6789' },
  })
  id: { name: string; value: string };

  @ApiProperty({
    description: 'User profile pictures',
    example: {
      large: 'https://randomuser.me/api/portraits/women/86.jpg',
      medium: 'https://randomuser.me/api/portraits/med/women/86.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/women/86.jpg',
    },
  })
  picture: { large: string; medium: string; thumbnail: string };

  @ApiProperty({ example: 'FI', description: 'User nationality code' })
  nat: string;
}

export class RandomUserApiResponseDTO {
  @ApiProperty({
    type: [RandomUserApiDTO],
    description: 'List of random users',
  })
  results: RandomUserApiDTO[];

  @ApiProperty({
    description: 'Additional response info from API',
    example: {
      seed: 'abc123',
      results: 10,
      page: 1,
      version: '1.3',
    },
  })
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

export class RandomUserQueryDTO {
  @ApiPropertyOptional({
    type: Number,
    example: 10,
    description: 'The number of results (default: 10)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  results?: number = 10;

  @ApiPropertyOptional({
    type: Number,
    example: 1,
    description: 'The page number (default: 1)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;
}

export class RandomUserResponseDTO {
  @ApiProperty({
    type: String,
    example: 'Ms, Emma Hakola',
    description: 'The user full name',
  })
  name: string;

  @ApiProperty({
    type: String,
    example: '9208, Nordenskiöldinkatu, Lieksa, Åland, Finland',
    description: 'The user location',
  })
  location: string;

  @ApiProperty({
    type: String,
    example: 'emma.hakola@example.com',
    description: 'The user email',
  })
  email: string;

  @ApiProperty({
    type: Number,
    example: 21,
    description: 'The user age',
  })
  age: number;

  @ApiProperty({
    type: String,
    example: '08-761-811',
    description: 'The user phone number',
  })
  phone: string;

  @ApiProperty({
    type: String,
    example: '048-075-31-27',
    description: 'The user cell number',
  })
  cell: string;

  @ApiProperty({
    type: [String],
    example: [
      'https://randomuser.me/api/portraits/women/86.jpg',
      'https://randomuser.me/api/portraits/med/women/86.jpg',
      'https://randomuser.me/api/portraits/thumb/women/86.jpg',
    ],
    description: 'The user pictures',
  })
  picture: string[];
}
