import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { ImagesRepository } from './images.repository';
export declare class ImagesService {
    private imagesRepository;
    constructor(imagesRepository: ImagesRepository);
    create(createImageDto: CreateImageDto): Promise<void>;
    findAll(): Promise<{
        data: import("./entities/image.entity").Image[];
    }>;
    findOne(id: number): Promise<import("./entities/image.entity").Image>;
    update(id: number, updateImageDto: UpdateImageDto): Promise<import("./entities/image.entity").Image>;
    remove(id: number): Promise<void>;
}
