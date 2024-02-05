import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: String, 
    email: String,
    image: String,
    emailVerified: Date,
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
