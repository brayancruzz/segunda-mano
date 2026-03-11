export const products = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/products');
    
    if (!response.ok) {
      throw new Error('Error de red al intentar obtener los productos');
    }

    const data = await response.json();
    return data; 
    
  } catch (error) {
    console.error("Error en products:", error);
    return []; 
  }
};