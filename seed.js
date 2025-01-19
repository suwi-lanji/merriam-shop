import { MongoClient, ObjectId } from 'mongodb';

const uri = "mongodb://localhost:27017/merriam-shop"

async function seedDatabase() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('merriam-shop');

    // Seed Products
    const products = [
      {
        _id: new ObjectId(), // Generate a new ObjectId
        image: "https://example.com/image1.jpg",
        name: "Product A",
        description: "High-quality product A",
        order_price: 50,
        selling_price: 100,
        status: "active",
        stock: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: new ObjectId(), // Generate a new ObjectId
        image: "https://example.com/image2.jpg",
        name: "Product B",
        description: "Premium product B",
        order_price: 75,
        selling_price: 150,
        status: "active",
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: new ObjectId(), // Generate a new ObjectId
        image: "https://example.com/image3.jpg",
        name: "Product C",
        description: "Economical product C",
        order_price: 20,
        selling_price: 40,
        status: "inactive",
        stock: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await db.collection('products').insertMany(products);
    console.log('Products seeded successfully');

    // Seed Orders
    const orders = [
      {
        order_number: "ORD1001",
        status: "pending",
        products: [
          { product_id: products[0]._id, quantity: 2 },
          { product_id: products[1]._id, quantity: 1 },
        ],
        amount: 350,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        order_number: "ORD1002",
        status: "completed",
        products: [
          { product_id: products[2]._id, quantity: 5 },
        ],
        amount: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await db.collection('orders').insertMany(orders);
    console.log('Orders seeded successfully');

    // Seed Expenses
    const expenses = [
      {
        expense_name: "Rent",
        category: "Utilities",
        amount: 1000,
        date: new Date("2023-10-01"),
        description: "Monthly shop rent",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        expense_name: "Electricity Bill",
        category: "Utilities",
        amount: 200,
        date: new Date("2023-10-05"),
        description: "October electricity bill",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        expense_name: "Office Supplies",
        category: "Miscellaneous",
        amount: 50,
        date: new Date("2023-10-10"),
        description: "Pens, papers, etc.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await db.collection('expenses').insertMany(expenses);
    console.log('Expenses seeded successfully');

    // Seed Credits
    const credits = [
      {
        debtor_name: "John Doe",
        amount: 500,
        date: new Date("2023-10-01"),
        status: "pending",
        description: "Credit for bulk purchase",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        debtor_name: "Jane Smith",
        amount: 300,
        date: new Date("2023-10-15"),
        status: "paid",
        description: "Credit for emergency order",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await db.collection('credits').insertMany(credits);
    console.log('Credits seeded successfully');

    // Seed Purchases
    const purchases = [
      {
        products: [
          { product_id: products[0]._id, quantity: 10 },
          { product_id: products[1]._id, quantity: 5 },
        ],
        total_amount: 1000,
        date: new Date("2023-10-01"),
        received: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        products: [
          { product_id: products[2]._id, quantity: 20 },
        ],
        total_amount: 400,
        date: new Date("2023-10-10"),
        received: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await db.collection('purchases').insertMany(purchases);
    console.log('Purchases seeded successfully');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

seedDatabase();