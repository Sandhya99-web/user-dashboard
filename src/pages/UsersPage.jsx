import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const limit = 10;

  const loadUsers = async () => {
    try {
      const res = await getUsers(limit, (page - 1) * limit);
      setUsers(res.data.users);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [page]);

  // 🔄 Loading state
  if (!users.length) return <p style={{ padding: "20px" }}>Loading users...</p>;

  // 🔍 Filtering
  let filtered = users.filter(u =>
    `${u.firstName} ${u.lastName} ${u.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (gender) filtered = filtered.filter(u => u.gender === gender);
  if (role) filtered = filtered.filter(u => u.company?.title === role);

  return (
    <div className="container">
      <div className="header">
        <h2>User Dashboard</h2>
        <button className="btn-primary" onClick={() => navigate("/add")}>
          ➕ Add User
        </button>
      </div>

      {/* 🔍 Filters */}
      <div style={{ marginBottom: "15px" }}>
        <input
          placeholder="Search..."
          onChange={e => setSearch(e.target.value)}
        />

        <select onChange={e => setGender(e.target.value)}>
          <option value="">All Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input
          placeholder="Role (e.g. Manager)"
          onChange={e => setRole(e.target.value)}
        />
      </div>

      {/* 📋 Table */}
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="7">No users found</td>
            </tr>
          ) : (
            filtered.map(u => (
              <tr key={u.id}>
                <td>
                  <img src={u.image} width="40" />
                </td>
                <td>{u.firstName} {u.lastName}</td>
                <td>{u.email}</td>
                <td>{u.phone}</td>
                <td>{u.company?.name}</td>
                <td>{u.company?.title}</td>
                <td>
                  <button
                    className="btn-secondary"
                    onClick={() => navigate(`/user/${u.id}`)}
                  >
                    View
                  </button>

                  <button
                    className="btn-primary"
                    onClick={() => navigate(`/edit/${u.id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn-danger"
                    onClick={async () => {
                      if (!window.confirm("Delete user?")) return;
                      await deleteUser(u.id);
                      loadUsers();
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* 📄 Pagination */}
      <div className="pagination">
        <button
          onClick={() => setPage(p => p - 1)}
          disabled={page === 1}
        >
          Prev
        </button>

        <span> Page {page} </span>

        <button onClick={() => setPage(p => p + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}