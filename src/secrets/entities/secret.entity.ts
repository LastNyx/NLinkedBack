import { Exclude, Expose } from "class-transformer";
import { Post } from "src/posts/entities/post.entity"
import LinkType from "src/links/enum/links-type.enum";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('secrets')
export class Secret {

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
