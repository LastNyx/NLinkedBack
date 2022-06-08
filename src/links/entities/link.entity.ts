import { Post } from "src/posts/entities/post.entity"
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import LinkType from "../enum/links-type.enum";

@Entity('links')
export class Link {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  link: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Post, (post: Post) => post.links, { onDelete: 'CASCADE' })
  public post: Post;

  @Column({
    type: 'enum',
    enum: LinkType,
    default: LinkType.GDRIVE
  })
  public type: LinkType;
}
