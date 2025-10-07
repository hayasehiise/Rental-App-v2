import { User } from './users.entity';
import { UserRole } from 'src/common/enum/user-role.enum';
import { Repository } from 'typeorm';
export declare class UsersService {
    private userRepo;
    constructor(userRepo: Repository<User>);
    findByEmail(email: string): Promise<User | null>;
    create(email: string, name: string, password: string, role?: UserRole): Promise<User>;
}
