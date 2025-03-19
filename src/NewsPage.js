import ArticleImg from "../assets/article/pexels-bigbagfilms-8512650.jpg"

export default function NewsPage () {

    const onFilterClick = (e) => {
        e.preventDefault();
        console.log("Click filter")
        document.getElementById("search-filter-box").classList.toggle("open")
    }

    const onClearFilters = (e) => {
        e.preventDefault();
        console.log("Clearing search filters");
    }

    return (
        <div className="news-page">
            <div className="news-title-container">
                <h1 className="abril-fatface-regular">News</h1>
                <div>
                    <div className="search-filter-container">
                        <form>
                            <button onClick={onFilterClick} ><i className="fa-solid fa-bars"></i></button>
                            <input aria-label="search" placeholder="Search News" type="text" />
                            <button type="submit"> <i className="fa-solid fa-magnifying-glass"></i></button>
                        </form>
                    </div>
                    <div id="search-filter-box" className="search-filter-dropdown">
                        <div>
                            <form>
                                <h4  className="coustard-bold">Filters</h4>
                                <div>
                                    <h5 className="coustard-bold">Dates:</h5>
                                    <label className="coustard-regular">From</label>
                                    <input type="date" />
                                    <label className="coustard-regular">To</label>
                                    <input type="date" />
                                </div>
                                <div>
                                    <h5 className="coustard-bold">Content Type:</h5>
                                    <input type="checkbox" />
                                    <label className="coustard-regular">Interview </label>
                                    <input type="checkbox" />
                                    <label className="coustard-regular">Tour Dates</label>
                                    <input type="checkbox" />
                                    <label className="coustard-regular">BTS Content</label>
                                </div>
                            </form>
                           <div className="clear-filter-btn">
                                <i class="fa-solid fa-xmark"></i>
                                <a href="#">Clear</a>
                           </div>
                        </div>
          
                    </div>
                </div>
  
   
            </div>
            <div className="news-container">
                <div className="news-card">
                    <h1 className="coustard-regular"><a href="#">A title of an article</a></h1>
                    <img src={ArticleImg} />
                    <div className="news-info courstard-regular"><span>tags</span> <span>date</span></div>
                </div>
                <div className="news-card">
                    <h1 className="coustard-regular"><a href="#">A title of an article</a></h1>
                    <img src={ArticleImg} />
                </div>
                <div className="news-card">
                    <h1 className="coustard-regular"><a href="#">A title of an article</a></h1>
                    <img src={ArticleImg} />
                </div>
                <div className="news-card">
                    <h1 className="coustard-regular"><a href="#">A title of an article</a></h1>
                    <img src={ArticleImg} />
           
                </div>
     
            </div>
        </div>

    )
}