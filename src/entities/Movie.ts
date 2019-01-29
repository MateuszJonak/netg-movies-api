import { IsDefined } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Comment } from './Comment';
import { MovieOMDb } from './MovieOMDb';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  public id!: string;

  @Column('varchar')
  @IsDefined()
  public title!: string;

  @OneToMany(type => Comment, comment => comment.movie)
  public comments!: Comment[];

  @OneToOne(type => MovieOMDb, { cascade: true })
  @JoinColumn()
  public omdb!: MovieOMDb;
}
