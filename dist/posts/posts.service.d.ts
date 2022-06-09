import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { PostsRepository } from './posts.repository';
import { ImagesRepository } from 'src/images/images.repository';
import { LinksRepository } from 'src/links/links.repository';
import { User } from 'src/auth/entities/user.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { SecretsRepository } from 'src/secrets/secrets.repository';
export declare class PostsService {
    private postRepository;
    private imageRepository;
    private linksRepository;
    private secretsRepository;
    constructor(postRepository: PostsRepository, imageRepository: ImagesRepository, linksRepository: LinksRepository, secretsRepository: SecretsRepository);
    create(createPostDto: CreatePostDto, tags: Array<Tag>, user: User): Promise<void>;
    findAllPublic(page: number, search: string): Promise<{
        search_query: any;
        current_page: any;
        data: Post[];
        total: number;
        page_count: number;
        hasPrev: boolean;
        prev: any;
        hasNext: boolean;
        next: any;
        per_page: number;
    }>;
    findAll(page: number, search: string, user: User): Promise<{
        search_query: any;
        current_page: any;
        data: Post[];
        total: number;
        page_count: number;
        hasPrev: boolean;
        prev: any;
        hasNext: boolean;
        next: any;
        per_page: number;
    }>;
    findOne(id: number, user: User): Promise<Post>;
    findOnePub(id: number): Promise<Post>;
    update(id: number, updatePostDto: UpdatePostDto, tags: Array<Tag>, user: User): Promise<Post>;
    remove(id: number): Promise<void>;
    test(page: number, search: string, tag: string): Promise<import("nestjs-typeorm-paginate").Pagination<Post, import("nestjs-typeorm-paginate").IPaginationMeta>>;
}
