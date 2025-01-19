import clientPromise from "@/server/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

interface Order {
  _id?: string;
  order_number: string;
  status: "pending" | "completed" | "cancelled";
  products: { product_id: string; quantity: number }[]; // Array of products with quantities
  amount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// GET: Fetch all orders
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('merriam-shop');
    const orders = await db.collection<Order>('orders').find({}).toArray();
    return NextResponse.json(orders);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unable to fetch orders' }, { status: 500 });
  }
}

// POST: Create a new order
export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('merriam-shop');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body: Order = await request.json();

    const order = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection<Order>('orders').insertOne(order);
    return NextResponse.json({ message: 'Order created', id: result.insertedId }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unable to create order' }, { status: 500 });
  }
}

// PUT: Update an order
export async function PUT(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('merriam-shop');
    const body: Order & { _id: string } = await request.json();

    const { _id, ...updateData } = body;

    const result = await db.collection<Order>('orders').updateOne(
      { _id: new ObjectId(_id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );

    return NextResponse.json({ message: 'Order updated', modifiedCount: result.modifiedCount });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unable to update order' }, { status: 500 });
  }
}

// DELETE: Delete an order
export async function DELETE(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('merriam-shop');
    const { _id } = await request.json();

    const result = await db.collection<Order>('orders').deleteOne({ _id: new ObjectId(_id) });

    return NextResponse.json({ message: 'Order deleted', deletedCount: result.deletedCount });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unable to delete order' }, { status: 500 });
  }
}