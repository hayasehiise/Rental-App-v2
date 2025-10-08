import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UsersService } from './users.service';
import { plainToInstance } from 'class-transformer';
import { UserResDto } from './dto/me-res.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req: Request) {
    const validatedUser = req.user as {
      id: number;
      email: string;
      role: string;
    };
    const user = await this.usersService.findByEmail(validatedUser.email);

    // return user;

    return plainToInstance(UserResDto, user, { excludeExtraneousValues: true });
  }
}
