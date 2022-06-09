import { Post } from "src/posts/entities/post.entity";
import LinkType from "src/links/enum/links-type.enum";
export declare class Secret {
    id: number;
    link: string;
    created_at: Date;
    updated_at: Date;
    post: Post;
    type: LinkType;
}
