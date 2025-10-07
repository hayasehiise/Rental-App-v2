import { UserRole } from 'src/common/enum/user-role.enum';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: UserRole;
    createdAt: Date;
    updateAt: Date;
    passwordHash(): Promise<void>;
}
