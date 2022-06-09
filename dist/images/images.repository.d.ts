import { Repository } from "typeorm";
import { Image } from "./entities/image.entity";
export declare class ImagesRepository extends Repository<Image> {
    getImage(): Promise<{
        data: Image[];
    }>;
    getImageById(id: number): Promise<Image>;
    deleteImage(id: number): Promise<void>;
}
