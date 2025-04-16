import "./ItemCard.css";

function ItemCard({ item, onEdit, onDelete }) {
  return (
    <div className="item-card">
      <div className="item-headline">
        <h2>{item.design_name}</h2>
        <h3>{item.designer}</h3>
      </div>
      <div className="img-container">
        <img src={item.photo} alt={item.design_name} />
      </div>
      <div className="item-details">
        <ul>
        <li>
            <h4>Materials:</h4>
            <p>{item.materials.join(", ")}</p>
          </li>
          <li>
            <h4>Year Created:</h4>
            <p>{item.year_created}</p>
          </li>
          {item.style && (
            <li>
              <h4>Style:</h4>
              <p>{item.style.join(", ")}</p>
            </li>
          )}
          {item.stock && (
            <li>
              <h4>Stock:</h4>
              <p>{item.stock}</p>
            </li>
          )}
          {item.brand && (
            <li>
              <h4>Brand:</h4>
              <p>{item.brand}</p>
            </li>
          )}
          {item.market_price && (
            <li>
              <h4>Market Price:</h4>
              <p>{item.market_price}€</p>
            </li>
          )}
        </ul>
        <button type="button" className="remove-btn" onClick={() => onDelete(item._id)}>Remove</button>
        <button
        type="button"
        className="edit-btn"
        onClick={() => onEdit(item)}
      >
        Edit
      </button>
      </div>
    </div>
  );
}

export default ItemCard;
