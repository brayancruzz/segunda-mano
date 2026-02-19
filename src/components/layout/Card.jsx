import './card.css';
import '../ui/color.css';

function Card({ title, description, image }) {
    return (
      <div className="card">
        <img src={image} alt={title} />
        <h3 className='blue_gray_900 title'>{title}</h3>
        <p>{description}</p>
      </div>
    );
  }
  
  export default Card;
  