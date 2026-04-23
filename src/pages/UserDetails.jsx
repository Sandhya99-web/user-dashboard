import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../services/api";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser(id).then(res => setUser(res.data));
  }, [id]);

  if (!user) return <p style={{ padding: "20px" }}>Loading...</p>;

  return (
    <div className="container">
      <h2>User Details</h2>

      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        maxWidth: "500px",
        margin: "20px auto",
        textAlign: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}>
        <img
          src={user.image}
          width="100"
          style={{ borderRadius: "50%", marginBottom: "10px" }}
        />

        <h3>{user.firstName} {user.lastName}</h3>

        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p>
          <strong>Address:</strong>{" "}
          {user.address?.address}, {user.address?.city}
        </p>

        <br />

        <button
          className="btn-secondary"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}