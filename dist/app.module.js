"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const posts_module_1 = require("./posts/posts.module");
const database_connection_service_1 = require("./shared/services/database-connection.service");
const images_module_1 = require("./images/images.module");
const links_module_1 = require("./links/links.module");
const tags_module_1 = require("./tags/tags.module");
const auth_module_1 = require("./auth/auth.module");
const roles_module_1 = require("./roles/roles.module");
const secrets_module_1 = require("./secrets/secrets.module");
const Joi = require("joi");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                validationSchema: Joi.object({
                    JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
                    JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
                    JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
                    JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
                }),
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useClass: database_connection_service_1.DatabaseConnectionService
            }),
            posts_module_1.PostsModule,
            images_module_1.ImagesModule,
            links_module_1.LinksModule,
            tags_module_1.TagsModule,
            auth_module_1.AuthModule,
            roles_module_1.RolesModule,
            secrets_module_1.SecretsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService,],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map