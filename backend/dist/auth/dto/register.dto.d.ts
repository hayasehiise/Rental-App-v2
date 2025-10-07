import { UserRole } from 'src/common/enum/user-role.enum';
export declare class RegisterDto {
    email: string;
    name: string;
    password: string;
    role?: UserRole;
}
