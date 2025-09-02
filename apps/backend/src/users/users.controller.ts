import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import {
  GetUserListResponseDTO,
  RandomUserQueryDTO,
  RandomUserResponseDTO,
} from './dto/user.dto';
import { CommonResponseDTO } from 'src/common/common.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({ status: 200, type: GetUserListResponseDTO })
  @Get('with-company')
  async getUsersWithCompany() {
    return this.usersService.getUsers();
  }

  @ApiResponse({ status: 200, type: RandomUserResponseDTO })
  @Get('/random-users')
  async getRandomUser(
    @Query() queries: RandomUserQueryDTO,
  ): Promise<CommonResponseDTO<RandomUserResponseDTO[]>> {
    console.log(queries)
    const data = await this.usersService.getRandomUser(queries);
    return {
      success: true,
      message: 'Success get random user',
      data,
    };
  }
}
