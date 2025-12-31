import { useEffect, useState } from "react";
import { fetchArticles, fetchArticleVersion } from "../api/articles";
import ArticleCard from "../components/ArticleCard";
import ArticleModal from "../components/ArticleModal";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Background from "../components/Background";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [aiVersion, setAiVersion] = useState(null);

  useEffect(() => {
    fetchArticles().then(res => setArticles(res.data));
  }, []);

  const openArticle = async (article) => {
    setSelected(article);
    const res = await fetchArticleVersion(article._id);
    setAiVersion(res.data);
  };

  return (
    <Background>
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map(article => (
            <ArticleCard
              key={article._id}
              article={article}
              onView={openArticle}
            />
          ))}
        </div>
      </main>

      <Footer />

      {selected && (
        <ArticleModal
          article={selected}
          aiVersion={aiVersion}
          onClose={() => {
            setSelected(null);
            setAiVersion(null);
          }}
        />
      )}
    </Background>
  );
}
