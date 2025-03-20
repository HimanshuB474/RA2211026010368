import axios from "axios";
import { useState, useEffect } from "react";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://20.244.56.144/test/users", {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOn...",
          },
        });

        setUsers(Object.entries(response.data.users));
      } catch (err) {
        console.error("Fetch Error:", err);
        setError(err.message);
      }
    };

    fetchUsers();
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Top Users</h1>
      <ul>
        {users.map(([id, name]) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
