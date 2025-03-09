import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

//definisco componente MovieCard
const MovieCard = ({ movie }) => {
    if (!movie) {
        console.error("Errore: movie undefined!");
        return null;
    }

    //URL per le immagini
    const baseImgUrl = "https://image.tmdb.org/t/p/";

    //dimensione immagine (puoi cambiarla in base alle tue necessità)
    const imgSize = "w342";

    //URL della copertina
    const posterUrl = movie.posterPath
        ? `${baseImgUrl}${imgSize}${movie.posterPath}`
        : null;

    //calcolo delle stelle (arrotondato per eccesso)
    const rating = movie.voteAverage ? Math.ceil(movie.voteAverage / 2) : 0;
    //numero massimo di stelle che possono essere mostrate
    const maxStars = 5;

    return (
        <div className="movie-card">
            {/*copertina del film */}
            {posterUrl ? (
                <img
                    src={posterUrl}
                    alt={movie.title}
                    className="movie-poster"
                />
            ) : (
                <p>Immagine non disponibile</p>
            )}
            {/*titolo */}
            <h3>{movie.title}</h3>
            {/*titolo originale */}
            <p>Titolo originale: {movie.originalTitle || "Non disponibile"}</p>
            {/*lingua e bandiera */}
            <p>
                Lingua: {movie.language}
                {movie.flag && (
                    <img
                        src={movie.flag}
                        alt={`Bandiera di ${movie.language}`}
                        onError={(e) => (e.target.style.display = "none")}
                        style={{ width: "20px", height: "15px", marginLeft: "5px" }}
                    />
                )}
            </p>

            {/*voto + stelle */}
            <p>Voto:</p>
            <div className="stars">
                {[...Array(maxStars)].map((_, index) => (
                    <span key={index} className={index < rating ? "star filled" : "star"}>
                        <FontAwesomeIcon icon={faStar} />
                    </span>
                ))}
            </div>
        </div>
    );
};

//esporto il componente
export default MovieCard;
