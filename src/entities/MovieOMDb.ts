import { alias, list, object, serializable } from 'serializr';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MovieOMDbRating } from './MovieOMDbRating';

@Entity('movie_omdb')
export class MovieOMDb {
  @PrimaryGeneratedColumn()
  public id!: string;

  @Column('varchar')
  @serializable(alias('Title'))
  public title!: string;

  @Column('varchar')
  @serializable(alias('Year'))
  public year!: string;

  @Column('varchar', { nullable: true })
  @serializable(alias('Rated'))
  public rated!: string;

  @Column('varchar', { nullable: true })
  @serializable(alias('Released'))
  public released!: string;

  @Column('varchar', { nullable: true })
  @serializable(alias('Runtime'))
  public runtime!: string;

  @Column('varchar', { nullable: true })
  @serializable(alias('Genre'))
  public genre!: string;

  @Column('varchar', { nullable: true })
  @serializable(alias('Director'))
  public director!: string;

  @Column('varchar', { nullable: true })
  @serializable(alias('Writer'))
  public writer!: string;

  @Column('varchar', { nullable: true })
  @serializable(alias('Actors'))
  public actors!: string;

  @Column('varchar', { nullable: true })
  @serializable(alias('Plot'))
  public plot!: string;

  @Column('varchar', { nullable: true })
  @serializable(alias('Language'))
  public language!: string;

  @Column('varchar', { nullable: true })
  @serializable(alias('Country'))
  public country!: string;

  @Column('varchar', { nullable: true })
  @serializable(alias('Awards'))
  public awards!: string;

  @Column('varchar', { nullable: true })
  @serializable(alias('Poster'))
  public poster!: string;

  @OneToMany(type => MovieOMDbRating, rating => rating.movieOMDB, {
    cascade: true,
  })
  @serializable(alias('Ratings', list(object(MovieOMDbRating))))
  public ratings!: MovieOMDbRating[];

  @Column('varchar', { nullable: true })
  @serializable(alias('Metascore'))
  public metascore!: string;

  @Column('varchar', { nullable: true })
  @serializable
  public imdbRating!: string;

  @Column('varchar', { nullable: true })
  @serializable
  public imdbVotes!: string;

  @Column('varchar', { nullable: true })
  @serializable
  public imdbID!: string;

  @Column('varchar', { nullable: true })
  @serializable(alias('Type'))
  public type!: string;

  @Column('varchar', { nullable: true })
  @serializable(alias('DVD'))
  public dvd!: string;

  @Column('varchar', { nullable: true })
  @serializable(alias('BoxOffice'))
  public boxOffice!: string;

  @Column('varchar', { nullable: true })
  @serializable(alias('Production'))
  public production!: string;

  @Column('varchar', { nullable: true })
  @serializable(alias('Website'))
  public website!: string;
}
