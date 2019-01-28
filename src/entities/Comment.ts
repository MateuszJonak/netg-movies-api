import { IsDefined } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityExists } from '../validators/EntityExists';
import { Movie } from './Movie';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  public id!: string;

  @Column('varchar')
  @IsDefined()
  public content!: string;

  @CreateDateColumn()
  public createdAt!: string;

  @UpdateDateColumn()
  public updatedAt!: string;

  @ManyToOne(type => Movie, movie => movie.comments, {
    nullable: false,
  })
  @EntityExists()
  public movie!: Movie;
}
