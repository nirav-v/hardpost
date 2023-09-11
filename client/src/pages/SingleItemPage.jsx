import React from "react";
import { useItemsContext } from "../context/ItemsContext";
import { useParams } from "react-router-dom";

const SingleItemPage = () => {
  const [items, setItems] = useItemsContext();
  const params = useParams();
  const item = items.filter((item) => item.id === parseInt(params.itemId))[0];

  return (
    <div>
      <p>name: {item.name}</p>
      <p>description: {item.description}</p>
      <p>category: {item.category}</p>
      <p>${item.price}</p>
      <img
        src={item.imagePath}
        alt={`${item.name} image`}
        width="275"
        height="275"
      />
    </div>
  );
};

export default SingleItemPage;
