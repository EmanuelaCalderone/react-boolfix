//importo gli hook e il contesto globale
import { useState, useContext } from "react";
//importo GlobalContext per poter accedere ai risultati della ricerca
import { GlobalContext } from "./context/GlobalContext";
//importo il componente Header
import Header from "./components/Header";
//importo la barra di ricerca
import SearchBar from "./components/SearchBar";
//importo SearchResults per visualizzare i risultati della ricerca
import SearchResults from "./components/SearchResults";

//componente principale App
const App = () => {
  //recupero i risultati della ricerca dal GlobalContext
  const { results } = useContext(GlobalContext);

  //stato per verificare se l'utente ha già fatto una ricerca
  const [searched, setSearched] = useState(false);

  //funzione per gestire la ricerca
  const handleSearch = (query) => {
    // se l'input non è vuoto, aggiorno lo stato di "searched"
    if (query.trim() !== "") {
      setSearched(true);
    }
  };

  return (
    <div>
      {/* header che include la barra di ricerca */}
      <Header />
      {/* se ci sono risultati, mostro i risultati della ricerca */}
      {results.length > 0 ? (
        <SearchResults />
      ) : searched ? (

        <p>Non è stato trovato nessun film corrispondente alla ricerca</p>
      ) : null}
    </div>
  );
};

export default App;
