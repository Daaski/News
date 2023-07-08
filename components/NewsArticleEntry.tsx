import {INewsArticle} from "../models/NewsModels";
import Image from "next/image";
import Link from "next/link";
import {Card} from "react-bootstrap";
import placeholderImage from "/public/assets/images/newsarticle_placeholder.jpg"

interface INewsArticleEntryProps {
    article: INewsArticle
}

export const NewsArticleEntry = ({article: {title, url, description, urlToImage}}: INewsArticleEntryProps) => {
    return (
        <div>
            <Link href={url}>
                <Card className="h-100">
                    <Image src={urlToImage || placeholderImage} width={500} height={200}
                           alt={'img'} className={`card-img-top`}/>
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>{description}</Card.Text>
                    </Card.Body>
                </Card>
            </Link>
        </div>
    )
}