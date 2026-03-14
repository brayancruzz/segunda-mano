import './confirmation_modal.css';
import '../ui/color.css';

function ConfirmationModal({ isOpen, onClose, onConfirm, title, message, confirmText = "Eliminar", cancelText = "Cancelar" }) {
  if (!isOpen) return null;

  return (
    <div className="confirmation-modal__overlay" onClick={onClose}>
      <div
        className="confirmation-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="confirmation-modal__close-button"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="confirmation-modal__body">
          {title && <h3 className="confirmation-modal__title blue_gray_900">{title}</h3>}
          <p className="confirmation-modal__message blue_gray_800">{message}</p>
        </div>

        <div className="confirmation-modal__actions">
          <button
            type="button"
            className="btn-primary"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
