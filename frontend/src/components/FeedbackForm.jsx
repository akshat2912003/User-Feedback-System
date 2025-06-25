import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FeedbackForm = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    model: '',
    rating: '',
    category: '',
    feedback: ''
  });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/v1/feedback', formData);
      setMessage(res.data.message);
      setFormData({
        name: '',
        email: '',
        model: '',
        rating: '',
        category: '',
        feedback: ''
      });
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Error submitting feedback');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="form-container">
      <h2>Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Product Model:</label>
          <select name="model" value={formData.model} onChange={handleChange} required>
            <option value="">Select Product</option>
            <option value="1">HP Pavilion 15</option>
            <option value="2">HP Spectre x360</option>
            <option value="3">HP Envy x360</option>
            <option value="4">HP Victus 16</option>
            <option value="5">HP Omen 16</option>
          </select>
        </div>
        <div>
          <label>Rating:</label>
          <select name="rating" value={formData.rating} onChange={handleChange} required>
            <option value="">Select Rating</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
        <div>
          <label>Category:</label>
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="Performance">Performance</option>
            <option value="Battery">Battery</option>
            <option value="Display">Display</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label>Feedback Message:</label>
          <textarea name="feedback" value={formData.feedback} onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={goToDashboard} style={{ marginTop: '20px' }}>
        Feedbacks Given By User
      </button>
    </div>
  );
};

export default FeedbackForm;
