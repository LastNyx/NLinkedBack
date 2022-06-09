import { CreatePostDto } from './create-post.dto';
declare const UpdatePostDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreatePostDto>>;
export declare class UpdatePostDto extends UpdatePostDto_base {
    title: string;
    tags: Array<string>;
    images: Array<string>;
    links: Array<string>;
    secrets: Array<string>;
}
export {};
