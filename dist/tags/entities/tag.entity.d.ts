import { Post } from 'src/posts/entities/post.entity';
export declare class Tag {
    id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    posts: Post[];
}
