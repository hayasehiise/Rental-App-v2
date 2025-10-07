import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UserRole } from 'src/common/enum/user-role.enum';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    return await this.userRepo.findOne({ where: { email } });
  }

  async create(email: string, name: string, password: string, role?: UserRole) {
    const user = this.userRepo.create({ email, name, password, role });

    return await this.userRepo.save(user);
  }
}
