import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
export declare class ImagesController {
    private readonly imagesService;
    constructor(imagesService: ImagesService);
    create(createImageDto: CreateImageDto): Promise<void>;
    findAll(): Promise<{
        data: import("./entities/image.entity").Image[];
    }>;
    findOne(id: string): Promise<import("./entities/image.entity").Image>;
    update(id: string, updateImageDto: UpdateImageDto): Promise<import("./entities/image.entity").Image>;
    remove(id: string): Promise<void>;
}
