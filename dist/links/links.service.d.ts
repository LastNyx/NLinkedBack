import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { LinksRepository } from './links.repository';
export declare class LinksService {
    private linksRepository;
    constructor(linksRepository: LinksRepository);
    create(createLinkDto: CreateLinkDto): Promise<void>;
    findAll(): Promise<{
        data: import("./entities/link.entity").Link[];
    }>;
    findOne(id: number): Promise<import("./entities/link.entity").Link>;
    findByType(type: string): Promise<import("./entities/link.entity").Link[]>;
    update(id: number, updateLinkDto: UpdateLinkDto): Promise<import("./entities/link.entity").Link>;
    remove(id: number): Promise<void>;
}
