import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";
import { getImprovedResume, getResumeDetails } from "../api/resumes";

export default function ResumeDetails() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { id } = useParams();
  const { logout } = useContext(AuthContext);
  
  const improveResume = async () => {
    setLoading(true);
    try {
      const data = await getImprovedResume(id);
      setResume(prev => ({ ...prev, content: data.improved_content }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchResume() {
      try {
        const data = await getResumeDetails(id);
        setResume(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchResume();
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div>
      <h1>{resume.title}</h1>
      <button onClick={logout}>Выйти</button>
      <Link to={`/resumes/`}>Все резюме</Link>
      <p>{resume.content}</p>
      <button onClick={improveResume}>Улучшить</button>
    </div>
  );
}
