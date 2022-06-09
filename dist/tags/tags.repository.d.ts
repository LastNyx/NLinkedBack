import { Repository } from "typeorm";
import { Tag } from "./entities/tag.entity";
export declare class TagsRepository extends Repository<Tag> {
    getTags(query: any): Promise<{
        data: Tag[];
    }>;
    getTagsById(query: any, id: number): Promise<any[]>;
    deleteTag(id: number): Promise<void>;
    forEach(tagsArray: Array<string>): Promise<Tag[]>;
}
