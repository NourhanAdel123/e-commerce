import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function SomeOfProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container py-4">
      <div className="row g-4 justify-content-center">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm">
              <div className="overflow-hidden" style={{ height: "200px" }}>
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="card-img-top w-100 h-100 object-fit-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="card-body d-flex flex-column">
                <h5
                  className="card-title fw-semibold mb-2"
                  style={{ fontSize: "1rem" }}
                >
                  {product.title}
                </h5>
                <p className="card-text text-success fw-bold mb-2">
                  ${product.price}
                </p>
                <div className="mt-auto">
                  <Link
                    to={`/products/${product._id}`}
                    className="btn btn-success w-100 btn-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SomeOfProducts;
