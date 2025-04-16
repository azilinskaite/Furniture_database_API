import React, { useState, useEffect } from "react";
import ItemCard from "../ItemCardComponent/ItemCard";
import Modal from "../ModalComponent/Modal";
import "./ItemsContainer.css";

function ItemsContainer({ filterCategory }) {
  const [items, setItems] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  const callTheApi = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/items");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    callTheApi();
  }, []);

  const handleEdit = (item) => {
    setItemToEdit(item);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (updatedData) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/items/${itemToEdit._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );
      if (response.ok) {
        // Update local state
        setItems(
          items.map((item) =>
            item._id === itemToEdit._id ? { ...item, ...updatedData } : item
          )
        );
      } else {
        const errorData = await response.json();
        alert(`Failed to update item: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error updating item:", error);
      alert("An error occurred.");
    }
    setIsEditModalOpen(false);
    setItemToEdit(null);
  };

  const handleEditClose = () => {
    setIsEditModalOpen(false);
    setItemToEdit(null);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/items/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // removing deleted item from the state
        setItems(items.filter((item) => item._id !== id));
      } else {
        const errorData = await response.json();
        console.error("Failed to delete item:", errorData.error);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const filteredItems =
  filterCategory === "all"
    ? items
    : items.filter((item) => item.category === filterCategory);

return (
  <section className="items-container">
    {filteredItems.map((item) => (
      <ItemCard
        key={item._id}
        item={item}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    ))}
    <Modal
      isOpen={isEditModalOpen}
      onClose={handleEditClose}
      onSubmit={handleEditSubmit}
      initialData={itemToEdit}
      isEdit={true}
    />
  </section>
);

}

export default ItemsContainer;
