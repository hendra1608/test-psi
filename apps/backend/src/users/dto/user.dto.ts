import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty({
    type: String,
    example: 'Sammny@mail.com',
    description: 'The user email',
    nullable: true,
  })
  email: string | null;

  @ApiProperty({
    type: String,
    example: '0987654321',
    description: 'The user phone',
    nullable: true,
  })
  telp: string | null;

  @ApiProperty({
    type: String,
    example: 'PIC',
    description: 'The company code',
    nullable: true,
  })
  company_code: string | null;

  @ApiProperty({
    type: String,
    example: 'Samudera',
    description: 'The company name',
    nullable: true,
  })
  company_name: string | null;
}

export class RandomUserApiDTO {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number | string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

export class RandomUserApiResponseDTO {
  results: RandomUserApiDTO[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}


export class RandomUserQueryDTO {
  @ApiProperty({
    type: Number,
    example: 10,
    description: 'The number of results',
    required: false
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  results?: number = 10;

  @ApiProperty({
    type: Number,
    example: 1,
    description: 'The page number',
    required: false
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
    description: 'The user name',
  })
  name: string;

  @ApiProperty({
    type: String,
    example: '9208,Nordenskiöldinkatu, Lieksa,Åland , Finland ',
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
