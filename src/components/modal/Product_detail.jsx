import './product_detail.css';
import '../ui/color.css';
import { FaWhatsapp } from "react-icons/fa";

function ProductDetailModal({ isOpen, onClose, product }) {
  if (!isOpen || !product) return null;

  const { title, description, image, price, url_contact, location, seller } = product;

  return (
    <div className="product-modal__overlay" onClick={onClose}>
      <div
        className="product-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="product-modal__close-button"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="product-modal__body">
          <div className="product-modal__image-wrapper">
            <img
              src={image}
              alt={title}
              className="product-modal__image"
            />
          </div>

          <div className="product-modal__info">
            <h3 className="product-modal__title blue_gray_900">{title}</h3>
            <p className="product-modal__description blue_gray_800">
              {description}
            </p>
            {price != null && (
              <p className="product-modal__price teal_800">{price}</p>
            )}
            <a 
              className="product-modal__contact-button btn-contact"
              href={url_contact}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="whatsapp-icon" />
               Contactar al vendedor
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailModal;
