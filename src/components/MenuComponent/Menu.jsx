import React, { useState, useEffect } from "react";
import "./Menu.css";

function Menu({ setFilterCategory }) {
  const [categories, setCategories] = useState([]);

  const callTheApi = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/items");
      const data = await response.json();

      const uniqueCategories = [...new Set(data.map((item) => item.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    callTheApi();
  }, []);

  return (
    <nav>
      <ul>
      <li onClick={() => setFilterCategory('all')}>All</li>
      {categories.map((category, index) => (
          <li key={index} onClick={() => setFilterCategory(category)}>
            {category}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Menu;
