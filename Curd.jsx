import React, { useEffect, useState } from "react";
import "./Curd.css";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
const Curd = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [record, setRecord] = useState([]);
  const [editId, setEditId] = useState("");
  const [multipleDelete, setMultipleDelete] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : [];
    setRecord(data);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "" || phone === "") {
      alert("all field is requird...!");
      return;
    }

    if (editId) {
      let recordn = [...record];
      let recordupdate = recordn.map((val) => {
        if (val.id === editId) {
          return {
            ...val,
            name: name,
            phone: phone,
          };
        }
        return val;
      });

      localStorage.setItem("user", JSON.stringify(recordupdate));
      setRecord(recordupdate);
      setEditId("");
      alert("data update successfully...!");
    } else {
      const newId = record.length ? record[record.length - 1].id + 1 : 8;
      const recordn = [...record, { id: newId, name, phone }];
      localStorage.setItem("user", JSON.stringify(recordn));
      setRecord(recordn);
      alert("data add");
    }

    setName("");
    setPhone("");
  };

  const deleteData = (id) => {
    let recordupdate = record.filter((val) => val.id !== id);
    localStorage.setItem("user", JSON.stringify(recordupdate));
    setRecord(recordupdate);
  };

  const editData = (id) => {
    let editItem = record.find((val) => val.id === id);
    setEditId(editItem.id);
    setName(editItem.name);
    setPhone(editItem.phone);
  };

  const handleCheckbox = (id, checked) => {
    let updatedMultipleDelete = [...multipleDelete];
    if (checked) {
      updatedMultipleDelete.push(id);
    } else {
      updatedMultipleDelete = updatedMultipleDelete.filter((val) => val !== id);
    }
    setMultipleDelete(updatedMultipleDelete);
  };

  const handleAllDelete = () => {
    if (multipleDelete.length > 0) {
      let recordupdate = record.filter((val) => !multipleDelete.includes(val.id));
      localStorage.setItem("user", JSON.stringify(recordupdate));
      setRecord(recordupdate);
      setMultipleDelete([]);
      alert("Deleted successfully...!");
    } else {
      alert("Select at least one row .......!");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <input type="text"id="name" onChange={(e) => setName(e.target.value)}value={name}placeholder="Add title" style={{ width: "200px", padding: "10px", marginBottom: "10px" }}
        />
        <input  type="text"   id="phone" onChange={(e) => setPhone(e.target.value)}  value={phone}  placeholder="Add description" style={{ width: "200px", padding: "10px", marginBottom: "10px" }}
        />
        <button type="submit" style={{  padding: "8px 16px",backgroundColor: "#007bff", color: "#fff",  border: "none", marginBottom: "30px",height: "40px",
          }}
        >
          {editId ? "Edit" : "Submit"}
        </button>
      </form>
      <table style={{ width: "100%", border: "3px solid black",backgroundColor:"white" }}>
        <thead>
          <tr className="trw">
            <th style={{ border: "1px solid #000000", padding: "12px",color:"rgb(81 150 254)" }}>Id</th>
            <th style={{ border: "1px solid #000000", padding: "12px",color:"rgb(81 150 254)"}}>Title</th>
            <th style={{ border: "1px solid #000000", padding: "12px",color:"rgb(81 150 254)" }}>Description</th>
            <th style={{ border: "1px solid #000000", padding: "12px",color:"rgb(81 150 254)" }}>Action</th>
            <th style={{ border: "1px solid #000000", padding: "12px" }}>
              <button onClick={handleAllDelete} style={{border:"none",color:"rgb(81 150 254)"}}> Delete</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {record.map((item) => {
            const { id, name, phone } = item;
            return (
              <tr key={id}>
                <td style={{ border: "1px solid #000000", padding: "12px" }}>{id}</td>
                <td style={{ border: "1px solid #000000", padding: "12px" }}>{name}</td>
                <td style={{ border: "1px solid #000000", padding: "12px" }}>{phone}</td>
                <td style={{ border: "1px solid #000000", padding: "12px" }}>
                  <button onClick={() => deleteData(id)}>Delete</button>
                  <button onClick={() => editData(id)}style={{backgroundColor:"rgb(5, 201, 5)",border:"none",margin:"5px"}}><FaRegEdit /></button>
                </td>
                <td style={{ border: "1px solid #000000", padding: "12px" }}>
                  <input
                    type="checkbox"
                    onChange={(e) => handleCheckbox(id, e.target.checked)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Curd;
