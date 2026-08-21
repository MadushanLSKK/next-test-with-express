import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    
    image: {
        type: String,
        
    },
},{
    timestamps: true,
});

 const Product =mongoose.models.Product || mongoose.model("Product", productSchema);
 export default Product;
