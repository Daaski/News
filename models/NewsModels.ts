
export interface INewsArticle {
    title: string
    description: string
    url: string
    urlToImage?: string
    publishedAt: string
}

export interface INewsResponse {
    articles: INewsArticle[]
}