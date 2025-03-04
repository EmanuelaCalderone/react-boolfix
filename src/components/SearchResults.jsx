//importo react, GlobalContext e componente MovieCard
import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import MovieCard from "./MovieCard";

//definisco il componente
const SearchResults = () => {
    //recupero i risultati della ricerca da global context utilizzando useContext
    const { results } = useContext(GlobalContext);

    return (
        <div className="search-results">
            {/* verifico se ci sono risultati */}
            {results.length > 0 ? (
                //itero con map sui risultati e creo una card per ogni elemento trovato
                results.map((movie) => <MovieCard key={movie.id} movie={movie} />)
            ) : (
                //se non ci sono risultati, mostro messaggio
                <p>Non è stato trovato nessun film corrispondente alla ricerca.</p>
            )}
        </div>
    );
};

//esporto il componente
export default SearchResults;
