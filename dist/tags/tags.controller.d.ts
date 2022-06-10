import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
export declare class TagsController {
    private readonly tagsService;
    constructor(tagsService: TagsService);
    create(createTagDto: CreateTagDto): Promise<void>;
    findAll({ search, page }: {
        search: any;
        page: any;
    }): Promise<{
        search_query: any;
        current_page: any;
        data: import("./entities/tag.entity").Tag[];
        total: number;
        page_count: number;
        hasPrev: boolean;
        prev: any;
        hasNext: boolean;
        next: any;
        per_page: number;
    }>;
    findOne({ page }: {
        page: any;
    }, id: string): Promise<any[]>;
    update(id: string, updateTagDto: UpdateTagDto): Promise<import("./entities/tag.entity").Tag>;
    remove(id: string): Promise<void>;
}
