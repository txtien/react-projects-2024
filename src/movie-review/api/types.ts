export interface IMovie {
  id: number;
  title: string;
  overview: string;
  poster: string;
  genres: { id: number; name: string }[];
  release_date: string;
  vote: number;
  vote_count: number;
  is_new: boolean;
}
