export type MovieData = {
  _id: string;
  title: string;
  synopsis: string;
  language: string;
  certificate: string;
  categories: Array<string>;
  formats: Array<string>;
  movie_trailer: string;
  poster: {
    id: string;
    image_url: string;
  };
  banner: {
    id: string;
    image_url: string;
  };
  sub_heading: string;
  release_date: string;
  status: "SHOWING" | "NOT_SHOWING" | "PENDING";
  duration: {
    hour: number;
    minutes: number;
    seconds: number;
  };
  type: "LIVE_ACTION" | "ANIMATED";
  actors?: Array<{
    name: string;
  }>;
};
