import clientPromise from "@/server/lib/mongodb";
import { NextResponse } from "next/server";

interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
}

// Handle GET requests
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('merriam-shop');

    const data = await db.collection<Product>('products').find({}).toArray();
    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unable to connect to database' }, { status: 500 });
  }
}

// Handle POST requests (optional example)
export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('merriam-shop');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body: Product = await request.json(); // Parse the request body
    const result = await db.collection<Product>('products').insertOne(body);

    return NextResponse.json({ message: 'Product added', id: result.insertedId }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unable to add product' }, { status: 500 });
  }
}