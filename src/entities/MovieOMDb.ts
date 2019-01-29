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

  @Column('varchar')
  @serializable(alias('Rated'))
  public rated!: string;

  @Column('varchar')
  @serializable(alias('Released'))
  public released!: string;

  @Column('varchar')
  @serializable(alias('Runtime'))
  public runtime!: string;

  @Column('varchar')
  @serializable(alias('Genre'))
  public genre!: string;

  @Column('varchar')
  @serializable(alias('Director'))
  public director!: string;

  @Column('varchar')
  @serializable(alias('Writer'))
  public writer!: string;

  @Column('varchar')
  @serializable(alias('Actors'))
  public actors!: string;

  @Column('varchar')
  @serializable(alias('Plot'))
  public plot!: string;

  @Column('varchar')
  @serializable(alias('Language'))
  public language!: string;

  @Column('varchar')
  @serializable(alias('Country'))
  public country!: string;

  @Column('varchar')
  @serializable(alias('Awards'))
  public awards!: string;

  @Column('varchar')
  @serializable(alias('Poster'))
  public poster!: string;

  @OneToMany(type => MovieOMDbRating, rating => rating.movieOMDB, {
    cascade: true,
  })
  @serializable(alias('Ratings', list(object(MovieOMDbRating))))
  public ratings!: MovieOMDbRating[];

  @Column('varchar')
  @serializable(alias('Metascore'))
  public metascore!: string;

  @Column('varchar')
  @serializable
  public imdbRating!: string;

  @Column('varchar')
  @serializable
  public imdbVotes!: string;

  @Column('varchar')
  @serializable
  public imdbID!: string;

  @Column('varchar')
  @serializable(alias('Type'))
  public type!: string;

  @Column('varchar')
  @serializable(alias('DVD'))
  public dvd!: string;

  @Column('varchar')
  @serializable(alias('BoxOffice'))
  public boxOffice!: string;

  @Column('varchar')
  @serializable(alias('Production'))
  public production!: string;

  @Column('varchar')
  @serializable(alias('Website'))
  public website!: string;
}
