import { useState } from 'react';
import './card.css';
import '../ui/color.css';
import ProductDetailModal from '../modal/product_detail';
import PostStatus from '../ui/status/post_status';

function Card({ title, description, image, price, url_contact, location, seller, status, view }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const product = { title, description, image, price, url_contact, location, seller, status, view };

  return (
    <>
      <div className="card" onClick={handleOpenModal}>
        <img src={image} alt={title} />
        <div className="content">
          <h3 className="blue_gray_900 title">{title}</h3>
          <p className="description blue_gray_800">{description}</p>
          {price != null && <p className="price teal_800">{price}</p>}
          <PostStatus status={status} view={view} />
        </div>
      </div>

      <ProductDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={product}
      />
    </>
  );
}

export default Card;