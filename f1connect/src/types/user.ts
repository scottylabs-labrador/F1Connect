import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  country: { type: String, required: true },
  gradYear: { type: Number, required: true },
  major: { type: String, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String }
});

export default mongoose.models.User || mongoose.model('User', userSchema);