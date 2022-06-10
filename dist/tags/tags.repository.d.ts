import { Repository } from "typeorm";
import { Tag } from "./entities/tag.entity";
export declare class TagsRepository extends Repository<Tag> {
    getTags(query: any): Promise<{
        search_query: any;
        current_page: any;
        data: Tag[];
        total: number;
        page_count: number;
        hasPrev: boolean;
        prev: any;
        hasNext: boolean;
        next: any;
        per_page: number;
    }>;
    getTagsById(query: any, id: number): Promise<any[]>;
    deleteTag(id: number): Promise<void>;
    forEach(tagsArray: Array<string>): Promise<Tag[]>;
}
