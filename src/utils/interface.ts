export interface Data {
  Title?: string;
  Year?: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Poster?: string;
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  imdbID?: string;
  Type?: string;
  Response?: string;
  Images?: string[];
  id?: number;
  poster_path?: any;
  release_date?: any;
  title?: string;
  vote_average?: number;
}

export interface ItemData {
  item: FilmFromMovieDB | Data;
}

export interface ReqFilmDB {
  data: ParamFilmData;
}

export interface ParamFilmData {
  page: number;
  results: FilmFromMovieDB[];
  total_pages: number;
  total_results: number;
}

export interface FilmFromMovieDB {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id?: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  Images?: any;
  Genre?: any;
  Director: any;
  Released?: any;
  Title?: string;
  Actors?: string;
  imdbRating?: string;
}
