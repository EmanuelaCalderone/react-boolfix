//importo hook
import { useState, useContext } from "react";
//importo GlobalContext
import { GlobalContext } from "./context/GlobalContext";
//importo l'header
import Header from "./components/Header";
//importo la barra di ricerca
import SearchBar from "./components/SearchBar";
// Importo SearchResults
import SearchResults from "./components/SearchResults";
//import './App.css'

//componente principale App
const App = () => {
  //recupero i film da GlobalContext
  const { results } = useContext(GlobalContext);
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
      {/* //header */}
      <Header />
      {/* mostro la lista degli eventuali film trovati */}
      {results.length > 0 ? (
        <SearchResults />
      ) : searched ? (
        <p>Non è stato trovato nessun film corrispondente alla ricerca</p>
      ) : null}
    </div>
  );
};

export default App;
