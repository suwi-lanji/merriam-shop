import clientPromise from "@/server/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

interface Credit {
  _id?: string;
  debtor_name: string;
  amount: number;
  date: Date;
  status: "pending" | "paid";
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// GET: Fetch all credits
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('merriam-shop');
    const credits = await db.collection<Credit>('credits').find({}).toArray();
    return NextResponse.json(credits);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unable to fetch credits' }, { status: 500 });
  }
}

// POST: Create a new credit
export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('merriam-shop');
    const body: Credit = await request.json();

    const credit = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection<Credit>('credits').insertOne(credit);
    return NextResponse.json({ message: 'Credit created', id: result.insertedId }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unable to create credit' }, { status: 500 });
  }
}

// PUT: Update a credit
export async function PUT(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('merriam-shop');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body: Credit & { _id: string } = await request.json();

    const { _id, ...updateData } = body;

    const result = await db.collection<Credit>('credits').updateOne(
      { _id: new ObjectId(_id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );

    return NextResponse.json({ message: 'Credit updated', modifiedCount: result.modifiedCount });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unable to update credit' }, { status: 500 });
  }
}

// DELETE: Delete a credit
export async function DELETE(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('merriam-shop');
    const { _id } = await request.json();

    const result = await db.collection<Credit>('credits').deleteOne({ _id: new ObjectId(_id) });

    return NextResponse.json({ message: 'Credit deleted', deletedCount: result.deletedCount });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unable to delete credit' }, { status: 500 });
  }
}