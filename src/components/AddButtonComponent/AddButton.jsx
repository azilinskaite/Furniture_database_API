import React, { useState } from "react";
import "./AddButton.css";
import Modal from "../ModalComponent/Modal";

function AddButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const submitForm = async (data) => {
    try {
        // excluding category, because it's not part of the data passed to back end
        const category = data.category; 
        const { category: _, ...dataWithoutCategory } = data; 
      const response = await fetch(
        `http://localhost:3000/api/items/${category}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataWithoutCategory),
        }
      );

      if (response.ok) {
        alert("Item added successfully!");
      } else {
        const errorData = await response.json();
        alert(`Failed to add item: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred.");
    }
  };

  return (
    <>
      <button type="button" className="add-new-btn" onClick={openModal}>
        ADD NEW ITEM
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={submitForm} />
    </>
  );
}

export default AddButton;
