import { useState, useEffect } from 'react';
import axios from 'axios';

const FeedbackDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filters, setFilters] = useState({ rating: '' });
  const [sortBy, setSortBy] = useState('createdAt');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const order = 'desc'; 

  useEffect(() => {
    fetchFeedback();
  }, [filters, sortBy, page]); 

  const fetchFeedback = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/feedback', {
        params: { ...filters, sortBy, order, page }
      });
      setFeedbacks(res.data.feedbacks);
      setPagination(res.data.pagination);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };

  return (
    <div className="dashboard-container">
      <h2>Feedback Dashboard</h2>

      <div className="filters">
        <div>
          <label>Filter by Rating:</label>
          <select name="rating" value={filters.rating} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>

        <div>
          <label>Sort By:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="createdAt">Date</option>
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="rating">Rating</option>
            <option value="model">Product Model</option>
          </select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Model</th>
            <th>Rating</th>
            <th>Category</th>
            <th>Feedback</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((fb) => (
            <tr key={fb._id}>
              <td>{fb.name}</td>
              <td>{fb.email}</td>
              <td>{fb.model}</td>
              <td>{fb.rating} Star(s)</td>
              <td>{fb.category}</td>
              <td>{fb.feedback}</td>
              <td>{new Date(fb.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-buttons">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span> Page {pagination.page} of {pagination.pages} </span>
        <button disabled={page === pagination.pages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default FeedbackDashboard;
