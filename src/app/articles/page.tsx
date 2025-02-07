import React from 'react'
import { Articles } from '../types/types'
import Link from 'next/link';

const ArticlesPage = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const articles: Articles[] = await response.json();
        return (
            <section className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-center mb-6">Latest Articles</h1>
                <div className="grid gap-6">
                    {articles.slice(0, 10).map((article) => (
                        <article key={article.id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800">{article.title}</h2>
                            <p className="text-gray-600 mt-2 mb-10">{article.body}</p>
                            <Link
                                href={`/articles/${article.id}`}
                                className=" mt-16 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                                Read more
                            </Link>
                        </article>
                    ))}
                </div>
            </section>
        );
    } catch (error) {
        console.error('Fetch error:', error);
        return <div>Error loading articles.</div>;
    }
};

export default ArticlesPage