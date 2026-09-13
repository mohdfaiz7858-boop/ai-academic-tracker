const mongoose = require('mongoose')

const studyHoursSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    hours: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
)

const StudyHours = mongoose.model(
  'StudyHours',
  studyHoursSchema
)

module.exports = StudyHours