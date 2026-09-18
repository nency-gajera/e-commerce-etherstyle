import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// function for add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        let imagesUrl = [];

        try {
            if (process.env.CLOUDINARY_NAME && process.env.CLOUDINARY_NAME !== 'sample_cloud') {
                imagesUrl = await Promise.all(
                    images.map(async (item) => {
                        let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                        return result.secure_url;
                    })
                );
            } else {
                const host = req.protocol + '://' + req.get('host');
                imagesUrl = images.map((item) => `${host}/uploads/${item.filename}`);
            }
        } catch (uploadError) {
            console.log("Cloudinary upload fallback to local storage:", uploadError.message);
            const host = req.protocol + '://' + req.get('host');
            imagesUrl = images.map((item) => item.filename ? `${host}/uploads/${item.filename}` : `https://picsum.photos/seed/${Date.now()}/600/750`);
        }

        const stockVal = req.body.stock !== undefined ? Number(req.body.stock) : 10;

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" || bestseller === true ? true : false,
            sizes: JSON.parse(sizes),
            stock: stockVal,
            inStock: stockVal > 0,
            image: imagesUrl.length > 0 ? imagesUrl : ["https://picsum.photos/seed/etherstyle1/600/750"],
            date: Date.now()
        };

        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Product Added Successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// function for list product
const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// function for removing product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// function for updating product
const updateProduct = async (req, res) => {
    try {
        const { id, name, description, price, category, subCategory, sizes, bestseller, stock } = req.body;

        const product = await productModel.findById(id);
        if (!product) {
            return res.json({ success: false, message: "Product not found" });
        }

        const image1 = req.files?.image1 && req.files.image1[0];
        const image2 = req.files?.image2 && req.files.image2[0];
        const image3 = req.files?.image3 && req.files.image3[0];
        const image4 = req.files?.image4 && req.files.image4[0];

        const newImages = [image1, image2, image3, image4].filter((item) => item !== undefined);

        let imagesUrl = product.image;

        if (newImages.length > 0) {
            try {
                if (process.env.CLOUDINARY_NAME && process.env.CLOUDINARY_NAME !== 'sample_cloud') {
                    imagesUrl = await Promise.all(
                        newImages.map(async (item) => {
                            let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                            return result.secure_url;
                        })
                    );
                } else {
                    const host = req.protocol + '://' + req.get('host');
                    imagesUrl = newImages.map((item) => `${host}/uploads/${item.filename}`);
                }
            } catch (uploadError) {
                console.log("Cloudinary upload fallback to local storage:", uploadError.message);
                const host = req.protocol + '://' + req.get('host');
                imagesUrl = newImages.map((item) => item.filename ? `${host}/uploads/${item.filename}` : `https://picsum.photos/seed/${Date.now()}/600/750`);
            }
        }

        const stockNum = stock !== undefined ? Number(stock) : product.stock;
        const parsedSizes = typeof sizes === 'string' ? JSON.parse(sizes) : (sizes || product.sizes);

        const updateData = {
            name: name || product.name,
            description: description || product.description,
            price: price !== undefined ? Number(price) : product.price,
            category: category || product.category,
            subCategory: subCategory || product.subCategory,
            sizes: parsedSizes,
            bestseller: bestseller === "true" || bestseller === true,
            stock: stockNum,
            inStock: stockNum > 0,
            image: imagesUrl
        };

        await productModel.findByIdAndUpdate(id, updateData);
        res.json({ success: true, message: "Product Updated Successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        res.json({ success: true, product });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { listProducts, addProduct, removeProduct, singleProduct, updateProduct };
