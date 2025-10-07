import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/common/enum/user-role.enum';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private userService;
    private jwt;
    constructor(userService: UsersService, jwt: JwtService);
    register(email: string, name: string, password: string, role?: string): Promise<import("../users/users.entity").User>;
    login(email: string, password: string): Promise<{
        payload: {
            sub: number;
            email: string;
            role: UserRole;
        };
        token: string;
    }>;
}
