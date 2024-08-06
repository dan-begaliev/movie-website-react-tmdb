import { Link } from "react-router-dom";
import "./App.css";
import { useDispatch } from "react-redux";
import { selectedCategoryAction } from "./redux/movieSlice";

function App() {
    const dispatch = useDispatch();
    const buttonConfig = [
        { name: "Discover", code: "discover" },
        { name: "Now Playing", code: "now_playing" },
        { name: "Popular", code: "popular" },
        { name: "Top Rated", code: "top_rated" },
        { name: "Upcoming", code: "upcoming" },
    ];
    const Styles = { btn: { padding: "4rem", width: "100%" } };

    const setSelectedMovieCategory = (categoryName, categoryCode) => {
        dispatch(selectedCategoryAction({ name: categoryName, code: categoryCode }));
    };

    return (
        <div className="container">
            <div className="row mt-5">
                {buttonConfig.map((btn, i) => {
                    return (
                        <div key={i} className="col-md-4 mb-3">
                            <Link
                                to={"/movies"}
                                onClick={() => setSelectedMovieCategory(btn.name, btn.code)}
                                className="btn btn-dark"
                                style={Styles.btn}>
                                {btn.name}
                            </Link>
                        </div>
                    );
                })}
                <div className="col-md-4 mb-3">
                    {/* <Link
                        to={"/movies"}
                        onClick={() => setSelectedMovieCategory("My List", "my_list")}
                        className="btn btn-success"
                        style={Styles.btn}>
                        My List
                    </Link> */}
                </div>
            </div>
        </div>
    );
}

export default App;
