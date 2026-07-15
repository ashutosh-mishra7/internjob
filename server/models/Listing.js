const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', required: true },
  type: { type: String, enum: ['Job', 'Internship', 'Hackathon'], required: true },
  location: { type: String, required: true }, // e.g., Bangalore, Remote, PAN India
  workType: { type: String, enum: ['Remote', 'Onsite', 'Hybrid'], required: true },
  salary: { type: String }, // Optional, could be unpaid
  deadline: { type: Date, required: true },
  description: { type: String, required: true },
  applyLink: { type: String, default: '' },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

// Virtual field to check if expired
listingSchema.virtual('isExpired').get(function() {
    return this.deadline < new Date();
});

// Ensure virtuals are included in JSON/Object conversions
listingSchema.set('toJSON', { virtuals: true });
listingSchema.set('toObject', { virtuals: true });

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
