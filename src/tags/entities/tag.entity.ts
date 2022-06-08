import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from 'src/posts/entities/post.entity'

@Entity('tags')
export class Tag {

  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  name:string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Post, (post:Post) => post.tags,)
  posts: Post[]
}
