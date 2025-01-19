# Merriam-Shop

**Merriam-Shop** is a **Store Management Application** built with **Next.js**, **Tailwind CSS**, **shadcn/ui**, **NextAuth.js**, and **MongoDB**. It is designed to help small vendors manage their store operations, including products, orders, expenses, credits, and purchases.

---

## Features

- **Product Management**:
  - Add, update, delete, and view products.
  - Track product stock levels.
- **Order Management**:
  - Create and manage orders.
  - Track order status (pending, completed, cancelled).
- **Expense Tracking**:
  - Record and categorize expenses.
  - View expense history.
- **Credit Management**:
  - Track credits given to customers.
  - Mark credits as paid or pending.
- **Purchase Management**:
  - Record purchases from suppliers.
  - Track received and pending purchases.
- **Authentication**:
  - Secure login and registration using **NextAuth.js**.
  - Role-based access control (e.g., admin, vendor).

---

## Technologies Used

- **Frontend**:
  - [Next.js](https://nextjs.org/): React framework for server-side rendering and static site generation.
  - [Tailwind CSS](https://tailwindcss.com/): Utility-first CSS framework for styling.
  - [shadcn/ui](https://ui.shadcn.com/): Beautifully designed UI components.
- **Backend**:
  - [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction): Built-in API routes for backend logic.
  - [MongoDB](https://www.mongodb.com/): NoSQL database for storing application data.
- **Authentication**:
  - [NextAuth.js](https://next-auth.js.org/): Authentication library for Next.js.
- **Other Tools**:
  - [TypeScript](https://www.typescriptlang.org/): Static typing for JavaScript.
  - [MongoDB Node.js Driver](https://www.mongodb.com/docs/drivers/node/current/): Official MongoDB driver for Node.js.

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Git (for version control)

### Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/suwi-lanji/merriam-shop.git
   cd merriam-shop
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env.local` file in the root directory and add the following variables:

   ```env
   MONGODB_URI=mongodb://localhost:27017/merriam-shop
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Seed the Database** (Optional):
   Run the seed script to populate the database with sample data:

   ```bash
   npx ts-node seed.ts
   ```

5. **Run the Application**:
   Start the development server:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

---

## Authentication

The application uses **NextAuth.js** for authentication. Supported providers include:

- Email/Password
- Google
- GitHub

To add more providers, update the `src/app/auth/[...nextauth]/route.ts` file.

---

## API Routes

The application uses Next.js API routes for backend logic. Here are the available routes:

- **Products**:

  - `GET /api/products`: Fetch all products.
  - `POST /api/products`: Create a new product.
  - `PUT /api/products`: Update a product.
  - `DELETE /api/products`: Delete a product.

- **Orders**:

  - `GET /api/orders`: Fetch all orders.
  - `POST /api/orders`: Create a new order.
  - `PUT /api/orders`: Update an order.
  - `DELETE /api/orders`: Delete an order.

- **Expenses**:

  - `GET /api/expenses`: Fetch all expenses.
  - `POST /api/expenses`: Create a new expense.
  - `PUT /api/expenses`: Update an expense.
  - `DELETE /api/expenses`: Delete an expense.

- **Credits**:

  - `GET /api/credits`: Fetch all credits.
  - `POST /api/credits`: Create a new credit.
  - `PUT /api/credits`: Update a credit.
  - `DELETE /api/credits`: Delete a credit.

- **Purchases**:
  - `GET /api/purchases`: Fetch all purchases.
  - `POST /api/purchases`: Create a new purchase.
  - `PUT /api/purchases`: Update a purchase.
  - `DELETE /api/purchases`: Delete a purchase.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/getting-started/introduction)
- [MongoDB Documentation](https://www.mongodb.com/docs/)

---

## Contact

For questions or feedback, please reach out to [suwilanjichipofya@outlook.com](mailto:suwilanjichipofya@outlook.com).

---

Enjoy managing your store with **Merriam-Shop**! 🚀
