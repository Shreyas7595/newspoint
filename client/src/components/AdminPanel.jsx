import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const AdminPanel = () => {
  const navigate = useNavigate();
  
  // Tabs State
  const [activeTab, setActiveTab] = useState('create');

  // News States
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('india');
  const [imageFile, setImageFile] = useState(null); 
  const [imagePreview, setImagePreview] = useState('');
  const [allNews, setAllNews] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // User Registration States
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState('Reporter');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
    fetchNews();
  }, [navigate]);

  const fetchNews = async () => {
    const res = await axios.get('http://localhost:5000/api/news');
    setAllNews(res.data);
  };

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // --- NEWS LOGIC ---
  const handleNewsSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/news/${editId}`, { title, content, category });
        alert('News Updated!');
      } else {
        await axios.post('http://localhost:5000/api/news', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('News Published with Image!');
      }
      resetNewsForm();
      fetchNews();
    } catch (err) {
      alert('Error saving news');
    }
  };

  const handleEdit = (news) => {
    setIsEditing(true);
    setEditId(news._id);
    setTitle(news.title);
    setContent(news.content);
    setCategory(news.category);
    setImagePreview(news.image || '');
    setActiveTab('create');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await axios.delete(`http://localhost:5000/api/news/${id}`);
      fetchNews();
    }
  };

  const resetNewsForm = () => {
    setTitle(''); 
    setContent(''); 
    setImageFile(null); 
    setImagePreview('');
    setIsEditing(false); 
    setEditId(null);
    setCategory('india');
  };

  // --- USER REGISTRATION LOGIC ---
  const handleUserRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { 
        username: regUsername, 
        password: regPassword,
        role: regRole 
      });
      alert('User/Reporter added successfully!');
      setRegUsername(''); 
      setRegPassword('');
    } catch (err) {
      alert('Error Details: ' + (err.response?.data?.message || err.message));
    }
  };

  // --- AUTO FETCH API LOGIC ---
  const handleAutoFetch = async () => {
    const cat = document.getElementById('fetch-category').value;
    if(!cat) return alert("Select category");
    try {
      const res = await axios.post('http://localhost:5000/api/fetch/fetch-external', { category: cat });
      alert(res.data.message);
      fetchNews(); // Table refresh
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="admin-dashboard-container">
      
      {/* Dashboard Header */}
      <div className="admin-dash-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p style={{margin:0, opacity:0.7}}>Manage your news portal</p>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:'15px'}}>
          <div className="admin-dash-date">
            {new Date().toDateString()}
          </div>
          <button onClick={handleLogout} className="btn-logout-admin">
            🚪 Logout
          </button>
        </div>
      </div>

      {/* --- AUTO FETCH SECTION (ADDED HERE) --- */}
      <div className="admin-card" style={{marginBottom:'20px', padding:'20px', display:'flex', gap:'20px', alignItems:'center', flexWrap:'wrap'}}>
        <h3 style={{margin:0, fontFamily:'Oswald', color:'var(--text-dark)'}}>⚡ Auto-Fetch Live News:</h3>
        <select id="fetch-category" style={{padding:'10px', borderRadius:'6px', border:'1px solid #ccc'}}>
          <option value="general">General</option>
          <option value="sports">Sports</option>
          <option value="politics">Politics (World)</option>
          <option value="business">Business</option>
          <option value="technology">Technology</option>
          <option value="entertainment">Entertainment</option>
          <option value="health">Health</option>
          <option value="science">Science</option>
        </select>
        <button 
          onClick={handleAutoFetch}
          className="btn-publish" 
          style={{background:'#28a745', padding:'10px 20px'}}
        >
          Fetch & Save Now
        </button>
      </div>


      {/* Tabs Navigation */}
      <div className="admin-tabs">
        <button 
          className={`admin-tab-btn ${activeTab === 'create' ? 'active' : ''}`}
          onClick={() => { setActiveTab('create'); resetNewsForm(); }}
        >
          ✍️ Create / Edit News
        </button>
        <button 
          className={`admin-tab-btn ${activeTab === 'manage' ? 'active' : ''}`}
          onClick={() => setActiveTab('manage')}
        >
          📰 Manage News
        </button>
        <button 
          className={`admin-tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 Add Journalist/User
        </button>
      </div>

      {/* Tab Content */}
      <div className="admin-tab-content">
        
        {/* TAB 1: CREATE NEWS */}
        {activeTab === 'create' && (
          <div className="admin-card">
            <h2 className="admin-card-title">{isEditing ? 'Edit Article' : 'Write New Article'}</h2>
            <form onSubmit={handleNewsSubmit} className="modern-form">
              <div className="form-group">
                <label>Headline</label>
                <input type="text" placeholder="Enter catchy headline..." value={title} onChange={e=>setTitle(e.target.value)} required />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select value={category} onChange={e=>setCategory(e.target.value)}>
                    <option value="india">National (India)</option>
                    <option value="politics">Politics</option>
                    <option value="business">Business</option>
                    <option value="technology">Technology</option>
                    <option value="sports">Sports</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="world">World</option>
                    <option value="education">Education</option>
                    <option value="jobs">Jobs</option>
                    <option value="health">Health</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="science">Science</option>
                    <option value="auto">Auto</option>
                    <option value="opinion">Opinion</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Upload Image</label>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => {
                      setImageFile(e.target.files[0]);
                      setImagePreview(URL.createObjectURL(e.target.files[0]));
                    }} 
                  />
                  {imagePreview && <img src={imagePreview} alt="Preview" style={{width:'100px', height:'100px', objectFit:'cover', marginTop:'10px', borderRadius:'8px'}} />}
                </div>
              </div>

              <div className="form-group">
                <label>Content</label>
                <textarea rows="8" placeholder="Write full news story here..." value={content} onChange={e=>setContent(e.target.value)} required />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-publish">
                  {isEditing ? '💡 Update Article' : '🚀 Publish Article'}
                </button>
                {isEditing && <button type="button" className="btn-cancel" onClick={resetNewsForm}>Cancel</button>}
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: MANAGE NEWS (Table Format) */}
        {activeTab === 'manage' && (
          <div className="admin-card">
            <h2 className="admin-card-title">All Published News ({allNews.length})</h2>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allNews.map(item => (
                    <tr key={item._id}>
                      <td data-label="Title">{item.title.substring(0, 40)}...</td>
                      <td data-label="Category"><span className="cat-badge">{item.category}</span></td>
                      <td data-label="Date">{new Date(item.date).toLocaleDateString()}</td>
                      <td data-label="Actions">
                        <button className="action-btn edit" onClick={() => handleEdit(item)}>✏️ Edit</button>
                        <button className="action-btn delete" onClick={() => handleDelete(item._id)}>🗑️ Delete</button>
                      </td>
                    </tr>
                  ))}
                  {allNews.length === 0 && <tr><td colSpan="4" style={{textAlign:'center'}}>No news found.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ADD USER/REPORTER */}
        {activeTab === 'users' && (
          <div className="admin-card" style={{maxWidth: '500px'}}>
            <h2 className="admin-card-title">Register New Journalist/Admin</h2>
            <p style={{color:'#666', fontSize:'14px', marginBottom:'20px'}}>
              Add team members who can write or manage news.
            </p>
            <form onSubmit={handleUserRegister} className="modern-form">
              <div className="form-group">
                <label>Username / Email</label>
                <input 
                  type="text" 
                  placeholder="e.g., reporter@newspoint.com" 
                  value={regUsername} 
                  onChange={e=>setRegUsername(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  placeholder="Create a strong password" 
                  value={regPassword} 
                  onChange={e=>setRegPassword(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select value={regRole} onChange={e=>setRegRole(e.target.value)}>
                  <option value="Reporter">Reporter (Can only write)</option>
                  <option value="Admin">Admin (Full Access)</option>
                </select>
              </div>
              <button type="submit" className="btn-publish">➕ Create User</button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminPanel;