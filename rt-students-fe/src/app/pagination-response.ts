import { Student } from './student';

export interface PaginationResponse {
  docs: Student[];
  pages: number;
  total: number;
}
