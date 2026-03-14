# Debugging HTTP 401 Login Error

## El problema: HTTP 401 en login

HTTP 401 significa "Unauthorized" - el backend rechaza las credenciales.

## Checklist de debugging

### 1. ✅ Verifica en la consola del navegador
Abre DevTools (F12) → Console y busca:
- Mensajes de `POST /auth/login:`
- El mensaje de error exacto del backend
- Los datos que se envían

**Ejemplo de salida esperada:**
```
POST /auth/login: { email: "test@example.com", password: "..." }
POST /auth/login failed: Invalid credentials
```

### 2. ✅ Verifica que el backend esté corriendo
```bash
# Verifica que el servidor esté en http://localhost:3001
curl http://localhost:3001/api/auth/login \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass123"}'
```

### 3. ✅ Verifica el endpoint en el backend

Tu backend debe responder a:
```
POST http://localhost:3001/api/auth/login
```

Con un body JSON:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Y retornar:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "usr_123",
    "nombre": "Juan",
    "email": "user@example.com",
    "phone": "+573001234567",
    "verified": false
  }
}
```

### 4. ✅ Causas comunes de HTTP 401

| Problema | Solución |
|----------|----------|
| Usuario no existe | Verificar que el email esté registrado |
| Contraseña incorrecta | Verificar la contraseña |
| Backend no responde | Verificar que `http://localhost:3001` esté corriendo |
| Formato de respuesta incorrecto | El backend debe retornar `{ token, user }` |
| El backend espera otro formato | Revisar la documentación del backend |

### 5. ✅ Prueba con cURL

```bash
# Test 1: Verificar que el servidor responde
curl http://localhost:3001/api/auth/login

# Test 2: Enviar credenciales válidas
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'

# Test 3: Enviar credenciales inválidas (para ver qué responde)
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"nonexistent@example.com","password":"wrong"}'
```

### 6. ✅ Verifica el .env

Asegúrate de que `.env` contenga:
```
VITE_API_BASE_URL=http://localhost:3001/api
```

### 7. ✅ Network tab del navegador

DevTools → Network tab → Intenta login:
- Busca la solicitud `auth/login` (POST)
- Click en ella
- Pestaña **Request**: Verifica los datos enviados
- Pestaña **Response**: Verifica la respuesta del servidor
- Status: Debería ser 200-201 (no 401)

## Posibles soluciones según el error

### Si el backend retorna "Invalid credentials"
El usuario/contraseña son incorrectos. Verifica:
- ¿Existe ese usuario en la BD?
- ¿La contraseña es correcta?
- ¿Las credenciales de test están creadas?

### Si el backend retorna "User not found"
El usuario no existe. Necesitas:
- Crear el usuario primero (signup)
- O usar credenciales que existan en el backend

### Si el backend retorna algo diferente
El backend puede retornar un error diferente. Revisa el mensaje exacto en:
- Network tab → Response
- o Consola del navegador

### Si hay error de CORS
Verifica que el backend permitta requests desde `http://localhost:5173`:
```javascript
// En el backend (example)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

## Datos de prueba recomendados

Asegúrate de tener en tu backend al menos un usuario de prueba:

```json
{
  "id": "usr_test_001",
  "nombre": "Usuario Test",
  "email": "test@example.com",
  "phone": "+573001234567",
  "password": "Test123456", // Debe ser hashado en la BD
  "verified": false
}
```

## Script de debugging

Puedes pegar esto en la consola del navegador para debug:

```javascript
// Verifica la URL base
console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);

// Verifica el token almacenado
console.log('Token stored:', localStorage.getItem('token'));

// Prueba la solicitud manualmente
fetch('http://localhost:3001/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'testpass123'
  })
})
.then(res => {
  console.log('Status:', res.status);
  return res.json();
})
.then(data => console.log('Response:', data))
.catch(err => console.error('Error:', err));
```

## Mejoras implementadas en el código

✅ Better error parsing en `apiClient.js`
✅ Logging mejorado para ver exactamente qué se envía
✅ Mensajes de error más claros
✅ Network debugging habilitado en consola

## Próximos pasos

1. Abre DevTools (F12) → Console
2. Intenta hacer login
3. Busca los mensajes `POST /auth/login:` en la consola
4. Lee el error exacto que retorna el backend
5. Verifica que el backend tiene el endpoint `/auth/login`
6. Verifica que el usuario existe en la BD
7. Verifica que la contraseña es correcta

**Comparte el error exacto de la consola y estaré listo para ayudarte!**
