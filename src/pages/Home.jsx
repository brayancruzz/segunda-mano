import ProductList from "../components/products/product_list";
import '../components/page_css/root.css';
import '../components/ui/color.css';

function Home() {
  const user = localStorage.getItem('user');
  const products = localStorage.getItem('products');

  return (
    <section className="main_container">
      <div className="body_container">
        {/* debug info */}
        <div style={{fontSize:12, color:'#999', marginBottom:12}}>
          <div>user: {user ? user.substring(0,100) : 'null'}</div>
          <div>products: {products ? products.substring(0,100) : 'null'}</div>
        </div>

        <h2 className="blue_gray_900">Productos destacados</h2>
        <ProductList/>
      </div>
    </section>
  );
}

export default Home;