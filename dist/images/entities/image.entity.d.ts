import { Post } from 'src/posts/entities/post.entity';
export declare class Image {
    id: number;
    link: string;
    created_at: Date;
    updated_at: Date;
    post: Post;
}
