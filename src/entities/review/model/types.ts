export interface Review {
  id: string;
  author: string;
  content: string;
  created_at: string;
  author_details: {
    avatar_path: string | null;
    rating: number | null;
    username: string;
  };
}
