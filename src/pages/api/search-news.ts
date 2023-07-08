// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {INewsResponse} from "../../../models/NewsModels";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const searchQuery = req.query?.q?.toString()
  if (!searchQuery) {
    return res.status(404).json({error: "Bad request"})
  }

  const response = await fetch(`https://newsapi.org/v2/top-headlines?q=${searchQuery}&apiKey=${process.env.NEWS_API_KEY}`)

  const newsResponse: INewsResponse = await response.json()

  res.status(200).json(newsResponse)
}
