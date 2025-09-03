import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AddResume from "../components/AddResume";
import { AuthContext } from "../contexts/AuthContext";
import { getResumes } from "../api/resumes";

export default function Resumes() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { logout } = useContext(AuthContext);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getResumes();
        setResumes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div>
      <h1>Резюме</h1>
      <button onClick={logout}>Выйти</button>
      <AddResume onAdd={data => setResumes(prev => [...prev, data])} />
      <ul>
        {resumes.map(resume => (
          <li key={resume.id}>
            <Link to={`/resumes/${resume.id}`}>
              {resume.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
