import { BaseEntity } from "typeorm";
import { Post } from "src/posts/entities/post.entity";
import Role from "src/roles/enum/role.enum";
export declare class User extends BaseEntity {
    id: number;
    name: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    hashPassword(): Promise<void>;
    validatePassword(password: string): Promise<Boolean>;
    posts: Post[];
    currentHashedRefreshToken: string;
    role: Role;
}
