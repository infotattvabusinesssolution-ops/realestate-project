import mongoose from 'mongoose';

const adminRoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a role name'],
      unique: true,
      trim: true,
    },
    permissions: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const AdminRole = mongoose.model('AdminRole', adminRoleSchema);
export default AdminRole;
