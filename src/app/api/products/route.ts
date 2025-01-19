/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import clientPromise from "@/server/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

interface Product {
  _id?: string;
  image: string;
  name: string;
  description: string;
  order_price: number;
  selling_price: number;
  status: "active" | "inactive";
  stock: number; // Added field to track inventory
  createdAt?: Date; // Added field for creation timestamp
  updatedAt?: Date; // Added field for update timestamp
}

// GET: Fetch all products
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('merriam-shop');
    const products = await db.collection<Product>('products').find({}).toArray();
    return NextResponse.json(products);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unable to fetch products' }, { status: 500 });
  }
}

// POST: Create a new product
export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('merriam-shop');
    const body: Product = await request.json();

    const product = {
      ...body,
      stock: body.stock || 0, // Default stock to 0 if not provided
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection<Product>('products').insertOne(product);
    return NextResponse.json({ message: 'Product created', id: result.insertedId }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unable to create product' }, { status: 500 });
  }
}

// PUT: Update a product
export async function PUT(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('merriam-shop');
    const body: Product & { _id: string } = await request.json();

    const { _id, ...updateData } = body;

    const result = await db.collection<Product>('products').updateOne(
      { _id: new ObjectId(_id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );

    return NextResponse.json({ message: 'Product updated', modifiedCount: result.modifiedCount });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unable to update product' }, { status: 500 });
  }
}

// DELETE: Delete a product
export async function DELETE(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('merriam-shop');
    const { _id } = await request.json();

    const result = await db.collection<Product>('products').deleteOne({ _id: new ObjectId(_id) });

    return NextResponse.json({ message: 'Product deleted', deletedCount: result.deletedCount });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unable to delete product' }, { status: 500 });
  }
}