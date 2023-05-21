export interface PaginationI {
    page: number;
    limit: number;
    perPage: number;
    total: number;
    search?: string;
}