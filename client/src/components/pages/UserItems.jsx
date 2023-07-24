import React, { useState, useEffect } from "react";

function UserItems() {
  const [userItems, setUserItems] = useState([]);

  // function to fetch all userItems and update state
  const fetchItems = () => {
    fetch("/api/get-items")
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
    console.log(itemId);
    const deleteItem = await fetch("/api/delete-item", {
      method: "POST",
      body: JSON.stringify({ itemId }),
      headers: {
        "Content-Type": "application/json",
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
              <div>
                <p>{item.name}</p>
                {item.category}
                <p>${item.price}</p>
                <p>{item.description}</p>
                <button onClick={() => handleRemoveItemClick(item.id)}>
                  Remove Item
                </button>
              </div>
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
