import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagsRepository } from './tags.repository';
import { Tag } from 'src/tags/entities/tag.entity';
export declare class TagsService {
    private tagsRepository;
    constructor(tagsRepository: TagsRepository);
    create(createTagDto: CreateTagDto): Promise<void>;
    findAll(search: string): Promise<{
        data: Tag[];
    }>;
    findOne(page: number, id: number): Promise<any[]>;
    findByNames(tagsName: Array<string>): Promise<Tag[]>;
    update(id: number, updateTagDto: UpdateTagDto): Promise<Tag>;
    remove(id: number): Promise<void>;
}
