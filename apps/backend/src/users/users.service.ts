import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  GetUserListResponseDTO,
  RandomUserApiResponseDTO,
  RandomUserQueryDTO,
  RandomUserResponseDTO,
} from './dto/user.dto';
import axios from 'axios';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<GetUserListResponseDTO[]> {
    const users = await this.prisma.user.findMany({
      include: { Company: true },
    });

    return users.flatMap((user) =>
      user.Company.map((company) => ({
        user_id: user.id,
        company_id: company.id,
        nama: user.name,
        email: user.email,
        telp: user.phone,
        company_code: company.company_code,
        company_name: company.company_name,
      })),
    );
  }
  async getRandomUser(
    queries: RandomUserQueryDTO,
  ): Promise<RandomUserResponseDTO[]> {
    const { results, page } = queries;
    console.log(queries)
    const randomUsersFetch = await fetch(
      `https://randomuser.me/api?results=${results}&page=${page}`,
    );
    const { results: randomUsers }: RandomUserApiResponseDTO =
      await randomUsersFetch.json();

    return randomUsers.map((user) => {
      return {
        name: `${user.name.title}, ${user.name.first} ${user.name.last}`,
        location: [
          user.location.street.number,
          user.location.street.name,
          user.location.city,
          user.location.state,
          user.location.country,
        ].join(', '),
        email: user.email,
        age: user.registered.age,
        phone: user.phone,
        cell: user.cell,
        picture: [
          user.picture.large,
          user.picture.medium,
          user.picture.thumbnail,
        ],
      };
    });
  }
}
