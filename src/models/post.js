import mongoose from 'mongoose';

const PostSchema = mongoose.Schema(
  {
    userid: {
      type: String,
      require: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true },
);

const User = mongoose.model('post', PostSchema);

export default User;
