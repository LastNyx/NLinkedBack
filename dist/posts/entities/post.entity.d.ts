import { User } from "src/auth/entities/user.entity";
import { Image } from "src/images/entities/image.entity";
import { Link } from "src/links/entities/link.entity";
import { Secret } from "src/secrets/entities/secret.entity";
import { Tag } from "src/tags/entities/tag.entity";
export declare class Post {
    id: number;
    title: string;
    created_at: Date;
    updated_at: Date;
    images: Image[];
    links: Link[];
    secrets: Secret[];
    author: User;
    tags: Tag[];
}
