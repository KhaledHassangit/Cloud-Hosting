import { Article } from "@prisma/client";
import { DOMAIN } from "../constants/enums";
import { SingleArticle } from "@/types/types";

export async function getArticles(pageNumber: string | undefined): Promise<Article[]> {
    const response = await fetch(`${DOMAIN.LOCALHOST}/api/articles?pageNumber=${pageNumber}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export async function getTotalArticles(): Promise<number> {
    const response = await fetch(`${DOMAIN.LOCALHOST}/api/articles/count`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const { count } = await response.json() as {count : number} ;
    return count 
}

export async function getArticlesByTitle(searchText: string): Promise<Article[]> {
    const response = await fetch(`${DOMAIN.LOCALHOST}/api/articles/search?searchText=${searchText}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}



export async function getSingleArticle(id: string): Promise<SingleArticle> {
    const response = await fetch(`${DOMAIN.LOCALHOST}/api/articles/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}