import mongoose from 'mongoose';

const journalSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    ambience: { type: String, required: true },
    text: { type: String, required: true },
    emotion: { type: String },
    keywords: { type: [String] },
    summary: { type: String },
  },
  {
    timestamps: true,
  }
);

const MongoJournal = mongoose.model('Journal', journalSchema);

export default MongoJournal;
