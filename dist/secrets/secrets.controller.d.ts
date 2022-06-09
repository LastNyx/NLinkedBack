import { SecretsService } from './secrets.service';
import { CreateSecretDto } from './dto/create-secret.dto';
import { UpdateSecretDto } from './dto/update-secret.dto';
export declare class SecretsController {
    private readonly linksService;
    constructor(linksService: SecretsService);
    create(createLinkDto: CreateSecretDto): Promise<void>;
    findAll(): Promise<{
        data: import("./entities/secret.entity").Secret[];
    }>;
    findOne(id: string): Promise<import("./entities/secret.entity").Secret>;
    update(id: string, updateLinkDto: UpdateSecretDto): Promise<import("./entities/secret.entity").Secret>;
    remove(id: string): Promise<void>;
}
