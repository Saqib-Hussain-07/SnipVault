const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 100 },
  code: { type: String, required: true },
  language: { type: String, required: true, default: 'plaintext' },
  tags: { type: [String], default: [] },
  isPublic: { type: Boolean, default: false },
  shareId: { type: String, unique: true, sparse: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

snippetSchema.index({ title: 'text', code: 'text' });

module.exports = mongoose.model('Snippet', snippetSchema);
