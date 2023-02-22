export interface IArticle {
    id: string;
    title: string;
    body: string;
}

export interface IPostsParams {
    page?: number;

    limit?: number;
}