# API Architecture Guide

## Overview

This document describes the centralized API configuration and session management system implemented across the Segunda Mano app.

## Project Structure

```
src/
├── api/
│   ├── apiClient.js          # Base HTTP client with token handling
│   ├── auth.api.js           # Authentication endpoints
│   ├── products.api.js       # Product management endpoints
│   ├── search.api.js         # Search endpoints
│   └── categories.api.js     # Category endpoints
├── userProcess/
│   ├── UserContext.jsx       # User context provider (token-based)
│   ├── useAuth.js            # Auth hook (recommended)
│   └── useUser.js            # Legacy hook (still supported)
└── ...
```

## Environment Configuration

### .env File

```
VITE_API_BASE_URL=http://localhost:3001/api
```

This is the **only place** where the API base URL should be defined. All API calls use this configuration automatically.

## API Client Architecture

### apiClient.js

The base HTTP client that handles:
- ✅ Automatic Authorization header injection with token
- ✅ Centralized fetch logic
- ✅ Error handling
- ✅ Consistent response handling

**Usage:**

```javascript
import { apiClient } from '@/api/apiClient';

// GET
const data = await apiClient.get('/products');

// POST
const result = await apiClient.post('/auth/login', { email, password });

// PUT
const updated = await apiClient.put('/products/1', { title: 'New Title' });

// DELETE
await apiClient.delete('/products/1');
```

The client automatically includes the Authorization header:
```
Authorization: Bearer <token>
```

## API Endpoints Layer

All API endpoints are organized in dedicated files. **Never make direct fetch calls from components.**

### auth.api.js

```javascript
import { loginUser, registerUser, getCurrentUser, logoutUser } from '@/api/auth.api';

// Login
const { token, user } = await loginUser(email, password);

// Register
const { token, user } = await registerUser({ nombre, email, phone, password });

// Get current user (requires valid token)
const user = await getCurrentUser();

// Logout
await logoutUser();
```

### products.api.js

```javascript
import { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  getUserProducts 
} from '@/api/products.api';

// Get all products
const products = await getProducts();

// Get single product
const product = await getProductById(1);

// Create product
const newProduct = await createProduct(productData);

// Update product
const updated = await updateProduct(1, updatedData);

// Delete product
await deleteProduct(1);

// Get user's own products
const myProducts = await getUserProducts();
```

### search.api.js

```javascript
import { searchProducts, searchByCategory, searchByLocation } from '@/api/search.api';

// Search products
const results = await searchProducts('laptop');

// Search by category
const results = await searchByCategory(categoryId);

// Search by location
const results = await searchByLocation('Madrid');
```

### categories.api.js

```javascript
import { getCategories, getCategoryById, getProductsByCategory } from '@/api/categories.api';

// Get all categories
const categories = await getCategories();

// Get category
const category = await getCategoryById(1);

// Get products in category
const products = await getProductsByCategory(1);
```

## Session Management

### Token-Based Authentication

The app now uses **token-based authentication** instead of storing user objects in localStorage.

**Flow:**

1. On login/signup: Backend returns `{ token, user }`
2. Token is stored in localStorage
3. Token is automatically added to all API requests
4. On app load: Call `/auth/me` to validate token and load user data
5. If token invalid: It's removed, user is logged out

### UserContext and useAuth Hook

**UserContext.jsx** provides:
- `user` - Current authenticated user (loaded from `/auth/me`)
- `login(token, userData)` - Store token and set user
- `logout()` - Clear token and redirect to login
- `isLoading` - Session validation state

**Hooks:**

```javascript
// Recommended: useAuth hook
import { useAuth } from '@/userProcess/useAuth';

function MyComponent() {
  const { user, login, logout, isLoading } = useAuth();
  
  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Not logged in</div>;
  
  return <div>Welcome {user.nombre}</div>;
}

// Legacy: useUser hook (still works)
import { useUser } from '@/userProcess/useUser';
const { user, login, logout, isLoading } = useUser();
```

## Component Refactoring Examples

### ❌ Before (Direct Fetch)

```javascript
function MyComponent() {
  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);
}
```

### ✅ After (Using API Layer)

```javascript
import { getProducts } from '@/api/products.api';

function MyComponent() {
  useEffect(() => {
    getProducts()
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);
}
```

## Key Updates in Pages

### Login/Signup (AuthForm.jsx)

- Uses `loginUser()` and `registerUser()` from API
- Stores token via `login()` from useAuth
- No localStorage for user data

### MisProductos.jsx

- Uses `getProducts()`, `createProduct()`, `updateProduct()`, `deleteProduct()`
- Uses `useAuth()` for user context
- No direct fetch calls
- Token automatically included in requests

### Profile.jsx

- Uses `getProducts()` to count user's products
- Uses `useAuth()` for logout
- No localStorage access

### Home.jsx

- Uses `getProducts()` via product_list component
- Clean and simplified

## Migration Checklist

Before deploying, ensure:

- ✅ No hardcoded `fetch()` calls in components
- ✅ No hardcoded URLs like `http://localhost:3001`
- ✅ No localStorage for user data
- ✅ All API calls use `src/api/` layer
- ✅ Token is stored in localStorage (not user object)
- ✅ `useAuth()` hook used instead of `localStorage.getItem('user')`
- ✅ `/auth/me` endpoint working on backend
- ✅ All components use centralized API configuration

## Backend Requirements

Your backend must support:

1. **Login Endpoint**
   ```
   POST /api/auth/login
   Request: { email, password }
   Response: { token, user: { id, nombre, email, phone, verified } }
   ```

2. **Register Endpoint**
   ```
   POST /api/auth/register
   Request: { nombre, email, phone, password }
   Response: { token, user: { id, nombre, email, phone } }
   ```

3. **Auth/Me Endpoint**
   ```
   GET /api/auth/me
   Headers: Authorization: Bearer <token>
   Response: { id, nombre, email, phone, verified }
   ```

4. **Logout Endpoint** (optional)
   ```
   POST /api/auth/logout
   Headers: Authorization: Bearer <token>
   ```

5. **Products Endpoints**
   - `GET /api/products` - All products
   - `GET /api/products/:id` - Single product
   - `POST /api/products` - Create (requires auth)
   - `PUT /api/products/:id` - Update (requires auth)
   - `DELETE /api/products/:id` - Delete (requires auth)
   - `GET /api/products/me` - User's products (requires auth)

## Adding New API Endpoints

When adding new endpoints:

1. **Create a new API file** in `src/api/`
   ```javascript
   import { apiClient } from './apiClient';
   
   export const myEndpoint = async (data) => {
     return apiClient.post('/my-endpoint', data);
   };
   ```

2. **Import and use in components**
   ```javascript
   import { myEndpoint } from '@/api/my.api';
   ```

3. **Never hardcode URLs** - Always use the API layer

## Troubleshooting

### Token Not Being Sent

Check that:
- Token is stored in localStorage: `localStorage.getItem('token')`
- Using apiClient (not direct fetch)
- Backend is reading `Authorization: Bearer <token>` header

### Session Lost After Refresh

This is expected if:
- Token expired
- `/auth/me` returns 401/403
- Check that UserContext is validating on app load

### "useAuth must be used within UserProvider"

Ensure the component is wrapped by `<UserProvider>` in the app root.

## Future Enhancements

- Refresh token mechanism
- Token expiration handling
- Automatic logout on 401
- Request/response interceptors
- Error boundary integration
- API versioning support

---

**Last Updated:** March 14, 2026
**Architecture Version:** 1.0 (Token-Based, Centralized API)
