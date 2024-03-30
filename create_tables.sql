CREATE TABLE IF NOT EXISTS "Users" (
    "user_id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "created_at" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "user_type" TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "Categories" (
    "category_id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "order_num" INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS "Products" (
    "product_id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "is_featured" INTEGER NOT NULL,
    FOREIGN KEY("category_id") REFERENCES "Categories"("category_id")
);

CREATE TABLE IF NOT EXISTS "Carts" (
    "cart_id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "user_id" INTEGER NOT NULL,
    FOREIGN KEY("user_id") REFERENCES "Users"("user_id")
);

CREATE TABLE IF NOT EXISTS "CartProducts" (
    "cart_products_id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "cart_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    FOREIGN KEY("cart_id") REFERENCES "Carts"("cart_id"),
    FOREIGN KEY("product_id") REFERENCES "Products"("product_id")
);
