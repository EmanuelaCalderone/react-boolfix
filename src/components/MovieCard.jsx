//importo react
import React from 'react';

//definisco componente MovieCard
const MovieCard = ({ movie }) => {
    if (!movie) {
        console.error("Errore: movie undefined!");
        return null;
    }

    return (
        <div className="movie-card">
            {/* titolo */}
            <h3>{movie.title}</h3>
            {/* titolo originale */}
            <p>Titolo originale: {movie.originalTitle}</p>
            {/* lingua */}
            <p>
                Lingua: {movie.original_language}
                {movie.flag && (
                    <img
                        src={movie.flag}
                        alt={`Bandiera di ${movie.original_language}`}
                        onError={(e) => (e.target.style.display = "none")}
                        style={{ width: "20px", height: "15px", marginLeft: "5px" }}
                    />
                )}
            </p>

            {/* voto */}
            <p>{movie.voteAverage ? `Voto: ${movie.voteAverage}` : 'Voto non disponibile'}</p>
        </div >
    )
};

//esporto il componente
export default MovieCard;