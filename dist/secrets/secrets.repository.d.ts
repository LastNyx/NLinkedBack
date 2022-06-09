import { Repository } from "typeorm";
import { Secret } from "./entities/secret.entity";
export declare class SecretsRepository extends Repository<Secret> {
    getLinks(): Promise<{
        data: Secret[];
    }>;
    getLinkById(id: number): Promise<Secret>;
    deleteLink(id: number): Promise<void>;
}
