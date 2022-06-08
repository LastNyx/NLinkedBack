import { Post } from 'src/posts/entities/post.entity'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('images')
export class Image {

  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  link:string;
  
  @CreateDateColumn()
  created_at: Date;
  
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Post, (post:Post) => post.images, { onDelete: 'CASCADE' })
  public post: Post;
}
