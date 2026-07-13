import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a property name'],
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    price: {
      type: String,
      required: [true, 'Please add a price description (e.g., $1,200,000 or $3,500 / mo)'],
    },
    type: {
      type: String,
      required: [true, 'Please specify property type'],
      enum: ['Buy', 'Rent'],
    },
    propertyType: {
      type: String,
      enum: ['Residential', 'Commercial'],
      default: 'Residential',
    },
    address: {
      type: String,
      required: [true, 'Please add an address'],
    },
    city: {
      type: String,
      default: '',
    },
    country: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: '',
    },
    beds: {
      type: Number,
      default: 0,
    },
    baths: {
      type: Number,
      default: 0,
    },
    area: {
      type: String,
      required: [true, 'Please add square footage (e.g., 2,500 sqft)'],
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
    },
    galleryImages: [{
      type: String,
    }],
    floorPlanImage: {
      type: String,
      default: '',
    },
    videoImage: {
      type: String,
      default: '',
    },
    videoUrl: {
      type: String,
      default: '',
    },
    tag: {
      type: String,
      default: 'Property',
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    assignedAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    views: {
      type: Number,
      default: 0,
    },
    leadsCount: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: '',
    },
    amenities: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Amenity',
    }],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
    latitude: {
      type: String,
      default: '',
    },
    longitude: {
      type: String,
      default: '',
    },
    metaKeywords: {
      type: String,
      default: '',
    },
    metaDesc: {
      type: String,
      default: '',
    },
    features: [{
      labelEn: { type: String, default: '' },
      valueEn: { type: String, default: '' },
      labelAr: { type: String, default: '' },
      valueAr: { type: String, default: '' },
    }],
    titleAr: {
      type: String,
      default: '',
    },
    addressAr: {
      type: String,
      default: '',
    },
    descriptionAr: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Virtual alias: title falls back to name
propertySchema.pre('save', function (next) {
  if (!this.title) {
    this.title = this.name;
  }
  next();
});

const Property = mongoose.model('Property', propertySchema);
export default Property;
