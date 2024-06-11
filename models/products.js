const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `Please enter product name`],
    trim: true,
    maxLength: [100, `product name must be at least 100 characters long`],
  },
  price: {
    type: Number,
    required: [true, `Please enter product price`],
    trim: true,
    default: 0,
  },
  description: {
    type: String,
    required: [true, `Please enter product description`],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, `Please enter product category`],
    enum: {
      values: [
        `shirt`,
        `pants`,
        `laptops`,
        `accessories`,
        "headphones",
        "Cameras",
        "Books",
        "Home",
        "Outdoor",
        "Sports",
      ],
      message: `Please select a valid category`,
    },
  },
  seller: {
    type: String,
    required: [true, `Please enter product seller`],
  },
  stock: {
    type: Number,
    required: [true, `Please enter product stock`],
    maxLength: [5, `Product name cannot exceed 5 characters`],
    default: 0,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },

  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      user: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Product', ProductSchema);