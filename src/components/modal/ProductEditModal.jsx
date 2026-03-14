import { useState, useEffect } from 'react';
import './product_edit_modal.css';
import '../ui/color.css';

function ProductEditModal({ isOpen, onClose, onSave, product }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    condition: "",
    price: "",
    image: "",
    url_contact: "",
    ubicacion: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title || "",
        description: product.description || "",
        condition: product.condition || "",
        price: product.price || "",
        image: product.image || "",
        url_contact: product.url_contact || "",
        ubicacion: product.ubicacion || "",
      });
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    // Basic validation
    if (!form.title || !form.description || !form.price || !form.image || !form.url_contact || !form.ubicacion) {
      alert('Todos los campos son obligatorios');
      return;
    }

    setIsSaving(true);
    try {
      await onSave(form);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="product-edit-modal__overlay" onClick={onClose}>
      <div
        className="product-edit-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="product-edit-modal__close-button"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="product-edit-modal__body">
          <h3 className="product-edit-modal__title blue_gray_900">Editar producto</h3>

          <div className="product-edit-modal__form">
            <div className="form-group">
              <label className="blue_gray_900">Título</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="input-search"
              />
            </div>

            <div className="form-group">
              <label className="blue_gray_900">Descripción</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="input-search"
              />
            </div>

            <div className="form-group">
              <label className="blue_gray_900">Estado</label>
              <input
                type="text"
                name="condition"
                value={form.condition}
                onChange={handleChange}
                className="input-search"
              />
            </div>

            <div className="form-group">
              <label className="blue_gray_900">Precio</label>
              <input
                type="text"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="input-search"
              />
            </div>

            <div className="form-group">
              <label className="blue_gray_900">Imagen (URL)</label>
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                className="input-search"
              />
            </div>

            <div className="form-group">
              <label className="blue_gray_900">URL de contacto</label>
              <input
                type="text"
                name="url_contact"
                value={form.url_contact}
                onChange={handleChange}
                className="input-search"
              />
            </div>

            <div className="form-group">
              <label className="blue_gray_900">Ubicación</label>
              <input
                type="text"
                name="ubicacion"
                value={form.ubicacion}
                onChange={handleChange}
                className="input-search"
              />
            </div>
          </div>
        </div>

        <div className="product-edit-modal__actions">
          <button
            type="button"
            className="btn-primary"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductEditModal;
