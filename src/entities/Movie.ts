import { IsDefined } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './Comment';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  public id!: string;

  @Column('varchar')
  @IsDefined()
  public title!: string;

  @OneToMany(type => Comment, comment => comment.movie)
  public comments!: Comment[];
}
