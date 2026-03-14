import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../components/page_css/root.css';
import '../components/ui/color.css';
import '../components/page_css/MisProductos.css';
import Card from "../components/layout/Card";
import ProductEditModal from "../components/modal/ProductEditModal";
import ProductCreateModal from "../components/modal/ProductCreateModal";
import ConfirmationModal from "../components/modal/ConfirmationModal";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../api/products.api";
import { useAuth } from "../userProcess/useAuth";
import { FiMoreVertical } from "react-icons/fi";

function MisProductos() {
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);

  // Initialize and fetch products
  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate('/login');
      return;
    }

    fetchProducts();
  }, [user, authLoading, navigate]);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getProducts();

      // Filter products by current user
      const userProducts = data.filter(p => p.seller?.id === user?.id);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError('No se pudieron cargar los productos. Intenta más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = products.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  // Open edit modal
  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
    setMenuOpenId(null);
  };

  // Open delete confirmation
  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
    setMenuOpenId(null);
  };

  // Save edited product
  const handleSaveProductEdit = async (updatedData) => {
    if (!selectedProduct) return;

    try {
      await updateProduct(selectedProduct.id, updatedData);

      // Refresh products list
      await fetchProducts();
      setEditModalOpen(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error('Error updating product:', err);
      alert('Error al actualizar el producto');
    }
  };

  // Confirm delete product
  const handleConfirmDelete = async () => {
    if (!selectedProduct) return;

    try {
      await deleteProduct(selectedProduct.id);

      // Refresh products list
      await fetchProducts();
      setDeleteModalOpen(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Error al eliminar el producto');
    }
  };

  // Handle add new product (open modal)
  const handleAddNew = () => {
    setCreateModalOpen(true);
  };

  // Save new product
  const handleSaveNewProduct = async (newProductData) => {
    try {
      await createProduct(newProductData);

      // Refresh products list
      await fetchProducts();
      setCreateModalOpen(false);
    } catch (err) {
      console.error('Error creating product:', err);
      alert('Error al crear el producto');
    }
  };

  return (
    <section className="main_container">
      <div className="body_container">
        <h2 className="blue_gray_900">Mis productos</h2>

        <div className="mis-productos-header">
          <div className="search-container">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={handleSearch}
              className="input-search"
            />
          </div>
          <button className="btn-secondary" onClick={handleAddNew}>
            Agregar nuevo
          </button>
        </div>

        {isLoading && (
          <div className="loading-state">
            <p className="blue_gray_800">Cargando productos...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <p className="blue_gray_800">{error}</p>
          </div>
        )}

        {!isLoading && filteredProducts.length === 0 && (
          <div className="empty-state">
            <p className="blue_gray_800">No tienes productos publicados</p>
          </div>
        )}

        {!isLoading && filteredProducts.length > 0 && (
          <div className="user-products">
            {filteredProducts.map(p => (
              <div key={p.id} className="product-item">
                <div className="product-card-wrapper">
                  <Card
                    title={p.title}
                    description={p.description}
                    image={p.image}
                    price={p.price}
                    url_contact={p.url_contact}
                    location={p.ubicacion}
                    seller={p.seller}
                  />
                  <div className="product-menu-container">
                    <button
                      className="product-menu-button"
                      onClick={() => setMenuOpenId(menuOpenId === p.id ? null : p.id)}
                      title="Opciones"
                    >
                      <FiMoreVertical size={20} />
                    </button>
                    {menuOpenId === p.id && (
                      <div className="product-menu-dropdown">
                        <button
                          className="menu-option"
                          onClick={() => handleEditClick(p)}
                        >
                          Editar
                        </button>
                        <button
                          className="menu-option danger"
                          onClick={() => handleDeleteClick(p)}
                        >
                          Eliminar
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ProductCreateModal
        isOpen={createModalOpen}
        onClose={() => {
          setCreateModalOpen(false);
        }}
        onSave={handleSaveNewProduct}
      />

      <ProductEditModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedProduct(null);
        }}
        onSave={handleSaveProductEdit}
        product={selectedProduct}
      />

      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedProduct(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Eliminar producto"
        message="¿Seguro que deseas eliminar este producto?"
        confirmText="Eliminar"
        cancelText="Cancelar"
      />
    </section>
  );
}

export default MisProductos;
