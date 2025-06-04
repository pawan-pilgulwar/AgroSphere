# AgroSphere 🌱

AgroSphere is a modern e-commerce platform dedicated to agricultural products and services. It provides a seamless marketplace for farmers, agricultural businesses, and consumers to connect, trade, and manage agricultural resources.

## Features ✨

- **User Authentication**
  - Secure login and registration system
  - User profile management
  - Role-based access control

- **Product Management**
  - Browse agricultural products
  - Detailed product listings
  - Category-based navigation
  - Product search functionality

- **Shopping Experience**
  - Shopping cart functionality
  - Wishlist management
  - Order tracking
  - Secure checkout process

- **Lease Market**
  - Agricultural equipment leasing
  - Land leasing marketplace
  - Lease agreement management

- **User Dashboard**
  - Order history
  - Profile settings
  - Account preferences
  - Wishlist management

## Tech Stack 🛠

- **Frontend**
  - Next.js 14
  - React
  - Tailwind CSS
  - Lucide Icons

- **Backend**
  - Node.js
  - Express.js
  - MongoDB

- **Authentication**
  - JWT (JSON Web Tokens)
  - Secure password hashing

## Getting Started 🚀

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/agrosphere.git
   cd agrosphere
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure 📁

```
agrosphere/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── components/        # Reusable components
│   ├── context/          # React context providers
│   └── ...               # Other app directories
├── components/            # Shared components
├── dataBase/             # Database models and utilities
├── public/               # Static assets
└── ...                   # Configuration files
```

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact 📧

For any queries or support, please reach out to:
- Email: support@agrosphere.com
- Website: [www.agrosphere.com](https://www.agrosphere.com)

## Acknowledgments 🙏

- Thanks to all contributors who have helped shape this project
- Special thanks to the open-source community for their invaluable tools and resources
