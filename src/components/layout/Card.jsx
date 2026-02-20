import './card.css';
import '../ui/color.css';

function Card({ title, description, image, price }) {
    return (
      <div className="card">
        <img src={image} alt={title} />
        <div className='content'>
          <h3 className='blue_gray_900 title'>{title}</h3>
          <p className='description blue_gray_800'>{description}</p>
          {price != null && <p className='price teal_800'>{price}</p>}
        </div>
      </div>
    );
  }
  
  export default Card;
  