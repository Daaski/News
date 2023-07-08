import {FormEvent, useState} from "react";
import {INewsArticle, INewsResponse} from "../../models/NewsModels";
import {Button, Form, Spinner} from "react-bootstrap";
import {NewsGrid} from "../../components/NewsGrid";
import Link from "next/link";
import {useRouter} from "next/router";

const SearchPage = () => {
    const router = useRouter()

    const [searchResult, setSearchResult] = useState<INewsArticle[] | null>(null)
    const [searchLoading, setSearchLoading] = useState(false)
    const [searchError, setSearchError] = useState(false)

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        const searchQuery = formData.get('searchQuery')?.toString().trim()
        if (searchQuery) {
            try {
                setSearchResult(null)
                setSearchError(false)
                setSearchLoading(true)
                const response = await fetch(`/api/search-news?q=` + searchQuery)
                const newsResponse: INewsResponse = await response.json()
                setSearchResult(newsResponse.articles)
            }
            catch (e: any) {
                setSearchError(e.message)
            }
            finally {
                setSearchLoading(false)
            }
        }
    }

    return (
        <main>
            <Button variant={"link"} onClick={() => router.back()}>Back</Button>
            <h1>Search for news</h1>
            <Link href='/categories/business'>business</Link>
            <Link href='/categories/entertainment'>entertainment</Link>
            <Link href='/categories/general'>general</Link>
            <Link href='/categories/health'>health</Link>
            <Link href='/categories/science'>science</Link>
            <Link href='/categories/sports'>sports</Link>
            <Link href='/categories/technology'>technology</Link>
            <Form style={{marginBottom: "10px"}} onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className={"mb-3"} controlId={'search-input'}>
                    <Form.Label>Search Query</Form.Label>
                    <Form.Control name={"searchQuery"} placeholder={"Search something"}/>
                </Form.Group>
                <Button type={"submit"} disabled={searchLoading}>
                    Search
                </Button>
            </Form>
            <div className={'d-flex flex-column align-items-center'}>
                {searchLoading && <Spinner/>}
                {searchError && <p>Bad search. Try again</p>}
                {searchResult?.length === 0 && <p>Nothing found. Try another search</p>}
                {searchResult && <NewsGrid articles={searchResult}/>}
            </div>
        </main>
    )
}

export default SearchPage