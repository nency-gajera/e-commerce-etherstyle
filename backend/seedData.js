import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productModel from './models/productModel.js';

dotenv.config();

const sampleProducts = [
  {
    name: "Women Round Neck Cotton Top",
    description: "A lightweight, knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
    price: 100,
    image: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Women",
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: true,
    date: 1716634345448
  },
  {
    name: "Men Round Neck Pure Cotton T-shirt",
    description: "Premium pure cotton everyday t-shirt with classic fit, breathable fabric, and durable double-stitched hem.",
    price: 200,
    image: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Men",
    subCategory: "Topwear",
    sizes: ["M", "L", "XL"],
    bestseller: true,
    date: 1716621345448
  },
  {
    name: "Girls Round Neck Cotton Top",
    description: "Soft and gentle pure cotton floral print top for kids with expandable collar line and easy fit.",
    price: 220,
    image: [
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Kids",
    subCategory: "Topwear",
    sizes: ["S", "L", "XL"],
    bestseller: true,
    date: 1716234545448
  },
  {
    name: "Men Relaxed Fit Denim Jacket",
    description: "Classic rugged denim jacket featuring button closure, twin chest pockets, and comfortable relaxed silhouette.",
    price: 150,
    image: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Men",
    subCategory: "Winterwear",
    sizes: ["M", "L", "XL", "XXL"],
    bestseller: false,
    date: 1716621545448
  },
  {
    name: "Women High-Waist Tailored Trousers",
    description: "Elegant tailored trousers featuring a high waistline, sleek pleats, and straight-leg finish for versatile styling.",
    price: 130,
    image: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Women",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L"],
    bestseller: false,
    date: 1716622345448
  },
  {
    name: "Boys Casual Lightweight Hoodie",
    description: "Cozy fleece-lined hoodie for kids with kangaroo front pocket and ribbed cuffs for maximum warmth.",
    price: 140,
    image: [
      "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Kids",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L"],
    bestseller: true,
    date: 1716623345448
  },
  {
    name: "Men Slim Fit Chino Pants",
    description: "Versatile stretch-cotton chino trousers designed for smart casual wear with clean tailored pockets.",
    price: 190,
    image: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Men",
    subCategory: "Bottomwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    date: 1716624345448
  },
  {
    name: "Women Casual Oversized Sweatshirt",
    description: "Plush organic cotton blend oversized sweatshirt with dropped shoulders and ribbed neck trim.",
    price: 170,
    image: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80"
    ],
    category: "Women",
    subCategory: "Winterwear",
    sizes: ["S", "M", "L", "XL"],
    bestseller: true,
    date: 1716625345448
  }
];

const seedDB = async () => {
    try {
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/forever');
        }
        console.log("Checking MongoDB initial seed...");
        
        const count = await productModel.countDocuments();
        if (count === 0) {
            await productModel.insertMany(sampleProducts);
            console.log("Successfully seeded", sampleProducts.length, "products into MongoDB!");
        } else {
            console.log("Database already has", count, "products. Skipping seed.");
        }
    } catch (err) {
        console.log("Seeding Note:", err.message);
    }
};

export { sampleProducts, seedDB };
