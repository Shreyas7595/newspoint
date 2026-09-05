import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddNews = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newNews = { title, content, category };
    try {
      await axios.post('http://localhost:5000/api/news', newNews);
      navigate('/'); // Home par wapas jao
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Add New Post</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          style={styles.input}
          required 
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={styles.input}>
          <option value="General">General</option>
          <option value="Tech">Tech</option>
          <option value="Sports">Sports</option>
        </select>
        <textarea 
          placeholder="Content" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          style={styles.textarea}
          required 
        />
        <button type="submit" style={styles.button}>Publish</button>
      </form>
    </div>
  );
};

const styles = {
  container: { padding: '2rem', maxWidth: '600px', margin: '0 auto' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
  input: { padding: '10px', fontSize: '16px' },
  textarea: { padding: '10px', fontSize: '16px', height: '150px' },
  button: { padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }
};

export default AddNews;