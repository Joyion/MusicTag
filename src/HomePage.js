import RoseImg from "../assets/rose-shape.png";
import SaxPlayerImg from "../assets/imageCollage/konstantin-aal-Otx5FHbr3OE-unsplash.jpg";
import DjImg from "../assets/imageCollage/pexels-mwabonje-1694908.jpg";
import GuitarImg from "../assets/imageCollage/pexels-yankrukov-9009574.jpg";
import AlbumCover from "../assets/albumCovers/photo-1474204075013-fafcfee9bfd7.jpeg";
import ArticleCover from "../assets/article/pexels-mufasa-1358817.jpg";
import featuredArtist1 from "../assets/artistProfile/aaron-blanco-tejedor--GsPtETXbfo-unsplash.jpg";
import featuredArtist2 from "../assets/artistProfile/alfonso-scarpa-2LGx4cQAMks-unsplash.jpg";
import featuredArtist3 from "../assets/artistProfile/nereid-ndreu-2NU-oCGRNzw-unsplash.jpg";

export default function HomePage() {
    return (
        <div>
            <section className="title-container">
                <div className="main-title">
                    <h1 className="abril-fatface-regular">Black Rose Records</h1>
                </div>
                <div className="image-collage-container">
                    <img src={DjImg} />
                    <img src={SaxPlayerImg} />
                    <img src={GuitarImg} />
                </div>
            </section>

            <section className="featured-artists">
                <h2 className="abril-fatface-regular">Artists who push boundaries</h2>
                <p className="coustard-regular">
                    At the heart of our creative universe lies an uncompromising vision: to champion creators who defy genre constraints and rewrite the sonic landscape. We don't just welcome diversity—we celebrate the audacious spirits who transform sound into revolutionary art, blurring lines between electronic, rock, hip-hop,
                    classical, and every unexplored territory in between. Our label is a sanctuary for the unapologetically innovative,
                    where musical boundaries are not just crossed, but completely dismantled.
                </p>
                <ul>
                    <li className="artist-card">
                        <img src={featuredArtist1} />
                        <a className="coustard-regular">Artists 1</a>
                    </li>
                    <li className="artist-card">
                        <img src={featuredArtist2} />
                        <a className="coustard-regular">Artists 1</a>
                    </li>
                    <li className="artist-card">
                        <img src={featuredArtist3} />
                        <a className="coustard-regular">Artists 1</a>
                    </li>
                    <li className="artist-card">
                        <img src={featuredArtist1} />
                        <a className="coustard-regular">Artists 1</a>
                    </li>
                    <li className="artist-card">
                        <img src={featuredArtist2} />
                        <a className="coustard-regular">Artists 1</a>
                    </li>
                </ul>
            </section>

            <section className="featured-news">
                <div className="featured-title">
                    <div>
                        <h2 className="abril-fatface-regular">Latest News</h2>
                    </div>
                </div>
                <ul className="article-section">
                    <li className="article-card">
                        <a className="coustard-regular">Title 234j32rjk  l;jf;d</a>
                        <img src={AlbumCover} />
                    </li>
                    <li className="article-card">
                        <a className="coustard-regular">This an article jsfjsf</a>
                        <img src={ArticleCover} />
                    </li>
                    <li className="article-card">
                        <a className="coustard-regular">Blah Blah</a>
                        <img src={AlbumCover} />
                    </li>
                    <li className="article-card">
                        <a className="coustard-regular">Section has a tast of this</a>
                        <img src={ArticleCover} />
                    </li>
                    <li className="article-card">
                        <a className="coustard-regular">We can do it</a>
                        <img src={AlbumCover} />
                    </li>
                    <li className="article-card">
                        <a className="coustard-regular">A susper long title whathat about</a>
                        <img src={AlbumCover} />
                    </li>
                </ul>
                <div className="view-all">
                    <a href="#" className="abril-fatface-regular">View All News</a>
                </div>
            </section>

            <section className="featured-releases">
                <div className="featured-title">
                    <div>
                        <h2 className="abril-fatface-regular">Latest Releases</h2>
                    </div>
                </div>
                <ul className="article-section">
                    <li className="article-card">
                        <a className="coustard-regular">Title 234j32rjk  l;jf;d</a>
                        <img src={AlbumCover} />
                        <p className="coustard-regular">Artists Name</p>
                    </li>
                    <li className="article-card">
                        <a className="coustard-regular">This an article jsfjsf</a>
                        <img src={ArticleCover} />
                        <p className="coustard-regular">Artists Name</p>
                    </li>
                    <li className="article-card">
                        <a className="coustard-regular">Blah Blah</a>
                        <img src={AlbumCover} />
                        <p className="coustard-regular">Artists Name</p>
                    </li>
                    <li className="article-card">
                        <a className="coustard-regular">Section has a tast of this</a>
                        <img src={ArticleCover} />
                        <p className="coustard-regular">Artists Name</p>
                    </li>
                    <li className="article-card">
                        <a className="coustard-regular">We can do it</a>
                        <img src={AlbumCover} />
                        <p className="coustard-regular">Artists Name</p>

                    </li>
                    <li className="article-card">
                        <a className="coustard-regular">A susper long title whathat about</a>
                        <img src={AlbumCover} />
                        <p className="coustard-regular">Artists Name</p>
                    </li>
                </ul>
                <div className="view-all">
                    <a href="#" className="abril-fatface-regular">View All Releases</a>
                </div>
            </section>





            <section className="home-search-container">
                <div className="search-content">
                    <h2 className="abril-fatface-regular" >Find the perfect song</h2>
                    <div className="search-description">
                        <p className="coustard-regular">Whether it's for your film, podcast, or just for your own listening pleasure.
                            Our catalog has thousands of songs to choose from many genres.
                            We also have artists available to compose music for any type of project.
                        </p>
                    </div>

                    <div className="search-form-container">
                        <form>
                            <input
                                aria-label="Search Our Catalog"
                                type="search"
                                placeholder="Search Our Catalog" />
                            <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                        </form>
                    </div>
                </div>
            </section>

            <footer>
                <div>
                    <p className="coustard-regular"><a href="#">Contact Us</a> | <a href="#">Demo Submission</a> </p>
                </div>


                <p className="coustard-regular">Black Rose Records@2025</p>
            </footer>

        </div >

    )
}
