//importo hook
import { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

//definisco componente (barra+input)
const SearchBar = ({ onSearch }) => {
    //salvo input utente
    const [query, setQuery] = useState("");
    //uso la funzione da GlobalContext
    const { searchMovies } = useContext(GlobalContext);

    //funzione che verrà chiamata quando l'utente clicca sulla barra
    const handleSearch = () => {
        //se l'input non è vuoto
        if (query.trim() !== "") {
            //chiamo la funzione per cercare i film
            searchMovies(query);
            if (onSearch) {
                onSearch(query);
            }
        }
    };

    return (
        //div che contiene la barra di ricerca
        <div>
            <input
                type="text"
                placeholder="Cerca un film o una serie TV"
                //gestisco con lo stato query il valore dell'input        
                value={query}
                //aggiorno query mentre l'utente scrive    
                onChange={(e) => setQuery(e.target.value)}
            />
            {/*pulsante 'Cerca'*/}
            <button onClick={handleSearch}>Cerca</button>
        </div>
    );
};

//esporto il componente
export default SearchBar;
