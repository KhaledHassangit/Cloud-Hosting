import { Article } from "@prisma/client";
import { DOMAIN } from "../constants/enums";

export async function getArticles(pageNumber: string | undefined): Promise<Article[]> {
    const response = await fetch(`${DOMAIN.HOST}/api/articles?pageNumber=${pageNumber}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}



export async function getTotalArticles(): Promise<number> {
    const response = await fetch(`${DOMAIN.HOST}/api/articles/count`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const { count } = await response.json() as {count : number} ;
    return count 
}

export async function getArticlesByTitle(searchText: string): Promise<Article[]> {
    const response = await fetch(`${DOMAIN.HOST}/api/articles/search?searchText=${searchText}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

