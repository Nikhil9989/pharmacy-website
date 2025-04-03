# Pharmacy/Drugstore Website System

A modern, scalable web application for managing pharmacy operations, inventory, and e-commerce functionality.

## Project Overview

This project implements a comprehensive pharmacy management system with a modern tech stack. The system follows a modular architecture with separate frontend and backend components, allowing for scalability and maintainability.

### Key Features (Phase 1)

- **Core System Architecture**: Modern, scalable architecture with separate frontend and backend
- **User Management**: User registration, authentication, and role-based access control
- **Basic Inventory Management**: Product categorization and inventory tracking

## Technical Stack

### Backend
- Node.js with Express
- TypeScript
- MongoDB for user data
- PostgreSQL for inventory and transactional data
- JWT-based authentication

### Frontend (Coming Soon)
- React.js with TypeScript
- Redux for state management
- Material UI or Tailwind CSS

### DevOps
- Docker containerization
- Database migrations
- GitHub Actions for CI/CD

## Implementation Progress

### Phase 1 (Current)
- ✅ Core System Architecture Setup
- ✅ User Management and Authentication
- ✅ Basic Inventory Management

### Future Phases
- 🔄 Phase 2: Advanced inventory features, notification system, reporting foundation
- 🔄 Phase 3: E-commerce capabilities, prescription management, external system integration
- 🔄 Phase 4: Advanced reporting and analytics, system optimization, comprehensive QA

## Project Structure

```
pharmacy-website/
├── backend/             # Backend application
│   ├── src/
│   │   ├── config/      # Configuration files
│   │   ├── controllers/ # Request handlers
│   │   ├── middleware/  # Express middleware
│   │   ├── models/      # Data models
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business logic
│   │   └── utils/       # Utility functions
│   ├── Dockerfile       # Docker configuration
│   └── package.json
├── frontend/            # Frontend application (coming soon)
├── docker-compose.yml   # Docker compose configuration
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14+)
- Docker and Docker Compose
- MongoDB
- PostgreSQL

### Development Setup

1. Clone the repository
```bash
git clone https://github.com/Nikhil9989/pharmacy-website.git
cd pharmacy-website
```

2. Install dependencies
```bash
cd backend
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start development servers
```bash
# Option 1: Using Docker
docker-compose up -d

# Option 2: Without Docker
cd backend
npm run dev
```

5. Access the API at `http://localhost:5000`

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh-token` - Refresh access token
- `GET /api/auth/me` - Get current user profile

### User Management Endpoints
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `POST /api/users/:id/deactivate` - Deactivate user (Admin only)
- `POST /api/users/:id/reactivate` - Reactivate user (Admin only)

### Inventory Endpoints
- `GET /api/inventory/products` - Get all products
- `POST /api/inventory/products` - Create new product
- `GET /api/inventory/products/:id` - Get product by ID
- `PUT /api/inventory/products/:id` - Update product
- `DELETE /api/inventory/products/:id` - Delete product

- `GET /api/inventory/categories` - Get all categories
- `POST /api/inventory/categories` - Create new category
- `GET /api/inventory/categories/:id` - Get category by ID
- `PUT /api/inventory/categories/:id` - Update category
- `DELETE /api/inventory/categories/:id` - Delete category

- `GET /api/inventory/stock` - Get stock levels
- `GET /api/inventory/stock/low` - Get low stock items
- `GET /api/inventory/stock/expiring` - Get expiring items

## License

This project is licensed under the MIT License - see the LICENSE file for details.
