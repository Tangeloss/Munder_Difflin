// productModel.js

// Stub method to fetch all products
function getAllProducts() {
    return [
        { id: 1, name: "Chair", price: 100 },
        { id: 2, name: "Table", price: 200 }
    ];
}

// Stub method to fetch a product by ID
function getProductById(productId) {
    // For now, let's return a hardcoded product
    return { id: productId, name: "Chair", price: 100 };
}

// Stub method to fetch products by type
function getProductsByType(type) {
    // For now, let's return all products
    return getAllProducts();
}

// Stub method to add a new product
function addNewProduct(productData) {
    // For now, let's just log the product data
    console.log("Received product data:", productData);
    // Return a success message
    return { message: "Product added successfully" };
}

module.exports = {
    getAllProducts,
    getProductById,
    getProductsByType,
    addNewProduct
};
