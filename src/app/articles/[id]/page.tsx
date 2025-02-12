import { getSingleArticle } from "@/hooks/getArticles";
import { SingleArticle } from "@/types/types";
import { notFound } from "next/navigation";


const ArticleDetails = async ({ params }: { params: { id: string } }) => {
    console.log(params)
    try {
        const article: SingleArticle =  await getSingleArticle(params.id)
        return (  
            <section className="max-w-2xl mx-auto p-6">
                <h1 className="text-3xl font-bold">{article.title}</h1>
                <p className="text-gray-700 mt-4">{article.description}</p>
                <p className="text-gray-700 mt-4">{new Date(article.createdAt).toDateString()}</p>
            </section>
        );
    } catch (error) {
        console.error("Error fetching article:", error);
        return notFound();
    }
};

export default ArticleDetails;
