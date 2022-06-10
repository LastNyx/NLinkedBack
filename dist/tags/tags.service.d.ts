import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagsRepository } from './tags.repository';
import { Tag } from 'src/tags/entities/tag.entity';
export declare class TagsService {
    private tagsRepository;
    constructor(tagsRepository: TagsRepository);
    create(createTagDto: CreateTagDto): Promise<void>;
    findAll(search: string, page: string): Promise<{
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
    findOne(page: number, id: number): Promise<any[]>;
    findByNames(tagsName: Array<string>): Promise<Tag[]>;
    update(id: number, updateTagDto: UpdateTagDto): Promise<Tag>;
    remove(id: number): Promise<void>;
}
