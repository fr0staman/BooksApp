export type TopBannerSlide = {
  id: number;
  book_id: number;
  cover: string;
};

export type Book = {
  id: number;
  name: string;
  author: string;
  summary: string;
  genre: string;
  cover_url: string;
  views: string;
  likes: string;
  quotes: string;
};

export type YouWillLike = number[];

export type JsonData = {
  books: Book[];
  top_banner_slides: TopBannerSlide[];
  you_will_like_section: YouWillLike;
};

export type DetailsCarousel = {
  books: Book[];
};
