//importo hook
import { createContext, useState } from "react";
//importo axios per le chiamate all'API
import axios from "axios";

//creo contesto globale per condividere i dati tra i vari componenti
export const GlobalContext = createContext();

//URL per i film di TMDb
const API_URL = "https://api.themoviedb.org/3/search/movie";
//mia API Key
const API_KEY = "b83200560a814e777b9a99f16ca582b0";

//creo provider del global context
const GlobalProvider = ({ children }) => {
    //creo stato per i film trovati
    const [movies, setMovies] = useState([]);

    //funzione per ricerca film
    const searchMovies = (query) => {
        if (!query) return; //se input vuoto non tornare nulla

        axios.get(API_URL, {
            params: {
                //mia API Key
                api_key: API_KEY,
                //testo scritto dall'utente
                query: query,
                //imposto lingua
                language: "it-IT",
            },
        })
            //se la richiesta ha successo, salvo i risultati nell'array "movies"
            .then((response) => {
                console.log("Risultati API:", response.data.results);
                setMovies(response.data.results);
            })
            //gestisco errore
            .catch((error) => {
                console.log("Errore nella ricerca del film:", error);
            });
    };

    return (
        //wrappo tutta l'app con il provider
        <GlobalContext.Provider value={{ movies, searchMovies }}>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalProvider };
