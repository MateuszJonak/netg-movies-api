import { alias, serializable } from 'serializr';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MovieOMDb } from './MovieOMDb';

@Entity('movie_omdb_rating')
export class MovieOMDbRating {
  @PrimaryGeneratedColumn()
  public id!: string;

  @Column('varchar', { nullable: true })
  @serializable(alias('Source'))
  public source!: string;

  @Column('varchar', { nullable: true })
  @serializable(alias('Value'))
  public value!: string;

  @ManyToOne(type => MovieOMDb, movie => movie.ratings, {
    nullable: false,
  })
  public movieOMDB!: MovieOMDb;
}
