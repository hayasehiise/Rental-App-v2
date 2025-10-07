"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const cookieParser = require("cookie-parser");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.enableCors({
        origin: process.env.CLIENT_URL?.split(',') || 'http://localhost:5173',
        Credential: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.info(`🚀 Server berjalan di: http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map