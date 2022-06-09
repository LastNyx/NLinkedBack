import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import { TagsService } from 'src/tags/tags.service';
import { PostsRepository } from './posts.repository';
export declare class PostsController {
    private postsService;
    private tagsService;
    private postRepository;
    constructor(postsService: PostsService, tagsService: TagsService, postRepository: PostsRepository);
    create(createPostDto: CreatePostDto, req: RequestWithUser): Promise<void>;
    getTest({ page, search, tag }: {
        page: any;
        search: any;
        tag: any;
    }): Promise<import("nestjs-typeorm-paginate").Pagination<import("./entities/post.entity").Post, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    findAllPublic({ page, search }: {
        page: any;
        search: any;
    }): Promise<{
        search_query: any;
        current_page: any;
        data: import("./entities/post.entity").Post[];
        total: number;
        page_count: number;
        hasPrev: boolean;
        prev: any;
        hasNext: boolean;
        next: any;
        per_page: number;
    }>;
    findAll({ page, search }: {
        page: any;
        search: any;
    }, req: RequestWithUser): Promise<{
        search_query: any;
        current_page: any;
        data: import("./entities/post.entity").Post[];
        total: number;
        page_count: number;
        hasPrev: boolean;
        prev: any;
        hasNext: boolean;
        next: any;
        per_page: number;
    }>;
    findRand(): Promise<import("./entities/post.entity").Post[]>;
    findOnePublic(id: string): Promise<import("./entities/post.entity").Post>;
    findOne(id: string, req: RequestWithUser): Promise<import("./entities/post.entity").Post>;
    update(id: string, updatePostDto: UpdatePostDto, req: RequestWithUser): Promise<import("./entities/post.entity").Post>;
    remove(id: string): Promise<void>;
}
