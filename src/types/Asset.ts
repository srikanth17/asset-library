export interface Asset {
  duration: number;
  email: string;
  firstName: string;
  imageUrl: string;
  lastName: string;
  likes: number;
  thumbnailUrl: string;
}

export interface ApiResponse {
  frameSize: number;
  resultCount: number;
  rows: Asset[];
  total: number;
}
