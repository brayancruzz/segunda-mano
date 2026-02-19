import Card from "../components/layout/Card";
import '../components/ui/color.css';

function Home() {
  return (
    <section className="main_container">
      <div className="body_container">
        <h2 className="blue_gray_900">Productos destacados</h2>
        <div className="products_list_container">
          <Card
            title="iPhone 13"
            description="Excelente estado"
            image="https://via.placeholder.com/150"
          />

          <Card
            title="Zapatos Nike"
            description="Talla 38"
            image="https://via.placeholder.com/150"
          />
          <Card
            title="Zapatos Nike"
            description="Talla 38"
            image="https://via.placeholder.com/150"
          />
          <Card
            title="Zapatos Nike"
            description="Talla 38"
            image="https://via.placeholder.com/150"
          />
          <Card
            title="Zapatos Nike"
            description="Talla 38"
            image="https://via.placeholder.com/150"
        />
        </div>
      </div>
    </section>
  );
}

export default Home;