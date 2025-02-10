import { Article } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

interface ArticleItemProps {
    article: Article;
  }
  
const ArticlesItem = ({article}:ArticleItemProps) => {
  return (
    <article key={article.id} className="mt-10 bg-white shadow-lg rounded-lg p-6 border border-gray-200">
    <h2 className="text-xl font-semibold text-gray-800">{article.title}</h2>
    <p className="text-gray-600 mt-2 mb-10">{article.description}</p>
    <Link
        href={`/articles/${article.id}`}
        className=" mt-16 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
        Read more
    </Link>
</article>
  )
}

export default ArticlesItem
