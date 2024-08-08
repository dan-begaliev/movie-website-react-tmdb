import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Ratings from "./Ratings";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { myMovieListAddAction, myMovieListRemoveAction } from "../redux/movieSlice";

const Movie = () => {
    const dispatch = useDispatch();
    const myMovieList = useSelector((state) => state.myMovieList);
    const params = useParams();
    const [selectedMovie, setSelectedMovie] = useState({});
    const [videoResponse, setVideoResponse] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const fetchMovieById = async (id) => {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: import.meta.env.VITE_API_KEY,
            },
        };

        fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
            .then((response) => response.json())
            .then((response) => {
                setSelectedMovie(response);
            })
            .catch((err) => console.error(err));
    };

    const fetchVideoById = async (id) => {
        const options = {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: import.meta.env.VITE_API_KEY,
            },
        };

        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${import.meta.env.VITE_API_KEY}&append_to_response=videos`, options)
            .then((response) => response.json())
            .then((response) => {
                setVideoResponse(response.results);
            })
            .catch((err) => console.error(err));
    };

    const saveToMovieList = (id, title) => {
        dispatch(myMovieListAddAction({ id, original_title: title }));
    };

    const removeMovieFromList = (id) => {
        dispatch(myMovieListRemoveAction(id));
    };

    const handleOnTrailerBtn = (id) => {
        setShowModal(true);
        fetchVideoById(id);
    };

    const isMovieBookmarked = (id) => {
        if (myMovieList?.filter((el) => el.id === id).length >= 1) return true;
        return false;
    };

    const getBookmark = () => {
        return isMovieBookmarked(selectedMovie.id) ? (
            <i
                onClick={() => {
                    removeMovieFromList(selectedMovie.id);
                }}
                className="bi bi-bookmark-check-fill"
                style={Styles.bookmarkIcon}
            />
        ) : (
            <i
                onClick={() => !isMovieBookmarked(selectedMovie.id) && saveToMovieList(selectedMovie.id, selectedMovie.original_title)}
                className="bi bi-bookmark-plus"
                style={Styles.bookmarkIcon}
            />
        );
    };

    useEffect(() => {
        fetchMovieById(params?.movieId);
    }, [params]);

    const Styles = {
        image: {
            width: "100%",
        },
        bookmarkIcon: {
            fontSize: "1.75rem",
        },
        bookmarkIconPosition: {
            position: "absolute",
            top: -4,
            right: 0,
        },
    };

    return (
        selectedMovie && (
            <div className="row">
                <div className="col-md-4">
                    <img src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`} style={Styles.image} />
                </div>

                <div className="col-md-8 bg-body-secondary p-3" style={{ position: "relative" }}>
                    {/* Title and Tagline */}
                    <h3 className="bold">
                        {selectedMovie.original_title}
                        <div style={Styles.bookmarkIconPosition}>{getBookmark()}</div>
                    </h3>

                    <h6 className="fw-light">{selectedMovie.tagline}</h6>

                    {/* Ratings */}
                    <Ratings movieRating={selectedMovie.vote_average} />

                    {/* Overview text */}
                    <div className="mt-3">
                        <h6 className="bold">Overview</h6>
                        <small>{selectedMovie.overview}</small>
                    </div>

                    {/* Genres */}
                    <div className="mt-3">
                        {selectedMovie.genres?.map((el) => (
                            <span key={el.id} className="badge text-bg-dark me-1">
                                {el.name}
                            </span>
                        ))}
                    </div>

                    {/* Watch Now button */}
                    <div className="mt-5">
                        <a href={selectedMovie.homepage} target={"blank"} className="btn btn-sm btn-outline-dark">
                            Watch Now <i className="bi bi-film"></i>
                        </a>
                        <button onClick={() => handleOnTrailerBtn(selectedMovie.id)} target={"blank"} className="btn btn-sm btn-outline-dark ms-2">
                            Trailer <i className="bi bi-play"></i>
                        </button>
                    </div>
                </div>
                {/** Youtube Modal */}
                {showModal && <Modal onClose={() => setShowModal(false)} videoId={videoResponse[0]?.key} />}
            </div>
        )
    );
};

export default Movie;
