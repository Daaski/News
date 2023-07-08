import {INewsArticle} from "../models/NewsModels";
import {Col, Row} from "react-bootstrap";
import {NewsArticleEntry} from "./NewsArticleEntry";

interface INewsGridProps {
    articles: INewsArticle[]
}

export const NewsGrid = ({articles}: INewsGridProps) => {
    return (
        <Row xs={1} sm={2} xl={3} className="g-4">
            {articles?.map(article => (
                <Col style={{overflowY: "hidden"}} key={article.url}>
                    <NewsArticleEntry article={article} />
                </Col>
            ))}
        </Row>
    )
}