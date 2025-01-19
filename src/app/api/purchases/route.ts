/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import clientPromise from "@/server/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

interface Purchase {
  _id?: string;
  products: { product_id: string; quantity: number }[];
  total_amount: number;
  date: Date;
  received: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// GET: Fetch all purchases
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('merriam-shop');
    const purchases = await db.collection<Purchase>('purchases').find({}).toArray();
    return NextResponse.json(purchases);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unable to fetch purchases' }, { status: 500 });
  }
}

// POST: Create a new purchase
export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('merriam-shop');
    const body: Purchase = await request.json();

    const purchase = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection<Purchase>('purchases').insertOne(purchase);
    return NextResponse.json({ message: 'Purchase created', id: result.insertedId }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unable to create purchase' }, { status: 500 });
  }
}

// PUT: Update a purchase
export async function PUT(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('merriam-shop');
    const body: Purchase & { _id: string } = await request.json();

    const { _id, ...updateData } = body;

    const result = await db.collection<Purchase>('purchases').updateOne(
      { _id: new ObjectId(_id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );

    return NextResponse.json({ message: 'Purchase updated', modifiedCount: result.modifiedCount });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unable to update purchase' }, { status: 500 });
  }
}

// DELETE: Delete a purchase
export async function DELETE(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('merriam-shop');
    const { _id } = await request.json();

    const result = await db.collection<Purchase>('purchases').deleteOne({ _id: new ObjectId(_id) });

    return NextResponse.json({ message: 'Purchase deleted', deletedCount: result.deletedCount });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unable to delete purchase' }, { status: 500 });
  }
}