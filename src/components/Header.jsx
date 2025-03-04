//importo la barra di ricerca
import SearchBar from "./SearchBar";

//definisco il componente
const Header = () => {
    return (
        //creo elemento <header> con logo e barra di ricerca
        <header className="header">

            <div className="logo">
                <h1 className="logoName">BOOLFIX</h1>
            </div>

            <div className="search">
                <SearchBar />
            </div>

        </header>
    );
};

export default Header;
