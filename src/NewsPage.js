import ArticleImg from "../assets/article/pexels-bigbagfilms-8512650.jpg"

import {useState} from "react";

export default function NewsPage () {

    const [filterOpen, setFiltersOpen] = useState(false);

    const onToggleFilters = (e) => {
        e.preventDefault();
        console.log("Click filter")
        setFiltersOpen(!filterOpen);
    }

    const onClearFilters = (e) => {
        e.preventDefault();
        console.log("Clearing search filters");
    }

    const onCloseFilters = (e) => {
        e.preventDefault();
        setFiltersOpen(false);

    }

    return (
        <div className="news-page">
            <div className="news-title-container">
                <h1 className="abril-fatface-regular">News</h1>
                <div>
                    <div className="search-filter-container">
                        <form>
                            <button onClick={onToggleFilters} ><i className="fa-solid fa-bars"></i></button>
                            <input aria-label="search" placeholder="Search News" type="text" />
                            <button type="submit"> <i className="fa-solid fa-magnifying-glass"></i></button>
                        </form>
                    </div>
                    <div id="search-filter-box" className={ filterOpen ? "search-filter-dropdown open" : "search-filter-dropdown"}>
                        <div>
                            <form>
                                <div className="filter-title">
                                    <h4 className="coustard-bold">Filters</h4>
                                    <button onClick={onCloseFilters}><i class="fa-solid fa-xmark"></i> </button>
                                </div>
                               
                                <div>
                                    <h5 className="coustard-bold">Dates:</h5>
                                    <label className="coustard-regular">From: 
                                        <input type="date" />
                                    </label>
                                    
                                    <label className="coustard-regular">To: 
                                         <input type="date" />
                                    </label>
                                   
                                </div>
                                <div>
                                    <h5 className="coustard-bold">Content Type:</h5>
                                    
                                    <label className="coustard-regular">
                                        <input type="checkbox" />
                                    Interviews </label>
                                  
                                    <label className="coustard-regular">
                                        <input type="checkbox" />
                                        Tour Dates</label>
                                    
                                    <label className="coustard-regular">  
                                        <input type="checkbox" />
                                        BTS Content
                                        </label>
                                </div>
                            </form>
                           <div className="clear-filter-btn">
                                <button onClick={onClearFilters} href="#"><i class="fa-solid fa-rotate-left"></i> Reset</button>
                           </div>
                        </div>
          
                    </div>
                </div>
  
   
            </div>
            <div className="news-container">
                <div className="news-card">
                    <h1 className="coustard-regular"><a href="#">A title of an article</a></h1>
                    <img src={ArticleImg} />
                    <div className="news-info courstard-regular"><p>tags</p> <p>date</p></div>
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