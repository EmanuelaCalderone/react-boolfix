//importo react
import React from "react";
//importo ReactDom per il render dell'app
import ReactDOM from "react-dom/client";
//BrowserRouter per gestire la navigazione con React Router
import { BrowserRouter } from "react-router-dom";
//globalProvider per wrappare l'app con GlobalContext
import { GlobalProvider } from "./context/GlobalContext.jsx";
///importo componente principale app
import App from "./App.jsx";
//importo il css
import "./index.css";

//renderizzo l'app react dentro l'elemento con id 'root'
ReactDOM.createRoot(document.getElementById("root")).render(
  //wrappo tutta l'app per la gestione della negivazione tra le pagine
  <BrowserRouter>
    {/* //wrappo tutta l'app per far accedere al GlobalContext a tutti i componenti */}
    <GlobalProvider>
      {/* //componente principale app */}
      <App />
    </GlobalProvider>
  </BrowserRouter>
);
