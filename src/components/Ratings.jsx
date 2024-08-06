const Ratings = (props) => {
    const { movieRating } = props;

    const getRatings = (vote) => {
        const stars = [];
        const finalRoundedRating = Math.round(vote * 10) / 10;
        const filledStars = Math.floor(finalRoundedRating);
        const hasHalfStar = finalRoundedRating % 1 !== 0;

        for (let i = 0; i < filledStars; i++) {
            stars.push("star-fill");
        }

        if (hasHalfStar) stars.push("star-half");

        while (stars.length < 10) {
            stars.push("star");
        }

        return (
            <div>
                <small> {finalRoundedRating} </small>
                <small>
                    {stars.map((star, i) => {
                        return <i key={i} className={`bi bi-${star}`}></i>;
                    })}
                </small>
            </div>
        );
    };

    return getRatings(movieRating);
};

export default Ratings;
