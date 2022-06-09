import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
export declare class LinksController {
    private readonly linksService;
    constructor(linksService: LinksService);
    create(createLinkDto: CreateLinkDto): Promise<void>;
    findAll(): Promise<{
        data: import("./entities/link.entity").Link[];
    }>;
    findOne(id: string): Promise<import("./entities/link.entity").Link>;
    update(id: string, updateLinkDto: UpdateLinkDto): Promise<import("./entities/link.entity").Link>;
    remove(id: string): Promise<void>;
}
