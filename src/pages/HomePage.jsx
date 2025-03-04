//importo react e i componenti
import React from "react";
import SearchResults from "../components/SearchResults";

//definisco componente HomePage
const HomePage = () => {
    return (
        <div>
            {/* lista risultati */}
            <SearchResults />
        </div>
    );
};

//esporto il componente
export default HomePage;
