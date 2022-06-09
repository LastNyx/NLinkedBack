import { Repository } from "typeorm";
import { Post } from "./entities/post.entity";
import { Pagination } from 'nestjs-typeorm-paginate';
export declare class PostsRepository extends Repository<Post> {
    test(query: any): Promise<Pagination<Post, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getPosts(query: any, userRole: string): Promise<{
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
    getPostsPublic(query: any): Promise<{
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
    getPostById(id: number, userRole: string): Promise<Post>;
    getPostByIdPub(id: number): Promise<Post>;
    deletePost(id: number): Promise<void>;
}
