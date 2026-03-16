import { useState } from 'react';
import './product_create_modal.css';
import '../ui/color.css';

// Temporary category data - will be replaced with API endpoint
const categories = [
  { id: 1, title: "Electronics" },
  { id: 2, title: "Home" },
  { id: 3, title: "Vehicles" },
  { id: 4, title: "Clothing" }
];

// Status options - only allow users to select these
const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" }
];

const normalizePhoneNumber = (phone) => {
  if (!phone) return '';
  
  const digits = phone.replace(/\D/g, '');
  
  if (!digits) return '';
  
  if (digits.startsWith('57')) {
    return digits;
  }
  
  let normalized = digits.startsWith('0') ? digits.substring(1) : digits;
  
  return '57' + normalized;
};

const isValidPhoneNumber = (phone) => {
  const normalized = normalizePhoneNumber(phone);
  return /^57\d{10}$/.test(normalized);
};

function ProductCreateModal({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category_id: "",
    location: "",
    phone_number: "",
    image_url: "",
    status: "draft",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone_number' && phoneError) {
      setPhoneError('');
    }
    
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!form.title || !form.description || !form.price || !form.category_id) {
      alert('Title, Description, Price, and Category are required');
      return;
    }

    if (form.phone_number && !isValidPhoneNumber(form.phone_number)) {
      setPhoneError('Please enter a valid Colombian phone number');
      return;
    }

    const normalizedForm = {
      ...form,
      phone_number: form.phone_number ? normalizePhoneNumber(form.phone_number) : ''
    };

    setIsSaving(true);
    try {
      await onSave(normalizedForm);
      // Reset form
      setForm({
        title: "",
        description: "",
        price: "",
        category_id: "",
        location: "",
        phone_number: "",
        image_url: "",
        status: "draft",
      });
      setPhoneError('');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="product-create-modal__overlay" onClick={onClose}>
      <div
        className="product-create-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="product-create-modal__close-button"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="product-create-modal__body">
          <h3 className="product-create-modal__title blue_gray_900">Crear nuevo producto</h3>

          <div className="product-create-modal__form">
            <div className="form-group">
              <label className="blue_gray_900">Título *</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="input-search"
                required
              />
            </div>

            <div className="form-group">
              <label className="blue_gray_900">Descripción *</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="input-search"
                required
              />
            </div>

            <div className="form-group">
              <label className="blue_gray_900">Precio *</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="input-search"
                placeholder="0"
                required
              />
            </div>

            <div className="form-group">
              <label className="blue_gray_900">Categoría *</label>
              <select
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
                className="input-search"
                required
              >
                <option value="">Seleccionar categoría</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="blue_gray_900">Ubicación</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className="input-search"
              />
            </div>

            <div className="form-group">
              <label className="blue_gray_900">Número de teléfono</label>
              <input
                type="text"
                name="phone_number"
                value={form.phone_number}
                onChange={handleChange}
                className="input-search"
                placeholder="573001234567"
              />
              {phoneError && (
                <p style={{ color: '#dc3545', fontSize: '12px', marginTop: '4px' }}>
                  {phoneError}
                </p>
              )}
            </div>

            <div className="form-group">
              <label className="blue_gray_900">URL de imagen</label>
              <input
                type="text"
                name="image_url"
                value={form.image_url}
                onChange={handleChange}
                className="input-search"
                placeholder="https://..."
              />
            </div>

            <div className="form-group">
              <label className="blue_gray_900">Estado</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="input-search"
              >
                {statusOptions.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="product-create-modal__actions">
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
            {isSaving ? 'Creando...' : 'Crear producto'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCreateModal;
