import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, ShoppingBag, Star, Heart } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImg, setActiveImg] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/products/${id}`,
        );
        setProduct(response.data.data);
        setActiveImg(response.data.data.imageCover);
      } catch (err) {
        console.error("Error fetching product", err);
        setError(err.response?.data?.message || "Unable to load product.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <section className="container py-5 text-center">
        <div className="spinner-border text-success" role="status"></div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container py-5 text-center">
        <p className="text-danger">{error}</p>
        <Link to="/" className="btn btn-outline-success mt-3">
          <ArrowLeft className="me-2" /> Back to Home
        </Link>
      </section>
    );
  }

  const {
    title,
    description,
    price,
    images,
    imageCover,
    ratingsAverage,
    ratingsQuantity,
    brand,
    category,
  } = product;

  const allImages = [imageCover, ...(images || [])];

  return (
    <section className="container py-5">
      <div className="d-flex flex-column flex-lg-row gap-4">
        {/* Image Gallery */}
        <div
          className="flex-shrink-0"
          style={{ width: "100%", maxWidth: "500px" }}
        >
          <div
            className="overflow-hidden rounded-4 mb-3"
            style={{ height: "400px" }}
          >
            <img
              src={activeImg}
              alt={title}
              className="w-100 h-100 object-fit-cover"
            />
          </div>
          <div className="d-flex gap-2 overflow-auto">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImg(img)}
                className={`border rounded-2 p-0 ${activeImg === img ? "border-success" : "border-light"}`}
                style={{ width: "80px", height: "80px" }}
              >
                <img
                  src={img}
                  alt={`${title} ${idx}`}
                  className="w-100 h-100 object-cover rounded-2"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="flex-grow-1 d-flex flex-column">
          <h2 className="fw-bold text-success mb-3">{title}</h2>
          <div className="d-flex align-items-center gap-3 mb-3">
            <div className="d-flex align-items-center text-warning">
              <Star size={20} className="fill-warning" />
              <span className="ms-1 fw-semibold">
                {ratingsAverage?.toFixed(1)}
              </span>
            </div>
            <span className="text-muted">({ratingsQuantity} reviews)</span>
          </div>
          <p className="text-muted mb-4" style={{ whiteSpace: "pre-line" }}>
            {description}
          </p>
          <h4 className="text-success fw-bold mb-3">
            {price} <small className="text-muted">EGP</small>
          </h4>
          <div className="mb-4">
            <span className="badge bg-success bg-opacity-10 text-success me-2">
              {category?.name}
            </span>
            <span className="badge bg-light text-secondary">{brand?.name}</span>
          </div>
          <div className="mt-auto d-flex gap-3">
            <button className="btn btn-success flex-grow-1">
              <ShoppingBag className="me-2" /> Add to Cart
            </button>
            <button className="btn btn-outline-danger">
              <Heart className="me-2" /> Wishlist
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Link to="/" className="text-decoration-none text-success fw-semibold">
          <ArrowLeft className="me-1" /> Continue Shopping
        </Link>
      </div>
    </section>
  );
};

export default ProductDetails;
