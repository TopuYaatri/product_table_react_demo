import React, { useEffect, useState } from "react";
import "./App.css";
//import Modal from 'react-modal';

function App() {
  const [inputField, setInputField] = useState([]);
  const [modals, setModals] = useState(false);
  const [index, setIndex] = useState();

  const submitButton = (e) => {
    setInputField([
      ...inputField,
      {
        product_name: document.getElementById("product_name").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
      },
    ]);
    e.preventDefault();
  };

  const delRow = (e) => {
    setInputField(inputField.filter((x) => x.product_name !== e.target.id));
  };

  function editRow(e) {
    setModals(!modals);
    const newId = e.target.id;

    setIndex(inputField.map((obj) => obj.product_name).indexOf(newId));
  }

  useEffect(() => {}, [index]);

  function editObject(e) {
    inputField.splice(index, 1, {
      product_name: document.getElementById("product_name_modal").value,
      description: document.getElementById("description_modal").value,
      price: document.getElementById("price_modal").value,
    });
    setModals(!modals)
    e.preventDefault();
  }

  return (
    <div>
      <form className ='form_one' onSubmit={submitButton}>
        <label>Product Name</label>
        <input
          className="input_name"
          type="text"
          id="product_name"
          placeholder="Product Name"
        ></input>{" "}
        <br />
        <label>Description</label>
        <input
          className = 'input_description'
          type="text"
          id="description"
          placeholder="Description"
        ></input>{" "}
        <br />
        <label>Price</label>{" "}
        <input className = 'input_price' type="text" id="price" placeholder="Price"></input> <br />
        <br />
        <button className="submit_one">Submit</button>
      </form>
      <div className="table_div">
      <table className="table">
        <tbody>
          <tr className="row">
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>

          {inputField.map((inObj) => (
            <tr key={inObj.product_name}>
              <td className= "td">{inObj.product_name}</td>
              <td>{inObj.description}</td>
              <td>{inObj.price}</td>
              <td>
                <button id={inObj.product_name} onClick={delRow}>
                  delete
                </button>
              </td>
              <td>
                <button id={inObj.product_name} onClick={editRow}>
                  edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {modals === true && (
        <div className="backShadow">
          <div className="modal_div">
            <form className = "form_two" onSubmit={editObject}>
              <label >Product Name</label>
              <input
                className="input_name"
                type="text"
                id="product_name_modal"
                placeholder="Product Name"
              ></input>
              <br></br>
              <label>Description</label>
              <input
                className="input_description"
                type="text"
                id="description_modal"
                placeholder="Description"
              ></input>
              <br></br>
              <label>Price</label>{" "}
              <input className = "input_price" type="text" id="price_modal" placeholder="Price"></input>
              <br></br>
              <button className="save_button">save</button>
              <button className = "close_button" onClick={() => setModals(!modals)}>close</button>
            </form>
           
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
