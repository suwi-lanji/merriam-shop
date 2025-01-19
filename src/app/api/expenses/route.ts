/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import clientPromise from "@/server/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

interface Expense {
  _id?: string;
  expense_name: string;
  category: string;
  amount: number;
  date: Date;
  description?: string; // Optional field
  createdAt?: Date;
  updatedAt?: Date;
}

// GET: Fetch all expenses
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('merriam-shop');
    const expenses = await db.collection<Expense>('expenses').find({}).toArray();
    return NextResponse.json(expenses);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unable to fetch expenses' }, { status: 500 });
  }
}

// POST: Create a new expense
export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('merriam-shop');
    const body: Expense = await request.json();

    const expense = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection<Expense>('expenses').insertOne(expense);
    return NextResponse.json({ message: 'Expense created', id: result.insertedId }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unable to create expense' }, { status: 500 });
  }
}

// PUT: Update an expense
export async function PUT(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('merriam-shop');
    const body: Expense & { _id: string } = await request.json();

    const { _id, ...updateData } = body;

    const result = await db.collection<Expense>('expenses').updateOne(
      { _id: new ObjectId(_id) },
      { $set: { ...updateData, updatedAt: new Date() } }
    );

    return NextResponse.json({ message: 'Expense updated', modifiedCount: result.modifiedCount });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unable to update expense' }, { status: 500 });
  }
}

// DELETE: Delete an expense
export async function DELETE(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db('merriam-shop');
    const { _id } = await request.json();

    const result = await db.collection<Expense>('expenses').deleteOne({ _id: new ObjectId(_id) });

    return NextResponse.json({ message: 'Expense deleted', deletedCount: result.deletedCount });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Unable to delete expense' }, { status: 500 });
  }
}