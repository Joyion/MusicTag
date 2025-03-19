import ArticleImg from "../assets/article/pexels-bigbagfilms-8512650.jpg"

export default function NewsPage () {
    return (
        <div>
            <div className="news-title-container">
                <h1>News</h1>
                <div className="news-search-container">
                    <form>
                        <button><i className="fa-solid fa-bars"></i></button>
                        <input aria-label="search" placeholder="Search News" type="text"  />
                        <button type="submit"> <i className="fa-solid fa-magnifying-glass"></i></button>
                    </form>
                </div>
            </div>
            <div className="article-container">
                <div className="article-card">
                    <h1>Title</h1>
                    <img src={ArticleImg} />
                    <p>lorem ipsum</p>
                </div>
                <div className="article-card">
                    <h1>Title</h1>
                    <img src={ArticleImg} />
                    <p>lorem ipsum</p>
                </div>
                <div className="article-card">
                    <h1>Title</h1>
                    <img src={ArticleImg} />
                    <p>lorem ipsum</p>
                </div>
                <div className="article-card">
                    <h1>Title</h1>
                    <img src={ArticleImg} />
                    <p>lorem ipsum</p>
                </div>
                <div className="article-card">
                    <h1>Title</h1>
                    <img src={ArticleImg} />
                    <p>lorem ipsum</p>
                </div>
                <div className="article-card">
                    <h1>Title</h1>
                    <img src={ArticleImg} />
                    <p>lorem ipsum</p>
                </div>
            </div>
        </div>

    )
}