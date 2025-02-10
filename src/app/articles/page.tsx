import React from 'react'
import { Article } from '@prisma/client';
import { getArticles } from '@/hooks/getArticles';
import { pageSize, Routes } from '@/constants/enums';
import SearchInput from '@/utlizes/SearchInput';
import ArticlesItem from '@/components/articles/ArticlesItem';
import Pagination from '@/utlizes/Pagination';
import db from '@/lib/prisma';

interface ArticlesPageProps {
    searchParams: { pageNumber: string }
}

const ArticlesPage = async ({ searchParams }: ArticlesPageProps) => {
    const count:number = await db.article.count();
    const pages = Math.ceil(count / pageSize)
    const { pageNumber } = searchParams
    try {
        const articles: Article[] = await getArticles(pageNumber)
        return (
            <section className="max-w-4xl mx-auto p-6">
                <SearchInput />
                <div className="grid gap-6">
                    {articles?.map((article) => (
                    <ArticlesItem article={article} key={article.id} />
                    ))}
                </div>
                <Pagination pageNumber={parseInt(pageNumber)} route={Routes.ARTICLES} pages={pages} />
            </section>
        );
    } catch (error) {
        console.error('Fetch error:', error);
        return <div>Error loading articles.</div>;
    }
};

export default ArticlesPage