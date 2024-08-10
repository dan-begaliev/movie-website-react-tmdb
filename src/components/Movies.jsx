import { useEffect, useState } from "react";
import { Link, NavLink, useOutlet } from "react-router-dom";
import Pagination from "./Pagination";
import { useDispatch, useSelector } from "react-redux";
import { updateMyMovieListFromDb } from "../redux/movieSlice";
import { getMovieList } from "../firebase";

const Movies = () => {
    const dispatch = useDispatch();
    const movieCategory = useSelector((state) => state.selectedCategory);
    const myMovieList = useSelector((state) => state.myMovieList); // 5
    // useState store local state/data
    const [moviesList, setMoviesList] = useState([]); // 5
    const [currentPage, setCurrentPage] = useState(1);

    const fetchMovies = async () => {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: import.meta.env.VITE_API_KEY,
            },
        };

        const fetchData = async () => {
            const fromDb = await getMovieList();
            dispatch(updateMyMovieListFromDb(fromDb));
        };

        if (movieCategory.code === "my_list") {
            fetchData();
        } else if (movieCategory.code === "discover") {
            fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${currentPage}&sort_by=popularity.desc`, options)
                .then((response) => response.json())
                .then((response) => {
                    setMoviesList(response.results);
                })
                .catch((err) => console.error(err));
        } else {
            fetch(`https://api.themoviedb.org/3/movie/${movieCategory.code}?language=en-US&page=${currentPage}`, options)
                .then((response) => response.json())
                .then((response) => setMoviesList(response.results))
                .catch((err) => console.error(err));
        }
    };

    useEffect(() => {
        movieCategory.code === "my_list" && setMoviesList(myMovieList);
    }, [movieCategory.code, myMovieList]);

    useEffect(() => {
        fetchMovies();
    }, [currentPage]);

    const outlet = useOutlet();

    const toast = () => {
        return (
            <div className="toast align-items-center text-bg-dark border-0" style={{ display: "block" }}>
                <div className="d-flex">
                    <div className="toast-body">Please select a movie.</div>
                    <button type="button" className="btn-close btn-close-white me-2 m-auto" aria-label="Close"></button>
                </div>
            </div>
        );
    };

    const renderSingleMovie = () => {
        if (moviesList?.length === 0) {
            return <p>No Movies</p>;
        }
        return outlet || toast();
    };

    return (
        <div className="container p-2">
            <h3>
                {movieCategory.name}
                <Link to="/" className="btn btn-sm btn-dark ms-2">
                    Go Home
                </Link>
            </h3>

            <div className="row">
                <div className="col-md-3 ">
                    <div className="d-flex flex-column">
                        {moviesList?.length > 0 &&
                            moviesList.map((el, i) => {
                                return (
                                    <NavLink key={i} to={`/movies/${el.id}`} className={"btn btn-sm btn-outline-dark mb-1 w-100"}>
                                        <p className="m-0 pe-2 text-truncate text-start">{el.original_title}</p>
                                    </NavLink>
                                );
                            })}
                    </div>

                    {/* Pagination */}
                    {moviesList?.length > 0 && <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={200} />}
                </div>

                <div className="col-md-9">{renderSingleMovie()}</div>
            </div>
        </div>
    );
};

export default Movies;
