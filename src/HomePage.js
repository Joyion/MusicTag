import RoseImg from "../assets/rose-shape.png";
import SaxPlayerImg from "../assets/konstantin-aal-Otx5FHbr3OE-unsplash.jpg";
import DjImg from "../assets/pexels-mwabonje-1694908.jpg";
import GuitarImg from "../assets/pexels-yankrukov-9009574.jpg";

export const HomePage = () => {
    return (
        <div>
            <section className="title-container">
                <div className="main-title">
                    <h1>Black Rose Records</h1>
                </div>
                <div className="img-collage-container">
                    <img src={DjImg} />
                    <img src={SaxPlayerImg} />
                    <img src={GuitarImg} />
                </div>
            </section>

            <section className="featured-container">
                <section className="featured-artists">
                    <h2>Artists Who Push Boundaries</h2>
                </section>
            </section>



            <section className="card-section">
                <div className="title-sect">
                    <div className="subtitle-block">
                        <div>
                            <h2>Latest News</h2>
                        </div>
                    </div>
                </div>

                <div className="cards">
                    <ul>
                        <li>
                            <div>
                                <h4>NeverLand discusses their new album Renegade</h4>
                            </div>
                        </li>
                        <li>
                            <div>
                                <h4>Kiss X favorite releases this year</h4>

                            </div>
                        </li>
                        <li>
                            <div>
                                <h4>Antonio's favorite guitar solos</h4>
                            </div>
                        </li>
                        <li>
                            <div>
                                <h4>NeverLand discusses their new album Renegade</h4>
                            </div>
                        </li>
                        <li>
                            <div>
                                <h4>Kiss X favorite releases this year</h4>

                            </div>
                        </li>
                        <li>
                            <div>
                                <h4>Antonio's favorite guitar solos</h4>
                            </div>
                        </li>
                    </ul>
                </div>
            </section >


            <section className="card-section">
                <div className="title-sect">
                    <div className="subtitle-block">
                        <div>
                            <h2>Latest Releases</h2>
                        </div>
                    </div>
                </div>

                <div className="cards">
                    <ul>
                        <li>
                            <div>
                                <h4>Renegade</h4>
                                <p>Neverland</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <h4>Lost At Sea</h4>
                                <p>Xavi</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <h4>Dark Is The Night</h4>
                                <p>Twin Towers</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <h4>Renegade</h4>
                                <p>Neverland</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <h4>Lost At Sea</h4>
                                <p>Xavi</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <h4>Dark Is The Night</h4>
                                <p>Twin Towers</p>
                            </div>
                        </li>

                    </ul>
                </div>
            </section>

            <section className="search-container">
                <div className="title-container">
                    <h2>Find the perfect song</h2>
                    <div>
                        <p>Whether it's for your film, podcast, or just for your own listening pleasure.
                            Our catalog has thousands of songs to choose from many genres.
                            We also have artists available to compose music for any type of project
                        </p>
                    </div>

                    <div>
                        <form>
                            <input
                                aria-label="song-search"
                                name="song-search"
                                placeholder="Search by Artists, Track Name, Genre or mood"
                            />
                            <button aria-label="find songs" type="submit">Find Songs</button>
                        </form>
                    </div>
                </div>
            </section>

            <footer>
                <p><a href="#">Contact Us</a> | <a href="#">Demo Submission</a> </p>
                <p>Black Rose Records@2025</p>
            </footer>

        </div >

    )
}