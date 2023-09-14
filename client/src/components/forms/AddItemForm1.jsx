import { useState, useRef, Fragment } from "react";
import { ProgressBar } from "react-loader-spinner";
import Auth from "../../util/auth";
function addItemForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const imageInput = useRef(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // make sure name and image were provided for product
    if (imageInput.current.files.length < 1) {
      alert("must include an image");
      return;
    }

    if (name.length < 1) {
      alert("must fill in the item name field");
      return;
    }

    setLoading(true);

    const formData = new FormData(); // used to send image with rest of form data

    const url = "/api/add-item";
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("image", imageInput.current.files[0]);

    console.log(formData);

    const response = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });
    console.log(response);
    const result = await response.json();
    console.log(result);
    setName(""),
      setCategory(""),
      setPrice(null),
      setDescription(""),
      setLoading(false);

    // redirect to shop page
    location.replace("/");
  };

  return (
    <Fragment>
      {loading ? (
        <div>
          <h3>Uploading your item - please do not refresh or close the page</h3>
          <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor="#F4442E"
            barColor="#51E5FF"
          />
        </div>
      ) : (
        <div>
          <p>addItemForm</p>
          <form onSubmit={handleSubmit}>
            {/* inputs for item name, price category, description */}
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <label>
              Category:
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}>
                <option value="decks">decks</option>
                <option value="shoes">shoes</option>
                <option value="trucks">trucks</option>
                <option value="wheels">wheels</option>
                <option value="pants">pants</option>
                <option value="other">other</option>
              </select>
            </label>
            <label>Price</label>
            <input
              type="number"
              step="any"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
            <label>Description</label>
            <input
              type="text"
              description="name"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <label> Image</label>
            {/* from react docs for file inputs: In React, an <input type="file" /> is always an uncontrolled component because its value can only be set by a user, and not programmatically. */}
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              defaultValue=""
              ref={imageInput}
            />
            <input type="submit" />
          </form>
        </div>
      )}
    </Fragment>
  );
}

export default addItemForm;
