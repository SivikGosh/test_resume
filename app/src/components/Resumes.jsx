import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AddResume from "./AddResume";
import styles from "./Resumes.module.css";
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
    <div className={styles.container}>
      <h1 className={`${styles.heading} ${styles.headingFadeIn}`}>Resumés</h1>
      <button onClick={logout}>Выйти</button>

      <div className={styles.addResumeWrapper}>
        <AddResume onAdd={data => setResumes(prev => [...prev, data])} />
      </div>

      <ul>
        {resumes.map(resume => (
            <Link to={`/resumes/${resume.id}`}>
              <li key={resume.id}>{resume.title}</li>
            </Link>
        ))}
      </ul>
    </div>
  );
}
