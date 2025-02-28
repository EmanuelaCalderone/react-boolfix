//importo la barra di ricerca
import SearchBar from "./SearchBar";

//definisco il componente
const Header = () => {
    return (
        //creo elemento <header> con logo e barra di ricerca
        <header className="header">
            <h1 className="logo">BOOLFIX</h1>
            <SearchBar />
        </header>
    );
};

export default Header;
