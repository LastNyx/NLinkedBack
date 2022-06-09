import { Repository } from "typeorm";
import { Link } from "./entities/link.entity";
export declare class LinksRepository extends Repository<Link> {
    getLinks(): Promise<{
        data: Link[];
    }>;
    getLinkById(id: number): Promise<Link>;
    getLinkByType(type: string): Promise<Link[]>;
    deleteLink(id: number): Promise<void>;
}
