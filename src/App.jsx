//importo hook
import { useState, useContext } from "react";
//importo GlobalContext
import { GlobalContext } from "./context/GlobalContext";
//importo l'header
import Header from "./components/Header";
//importo la barra di ricerca
import SearchBar from "./components/SearchBar";
//import './App.css'

//componente principale App
const App = () => {
  //recupero i film da GlobalContext
  const { movies } = useContext(GlobalContext);
  //definisco stato per verificare se l'utente ha già fatto una ricerca
  const [searched, setSearched] = useState(false);

  //funzione per la ricerca
  const handleSearch = (query) => {
    if (query.trim() !== "") {
      //aggiorno lo stato solo se l'utente ha inserito qualcosa
      setSearched(true);
    }
  };

  return (
    //div principale pagina
    <div>
      {/* //titolo */}
      <h1>BOOLFIX</h1>
      {/* passo la funzione handleSearch come prop a SearchBar */}
      <SearchBar onSearch={handleSearch} />

      {/* mostro la lista degli eventuali film trovati */}
      {movies.length > 0 ? (
        <ul>
          {/* itero su tutti i film trovati */}
          {movies.map((movie) => (
            //mostro titolo, titolo originale, lingua e voto
            <li key={movie.id}>
              {movie.title} - {movie.original_title} ({movie.original_language}) {movie.vote_average}
            </li>
          ))}
        </ul>
      ) : searched ? (
        //se non ci sono risultati, mostro un messaggio
        <p>Non è stato trovato nessun film corrispondente alla ricerca</p>
      ) : null}
    </div>
  );
};

export default App;
