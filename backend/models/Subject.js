const mongoose = require('mongoose')

const subjectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    obtainedMarks: {
      type: Number,
      required: true,
      min: 0,
    },

    maxMarks: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
)

const Subject = mongoose.model(
  'Subject',
  subjectSchema
)

module.exports = Subject