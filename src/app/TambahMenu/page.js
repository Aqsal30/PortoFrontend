"use client";

import { useState } from "react";

export default function CreateMenuPage() {

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    type: "food"
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleImage = (e) => {

    const file = e.target.files[0];
    console.log(e.target);
    console.log(e.target.files);

    if (!file) return;

    setImage(file);

    setPreview(
      URL.createObjectURL(file)
    );

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append(
      "name",
      form.name
    );

    formData.append(
      "price",
      form.price
    );

    formData.append(
      "description",
      form.description
    );

    formData.append(
      "type",
      form.type
    );

    if (image) {
      formData.append(
        "image",
        image
      );
    }

    try {

      const response = await fetch(
        "https://porto-backend-silk.vercel.app/updatemenu",
        {
          method: "POST",
          body: formData
        }
      );

      const data =
        await response.json();

      console.log(data);

      alert("Menu created");

    } catch (error) {

      console.log(error);

      alert("Failed");

    }

  };

  return (

    <div style={{
      padding:"30px",
      maxWidth:"500px"
    }}>

      <h1>Create Menu</h1>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Menu name"
          value={form.name}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <br /><br />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
        >
          <option value="food">
            Food
          </option>

          <option value="drink">
            Drink
          </option>
        </select>

        <br /><br />

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
        />

        <br /><br />

        {preview && (

          <img
            src={preview}
            alt="preview"
            width={200}
          />

        )}

        <br /><br />

        <button type="submit">
          Save Menu
        </button>

      </form>

    </div>

  );

}