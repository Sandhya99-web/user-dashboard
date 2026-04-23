import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../services/api";

export default function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
  });

  useEffect(() => {
    if (id) {
      getUser(id).then(res => {
        setForm(res.data);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(id ? "User Updated!" : "User Added!");
    navigate("/");
  };

  return (
    <div className="container">
      <h2>{id ? "Edit User" : "Add User"}</h2>

      <form onSubmit={handleSubmit}>
        <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" required />
        <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" />
        <input name="age" value={form.age} onChange={handleChange} placeholder="Age" />

        <button className="btn-primary" type="submit">Save</button>
      </form>
    </div>
  );
}