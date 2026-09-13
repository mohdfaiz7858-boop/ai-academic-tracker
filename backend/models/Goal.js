const mongoose = require('mongoose')

const goalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ['CGPA', 'Percentage', 'Other'],
      required: true,
    },

    target: {
      type: Number,
      required: true,
      min: 0,
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
)

const Goal = mongoose.model(
  'Goal',
  goalSchema
)

module.exports = Goal