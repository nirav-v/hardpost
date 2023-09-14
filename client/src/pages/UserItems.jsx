import React, { useState, useEffect } from "react";
import ItemCard from "../components/UI/ItemCard";
import Auth from "../util/auth";

function UserItems() {
  const [userItems, setUserItems] = useState([]);

  // function to fetch all userItems and update state
  const fetchItems = () => {
    fetch("/api/get-items", {
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserItems(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleRemoveItemClick = async (itemId) => {
    // grab the item id and send a fetch request to the delete-item route
    console.log("id removed: ", itemId);
    const deleteItem = await fetch("/api/delete-item", {
      method: "POST",
      body: JSON.stringify({ itemId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });

    fetchItems();
  };

  return (
    <div>
      <p>UserItems Page</p>

      {userItems.length ? (
        <ul>
          {userItems.map((item) => (
            <li key={item.id}>
              <ItemCard item={item} />
              <button onClick={() => handleRemoveItemClick(item.id)}>
                Remove Item
              </button>
            </li>
          ))}
        </ul>
      ) : (
        "you haven't posted any items"
      )}
    </div>
  );
}

export default UserItems;
