import {INewsArticle, INewsResponse} from "../../../models/NewsModels";
import {NewsGrid} from "../../../components/NewsGrid";
import {GetStaticPaths, GetStaticProps} from "next";
import {Button} from "react-bootstrap";
import {useRouter} from "next/router";

interface ICategoryPageProps {
    articles: INewsArticle[]
}

const CategoryPage = ({articles}: ICategoryPageProps) => {
    const router = useRouter()
    return (
        <main>
            <Button variant={"link"} onClick={() => router.back()}>Back</Button>
            <NewsGrid articles={articles}/>
        </main>
    )
}

export default CategoryPage

export const getStaticPaths: GetStaticPaths = async () => {
    const slugs = [
        "business",
        "entertainment",
        "general",
        "health",
        "science",
        "sports",
        "technology",
    ]

    const paths = slugs.map(slug => ({params: {slug: slug}}))

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const slug = context.params?.slug
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${slug}&apiKey=${process.env.NEWS_API_KEY}`);
    const newsResponse: INewsResponse = await response.json()

    return {
        props: {
            articles: newsResponse.articles
        }
    }
}