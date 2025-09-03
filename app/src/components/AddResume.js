import { useContext, useState } from "react";

import { addResume } from "../api/resumes";
import { AuthContext } from "../contexts/AuthContext";

export default function AddResume({ onAdd }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  
  const { username } = useContext(AuthContext);
  
  const addResumeHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await addResume({title, content, user_id: username.id});
      if (onAdd) onAdd(data);
      setTitle('');
      setContent('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
        <form onSubmit={addResumeHandleSubmit}>
        <input type="title" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input type="content" placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
        <button type="submit">Добавить</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
