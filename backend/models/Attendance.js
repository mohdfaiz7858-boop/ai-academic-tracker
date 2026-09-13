const mongoose = require('mongoose')

const attendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    attendedClasses: {
      type: Number,
      required: true,
      min: 0,
    },

    totalClasses: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
)

const Attendance = mongoose.model(
  'Attendance',
  attendanceSchema
)

module.exports = Attendance