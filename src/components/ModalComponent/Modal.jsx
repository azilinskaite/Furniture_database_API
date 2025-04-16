import React, { useState, useEffect } from "react";
import "./Modal.css";

function Modal({ isOpen, onClose, onSubmit, initialData, isEdit }) {
  // same as joi validation in the back-end
  const [formData, setFormData] = useState({
    category: "",
    photo: "",
    design_name: "",
    designer: "",
    materials: [],
    year_created: "",
    style: [],
    stock: "",
    brand: "",
    market_price: "",
  });

  // show initial data when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        materials: initialData.materials || [],
        style: initialData.style || [],
      });
    }
  }, [initialData]);

  // closing modal with esc button
  useEffect(() => {
    if (!isOpen) return;
  
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // treat materials and style as arrays
    if (name === "materials" || name === "style") {
      setFormData({
        ...formData,
        [name]: value.split(",").map((item) => item.trim()),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content" role="dialog">
        <div className="modal-header">
          <h3>Add New Item</h3>
          <button className="close-btn" onClick={onClose} aria-label="Close">
          &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Category:
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              autoFocus
            >
              <option value="">Select a category</option>
              <option value="lamps">Lamps</option>
              <option value="chairs">Chairs</option>
              <option value="sofas">Sofas</option>
            </select>
          </label>
          <label>
            Photo URL:
            <input
              type="text"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Design Name:
            <input
              type="text"
              name="design_name"
              value={formData.design_name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Designer:
            <input
              type="text"
              name="designer"
              value={formData.designer}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Materials:
            <input
              type="text"
              name="materials"
              value={formData.materials.join(", ")}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Year Created:
            <input
              type="number"
              name="year_created"
              value={formData.year_created}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Style:
            <input
              type="text"
              name="style"
              value={formData.style.join(", ")}
              onChange={handleChange}
            />
          </label>
          <label>
            Stock:
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            />
          </label>
          <label>
            Brand:
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
            />
          </label>
          <label>
            Market Price:
            <input
              type="number"
              name="market_price"
              value={formData.market_price}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">{isEdit ? "Save Changes" : "Submit"}</button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
