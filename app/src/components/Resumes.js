import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Resumes() {
  const { username, logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Резюме</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
