import { CreateSecretDto } from './create-secret.dto';
declare const UpdateSecretDto_base: import("@nestjs/common").Type<Partial<CreateSecretDto>>;
export declare class UpdateSecretDto extends UpdateSecretDto_base {
    link: string;
}
export {};
