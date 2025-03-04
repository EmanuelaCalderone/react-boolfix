//importo hook
import { createContext, useState } from "react";
//importo axios per le chiamate all'API
import axios from "axios";

//creo contesto globale per condividere i dati tra i vari componenti
export const GlobalContext = createContext();

//URL per i film di TMDb
const API_URL_MOVIES = "https://api.themoviedb.org/3/search/movie";
//URL per le serie TV di TMDb
const API_URL_SERIES = "https://api.themoviedb.org/3/search/tv";
//mia API Key
const API_KEY = "b83200560a814e777b9a99f16ca582b0";

//lingue
const lang = {
    en: "gb",
    it: "it",
    fr: "fr",
}

//funzione per visualizzare la bandiera
const showFlag = (languageCode) => {
    //restituisco icona mondo se non trova codice lingua
    if (!languageCode) return "/world-icon.png";

    //verifico se esiste il codice della lingua ed eventualmente uso il valore corrispondente
    const countryCode = lang[languageCode] || languageCode;
    //restituisco URL bandiera
    const flagUrl = `https://flagcdn.com/w40/${countryCode}.png`;
    //restituisco bandiera se esistente, altrimenti icona mondo
    return flagUrl;
}

//creo provider del global context
const GlobalProvider = ({ children }) => {
    //creo stato per i risultati trovati
    const [results, setResults] = useState([]);

    //funzione per ricerca film e serie tv
    const searchMedia = (query, language = "it-IT") => {
        if (!query) return; //se input vuoto non tornare nulla

        //chiamata per i film
        axios.get(API_URL_MOVIES, {
            params: {
                //mia API Key
                api_key: API_KEY,
                //testo scritto dall'utente
                query: query,
                //imposto lingua
                language: language,
            },
        })
            //se la richiesta ha successo, salvo i risultati nell'array "results"
            .then((response) => {
                console.log("Risultati Film:", response.data.results);

                const movies = response.data.results.map(movie => ({
                    id: movie.id,
                    title: movie.title,
                    originalTitle: movie.original_title,
                    language: movie.original_language,
                    //aggiungo flag
                    flag: showFlag(movie.original_language),
                    posterPath: movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : "https://via.placeholder.com/500x750?text=No+Image",
                    voteAverage: movie.vote_average || "Voto non disponibile",
                    type: "movie",
                }));

                //seconda chiamata per serie TV
                axios.get(API_URL_SERIES, {
                    params: {
                        api_key: API_KEY,
                        query: query,
                        language: language,
                    },
                })
                    //se la richiesta ha successo, salvo i risultati nell'array "tvSeries"
                    .then((tvResults) => {

                        const tvSeries = tvResults.data.results.map(series => ({
                            id: series.id,
                            title: series.name,
                            originalTitle: series.original_name,
                            language: series.original_language,
                            flag: showFlag(series.original_language),
                            posterPath: series.poster_path
                                ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
                                : null,
                            type: "tv",
                        }));

                        //aggiorno stato film e serie TV trovati
                        setResults([...movies, ...tvSeries])
                    })
                    //gestione errori ricerca serie
                    .catch((seriesError) => {
                        //in caso di ricerca serie fallita, mostro i film
                        setResults(movies);
                    });

            })
            //gestione errori ricerca film
            .catch((moviesError) => {
                console.log("Errore nella ricerca dei film:", moviesError);
                //in caso di ricerca film fallita, mostro le serie
                axios.get(API_URL_SERIES, {
                    params: {
                        api_key: API_KEY,
                        query: query,
                        language: language,
                    },
                })
                    .then((tvResults) => {
                        console.log("Risultati serie TV:", tvResults.data.results);

                        const tvSeries = tvResults.data.results.map((series) => ({
                            id: series.id,
                            title: series.name,
                            originalTitle: series.original_name,
                            language: series.original_language,
                            flag: showFlag(series.original_language),
                            posterPath: series.poster_path
                                ? `https://image.tmdb.org/t/p/w500${series.poster_path}`
                                : null,
                            type: "tv",
                        }));

                        setResults(tvSeries);
                    })
                    .catch((seriesError) => {
                        console.log("Errore nella ricerca delle serie TV:", seriesError);
                    });
            });
    };

    return (
        //wrappo tutta l'app con il provider
        <GlobalContext.Provider value={{ results, searchMedia }}>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalProvider };
