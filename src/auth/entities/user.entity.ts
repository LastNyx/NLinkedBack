import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import * as bcrypt from "bcrypt";
import { Post } from "src/posts/entities/post.entity";
import { Exclude } from "class-transformer";
import Role from "src/roles/enum/role.enum";

@Entity('users')
@Unique(['name'])
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @CreateDateColumn()
  @Exclude({ toPlainOnly: true })
  created_at: Date;

  @UpdateDateColumn()
  @Exclude({ toPlainOnly: true })
  updated_at: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }

  async validatePassword(password: string): Promise<Boolean> {
    return bcrypt.compare(password, this.password);
  }

  @OneToMany(() => Post, (post: Post) => post.author)
  public posts: Post[]

  @Column()
  @Exclude({ toPlainOnly: true })
  public currentHashedRefreshToken: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER
  })
  public role: Role
}
