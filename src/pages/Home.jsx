import Card from "../components/ui/Card";

function Home() {
  return (
    <section>
      <h2>Productos destacados</h2>

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
    </section>
  );
}

export default Home;