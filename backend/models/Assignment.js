const mongoose = require('mongoose')

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    dueDate: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ['Pending', 'Completed'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
)

const Assignment = mongoose.model(
  'Assignment',
  assignmentSchema
)

module.exports = Assignment