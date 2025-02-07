import { Articles } from "@/app/types/types";
import { notFound } from "next/navigation";


const ArticleDetails = async ({ params }: { params: { id: string } }) => {
    console.log(params)
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
        if (!response.ok) {
            throw new Error("Article not found");
        }
        const article: Articles = await response.json();
        return (
            <section className="max-w-2xl mx-auto p-6">
                <h1 className="text-3xl font-bold">{article.title}</h1>
                <p className="text-gray-700 mt-4">{article.description}</p>
            </section>
        );
    } catch (error) {
        console.error("Error fetching article:", error);
        return notFound();
    }
};

export default ArticleDetails;
