import React, { useState } from "react";
import "./App.css";
import "./index.css";
import ItemsContainer from "./components/ItemsContainerComponent/ItemsContainer";
import Menu from "./components/MenuComponent/Menu";
import AddButton from "./components/AddButtonComponent/AddButton";

function App() {
  const [filterCategory, setFilterCategory] = useState("all");
  return (
    <>
      <header>
        <h1>DATABASE <br/> FURNITURE</h1>
      </header>
      <main>
        <Menu setFilterCategory={setFilterCategory} />
        <AddButton />
        <ItemsContainer filterCategory={filterCategory}/>
      </main>
      <footer className="footer">
        <div className="credit">Furniture Database ©2025</div>
      </footer>
    </>
  );
}

export default App;
