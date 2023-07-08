import styles from '@/styles/Home.module.css'
import {INewsArticle, INewsResponse} from "../../models/NewsModels";
import {GetServerSideProps} from "next";
import {NewsGrid} from "../../components/NewsGrid";
import Link from "next/link";

interface INewsPageProps {
    newsArticles: INewsArticle[]
}


export default function NewsPage({newsArticles}: INewsPageProps) {
  return (
    <main>
      <h1>Breaking news</h1>
        <Link href='/search'>Looking for something?</Link>
        <NewsGrid articles={newsArticles}/>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`)
    const newsResponse: INewsResponse = await response.json()

    return {
        props: {
            newsArticles: newsResponse.articles
        }
    }
}