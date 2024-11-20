import RoseImg from "../assets/rose-shape.png";
import SaxPlayerImg from "../assets/konstantin-aal-Otx5FHbr3OE-unsplash.jpg";
import DjImg from "../assets/pexels-mwabonje-1694908.jpg";
import GuitarImg from "../assets/pexels-yankrukov-9009574.jpg";

export const HomePage = () => {
    return (
        <div>
            <div className="container">
                <div className="main-title">
                    <h1>Black Rose Records</h1>
                </div>

                <p className="sub-title">Jazz. Electronic. Classical</p>

                <div className="img-collage-container">
                    <img src={SaxPlayerImg} />
                    <img src={DjImg} />
                    <img src={GuitarImg} />
                </div>
                <div className="main-title">
                    <h2>we're a <span>Record Label, Publisher</span> and <span>Music Library</span></h2>
                    {/* <h1 className="main-title">Publisher <span>and</span></h1> */}
                    <h2>specliazing in <span>JAZZ, Eletronic </span>and <span>Classical music</span></h2>
                    <h2>with <span>thousand of songs</span> from...</h2>
                    {/* <h1 className="main-title">of songs from...</h1> */}
                </div>

            </div>
            <div className="dark-container">
                <h1>Artists Who Push Boundaries</h1>
            </div>
            <div>
                <h2>Latest News</h2>
                <ul>
                    <li>Article Card 1</li>
                    <li>Article Card 2</li>
                    <li>Article Card 3</li>
                </ul>
            </div>
            <div>
                <h2>Latest Releases</h2>
                <ul>
                    <li>Article Card 1</li>
                    <li>Article Card 2</li>
                    <li>Article Card 3</li>
                </ul>
            </div>
            <div>
                <h2>Search Our Catalog</h2>
            </div>
        </div>

    )
}