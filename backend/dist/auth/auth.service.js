"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_role_enum_1 = require("../common/enum/user-role.enum");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    userService;
    jwt;
    constructor(userService, jwt) {
        this.userService = userService;
        this.jwt = jwt;
    }
    async register(email, name, password, role) {
        const validRoles = role && Object.values(user_role_enum_1.UserRole).includes(role)
            ? role
            : user_role_enum_1.UserRole.CUSTOMER;
        return this.userService.create(email, name, password, validRoles);
    }
    async login(email, password) {
        const user = await this.userService.findByEmail(email);
        if (!user)
            throw new Error('Invalid credentials');
        const valid = await bcrypt.compare(password, user.password);
        if (!valid)
            throw new Error('Invalid credentials');
        const payload = { sub: user.id, email: user.email, role: user.role };
        const token = this.jwt.sign(payload);
        return { payload, token };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map