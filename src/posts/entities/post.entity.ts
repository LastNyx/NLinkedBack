import { Exclude, Expose } from "class-transformer";
import { User } from "src/auth/entities/user.entity";
import { Image } from "src/images/entities/image.entity";
import { Link } from "src/links/entities/link.entity";
import Role from "src/roles/enum/role.enum";
import { Secret } from "src/secrets/entities/secret.entity";
import { Tag } from "src/tags/entities/tag.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('posts')
export class Post {

  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  title:string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Image, (image: Image) => image.post,{ eager: true })
  public images: Image[];

  @OneToMany(() => Link, (link: Link) => link.post,{ eager: true })
  public links: Link[];

  @OneToMany(() => Secret, (secret: Secret) => secret.post)
  public secrets: Secret[];

  @ManyToOne(() => User, (user: User) => user.posts,{eager: true})
  public author: User;

  @ManyToMany(() => Tag, (tag:Tag) => tag.posts ,{ eager: true })
  @JoinTable()
  public tags: Tag[];
}
