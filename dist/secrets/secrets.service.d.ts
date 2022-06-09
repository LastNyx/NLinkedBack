import { CreateSecretDto } from './dto/create-secret.dto';
import { UpdateSecretDto } from './dto/update-secret.dto';
import { SecretsRepository } from './secrets.repository';
export declare class SecretsService {
    private secretsRepository;
    constructor(secretsRepository: SecretsRepository);
    create(createSecretDto: CreateSecretDto): Promise<void>;
    findAll(): Promise<{
        data: import("./entities/secret.entity").Secret[];
    }>;
    findOne(id: number): Promise<import("./entities/secret.entity").Secret>;
    update(id: number, updateSecretDto: UpdateSecretDto): Promise<import("./entities/secret.entity").Secret>;
    remove(id: number): Promise<void>;
}
