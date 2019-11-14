import { Document } from 'mongoose';

export default interface PaginationInterface {
    docs: Document[];
    pages: number;
    total: number;
}
