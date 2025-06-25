const Feedback = require('../models/Feedback');

const createFeedback = async (req, res) => {
  try {
    const { name, email, feedback, model, rating, category } = req.body;

    if (!name || !email || !feedback || !model || !rating || !category) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const newFeedback = await Feedback.create({ name, email, model, rating, category, feedback });

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully',
      feedback: newFeedback,
    });
  } catch (error) {
    console.error('Error in adding feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

const getFeedback = async (req, res) => {
  try {
    const { rating, sortBy = 'createdAt', page = 1, limit = 10 } = req.query;

    const query = {};
    if (rating) query.rating = parseInt(rating);

    const sortOptions = {};
    sortOptions[sortBy] = -1; 

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const feedbacks = await Feedback.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum);

    const total = await Feedback.countDocuments(query);

    if (!feedbacks.length && pageNum === 1) {
      return res.status(404).json({
        success: false,
        message: 'No feedback found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Feedback retrieved successfully',
      feedbacks,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
        limit: limitNum,
      },
    });
  } catch (error) {
    console.error('Error in getFeedback:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

module.exports = { createFeedback, getFeedback };
