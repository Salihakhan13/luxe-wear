import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
const [wishlist, setWishlist] = useState([]);
const [search, setSearch] = useState("");
const [showSearch, setShowSearch] = useState(false);
const [category, setCategory] = useState("All");
const [selectedProduct, setSelectedProduct] = useState(null);
const [quantity, setQuantity] = useState(1);
const [selectedSize, setSelectedSize] = useState("");
const [selectedColor, setSelectedColor] = useState("");
const [showCart, setShowCart] = useState(false);
const [showLogin, setShowLogin] = useState(false);
const [isRegister, setIsRegister] = useState(false);
const [showCheckout, setShowCheckout] = useState(false);
const [orderPlaced, setOrderPlaced] = useState(false);
const [checkoutError, setCheckoutError] = useState("");
const [paymentMethod, setPaymentMethod] = useState("COD");
const [products, setProducts] = useState([]);
const [orders, setOrders] = useState([]);
useEffect(() => {
  fetch("http://localhost:8080/api/products")
    .then((response) => response.json())
    .then((data) => {
      setProducts(data);
    })
    .catch((error) => {
  console.error("Error fetching products:", error);
});
}, []);
  
  return (
    <div className="app">
      {/* Navbar */}
      {/* Navbar */}
<nav className="navbar">
  <div className="logo">
    LUXE<span>WEAR</span>
  </div>

  <div className="nav-links">
    <a
  href="#products"
  onClick={() => {
  setCategory("All");

  setTimeout(() => {
    document
      .querySelector(".products-section")
      ?.scrollIntoView({ behavior: "smooth" });
  }, 50);
}}
>
  Home
</a>
    <a
  href="#products"
  onClick={() => {
  setCategory("Men");

  setTimeout(() => {
    document
      .querySelector(".products-section")
      ?.scrollIntoView({ behavior: "smooth" });
  }, 50);
}}
>
  Men
</a>
    <a
  href="#products"
  onClick={() => {
  setCategory("Women");

  setTimeout(() => {
    document
      .querySelector(".products-section")
      ?.scrollIntoView({ behavior: "smooth" });
  }, 50);
}}
>
  Women
</a>
   <a
  href="#products"
  onClick={() => {
    setCategory("Kids");

    setTimeout(() => {
      document
        .querySelector(".products-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }}
>
  Kids
</a>
    <a
  href="#products"
  onClick={() => {
    setCategory("Sale");

    setTimeout(() => {
      document
        .querySelector(".products-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }}
>
  Sale
</a>
  </div>

  <div className="nav-actions">
  <button onClick={() => setShowSearch(!showSearch)}>
    🔍
  </button>
<button
  onClick={() => {
    document
      .querySelector(".wishlist-section")
      ?.scrollIntoView({ behavior: "smooth" });
  }}
>
♡
</button>
  
  <button
  className="login-btn"
  onClick={() => {
    setShowLogin(true);
    setIsRegister(false);
  }}
>
    👤 LOGIN
  </button>

  <button
    onClick={() => {


      setShowCart(true);

      setTimeout(() => {
        document
          .querySelector(".cart-section")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }}
  >
    🛒 <span>{cart.length}</span>
  </button>
</div>
</nav>
{showSearch && (
  <div className="search-box">
    <input
      type="text"
      placeholder="Search products..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>
)}
      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <p className="small-title">NEW COLLECTION 2026</p>

          <h1>Style That Defines You.</h1>

          <p className="hero-text">
            Discover premium fashion designed for your everyday style.
            Explore our latest collection for men, women and kids.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">SHOP NOW</button>
            <button className="secondary-btn">EXPLORE COLLECTION</button>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1000"
            alt="Fashion Collection"
          />
        </div>
      </section>

      {/* Categories */}
      <section className="categories" id="categories">
        <div className="section-heading">
          <p>EXPLORE</p>
          <h2>Shop By Category</h2>
        </div>

        <div className="category-grid">
          <div className="category-card" id="men">
            <img
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"
              alt="Men"
            />
            <div>
              <h3>MEN</h3>
              <button>SHOP NOW →</button>
            </div>
          </div>

          <div className="category-card" id="women">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600"
              alt="Women"
            />
            <div>
              <h3>WOMEN</h3>
              <button>SHOP NOW →</button>
            </div>
          </div>

          <div className="category-card" id="kids">
            <img
              src="https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600"
              alt="Kids"
            />
            <div>
              <h3>KIDS</h3>
              <button>SHOP NOW →</button>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="products-section">
        <div className="section-heading">
          <p>OUR COLLECTION</p>
          <h2>Trending Products</h2>
        </div>

        <div className="product-grid">
          {products
  .filter((product) =>
  (category === "All" || product.category === category) &&
  product.name.toLowerCase().includes(search.toLowerCase())
)
.map((product) => (
            <div
  className="product-card"
  key={product.id}
 onClick={() => {
  setSelectedProduct(product);
  setQuantity(1);
}}
>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <button
  className="wishlist"
  onClick={(e) => {
    e.stopPropagation();

    if (wishlist.some((item) => item.id === product.id)) {
      setWishlist(
        wishlist.filter((item) => item.id !== product.id)
      );
    } else {
      setWishlist([...wishlist, product]);
    }
  }}
>
  {wishlist.some((item) => item.id === product.id) ? "♥" : "♡"}
</button>
              </div>

              <div className="product-info">
                <p>{product.category}</p>
                <h3>{product.name}</h3>

                <div className="product-bottom">
                  <strong>₹{product.price}</strong>

                  <button
  className="add-cart"
  onClick={(e) => {
    e.stopPropagation();

    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      console.log("OLD QUANTITY:", existingProduct.quantity);
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
    ...item,
    quantity: item.quantity + quantity,
    size: selectedSize,
    color: selectedColor,
  }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  }}
>
  Add to Cart
</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Cart Section */}
      <section className="cart-section" id="cart">
        <div className="section-heading">
          <p>YOUR SHOPPING BAG</p>
          <h2>Shopping Cart</h2>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <h3>Your cart is empty</h3>
            <p>Add some products to your cart and they will appear here.</p>
          </div>
        ) : (
          <div className="cart-container">
            <div className="cart-items">
              {cart.map((item, index) => (
                <div className="cart-item" key={`${item.id}-${index}`}>
                  <img src={item.image} alt={item.name} />

                  <div className="cart-item-info">
                    <p>{item.category}</p>
                    <h3>{item.name}</h3>
                    <strong>₹{item.price}</strong>
                    <div className="quantity-control">
  <button
    type="button"
    onClick={() => {
      if ((item.quantity || 1) > 1) {
        setCart(
          cart.map((cartItem, i) =>
            i === index
              ? {
                  ...cartItem,
                  quantity: (cartItem.quantity || 1) - 1,
                }
              : cartItem
          )
        );
      }
    }}
  >
    −
  </button>

  <span>{item.quantity || 1}</span>

  <button
    type="button"
    onClick={() => {
      setCart(
        cart.map((cartItem, i) =>
          i === index
            ? {
                ...cartItem,
                quantity: (cartItem.quantity || 1) + 1,
              }
            : cartItem
        )
      );
    }}
  >
    +
  </button>
</div>
                    {item.size && <p>Size: {item.size}</p>}
{item.color && <p>Color: {item.color}</p>}
                  </div>

                  <button
                    className="remove-cart"
                    onClick={() => {
                      setCart(cart.filter((_, i) => i !== index));
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Order Summary</h3>

              <div className="summary-row">
                <span>Items</span>
                <span>
  {cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  )}
</span>
              </div>

              <div className="summary-row total-row">
                <strong>Total</strong>
                <strong>
  ₹{cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  )}
</strong>
              </div>
              

              <button
  className="checkout-btn"
  onClick={() => {
    setShowCart(false);
    setShowCheckout(true);
  }}
>
  Proceed to Checkout
</button>
            </div>
          </div>
        )}
      </section>
      {showCheckout && (
  <section className="checkout-section">
    <div className="section-heading">
      <p>COMPLETE YOUR ORDER</p>
      <h2>Checkout</h2>
    </div>

    <div className="checkout-container">

      <div className="checkout-form">
        <h3>Delivery Information</h3>

        <input
          type="text"
          placeholder="Full Name"
        />

        <input
          type="tel"
          placeholder="Phone Number"
        />
        <input
  type="email"
  placeholder="Email Address"
/>

        <input
          type="text"
          placeholder="Address"
        />

        <div className="checkout-row">
          <input
            type="text"
            placeholder="City"
          />

          <input
            type="text"
            placeholder="Pincode"
          />
          <div style={{ marginTop: "15px" }}>
  <h3>Payment Method</h3>

  <label style={{ marginRight: "20px" }}>
    <input
      type="radio"
      name="payment"
      value="COD"
      checked={paymentMethod === "COD"}
      onChange={(e) => setPaymentMethod(e.target.value)}
    />
    Cash on Delivery
  </label>

  <label>
    <input
      type="radio"
      name="payment"
      value="UPI"
      checked={paymentMethod === "UPI"}
      onChange={(e) => setPaymentMethod(e.target.value)}
    />
    UPI
  </label>
</div>
        </div>
        {checkoutError && (
  <p className="checkout-error">
    {checkoutError}
  </p>
)}
<button
  className="place-order-btn"
  onClick={() => {
    const inputs = document.querySelectorAll(
      ".checkout-form input"
    );

    const name = inputs[0].value.trim();
    const phone = inputs[1].value.trim();
    const email = inputs[2].value.trim();
    const address = inputs[3].value.trim();
    const city = inputs[4].value.trim();
    const pincode = inputs[5].value.trim();

    const allFilled = [
      name,
      phone,
      email,
      address,
      city,
      pincode
    ].every((value) => value !== "");

    if (!allFilled) {
      setCheckoutError("Please fill all delivery information.");
      return;
    }

    const totalAmount = cart.reduce(
      (total, item) =>
        total + item.price * (item.quantity || 1),
      0
    );

    fetch("http://localhost:8080/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        customerName: name,
        email: email,
        phone: phone,
        address: `${address}, ${city}, ${pincode}`,
        paymentMethod: paymentMethod,
        totalAmount: totalAmount
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to place order");
        }
        return response.json();
      })
      .then(() => {
        setCheckoutError("");
        setCart([]);
        setShowCheckout(false);
        setOrderPlaced(true);
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        setCheckoutError(
          "Unable to place order. Please try again."
        );
      });
  }}
>
  Place Order
</button>
<button
  type="button"
  style={{
    marginTop: "10px",
    padding: "10px 20px",
    cursor: "pointer"
  }}
  onClick={() => {
    const message = `Hello LUXEWEAR, I want to place an order. Total Amount: ₹${cart.reduce(
      (total, item) =>
        total + item.price * (item.quantity || 1),
      0
    )}`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }}
>
  Order via WhatsApp
</button>
      </div>

      <div className="checkout-summary">
        <h3>Order Summary</h3>

        {cart.map((item) => (
          <div className="checkout-item" key={item.id}>
            <span>
              {item.name} × {item.quantity || 1}
            </span>

            <strong>
              ₹{item.price * (item.quantity || 1)}
            </strong>
          </div>
        ))}

        <div className="checkout-total">
          <strong>Total</strong>

          <strong>
            ₹
            {cart.reduce(
              (total, item) =>
                total + item.price * (item.quantity || 1),
              0
            )}
          </strong>
        </div>
      </div>

    </div>
  </section>

)}
{orderPlaced && (
  <section className="order-success">
    <div className="success-box">
      <div className="success-icon">✓</div>

      <h2>Order Placed Successfully!</h2>

      <p>
        Thank you for shopping with LUXEWEAR.
        Your order has been confirmed.
      </p>

      <button onClick={() => setOrderPlaced(false)}>
        Continue Shopping
      </button>
    </div>
  </section>
)}
      {/* Wishlist Section */}
<section className="wishlist-section" id="wishlist">
  <div className="section-heading">
    <p>YOUR FAVORITES</p>
    <h2>My Wishlist</h2>
  </div>

  {wishlist.length === 0 ? (
    <div className="empty-wishlist">
      <h3>Your wishlist is empty</h3>
      <p>Click the heart on a product to save it here.</p>
    </div>
  ) : (
    <div className="wishlist-grid">
      {wishlist.map((item) => (
        <div className="wishlist-card" key={item.id}>
          <div className="wishlist-image">
            <img src={item.image} alt={item.name} />
          </div>

          <div className="wishlist-info">
            <p>{item.category}</p>
            <h3>{item.name}</h3>
            <strong>₹{item.price}</strong>
            <p>Quantity: {item.quantity || 1}</p>

            <button
              onClick={() => {
                setWishlist(
                  wishlist.filter((product) => product.id !== item.id)
                );
              }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>

  )}
</section>
{/* Cart Section */}
{showCart && (
  <section className="cart-section">
    <div className="cart-container">

      <div className="cart-header">
        <h2>Your Cart</h2>

        <button
          className="close-cart"
          onClick={() => setShowCart(false)}
        >
          ✕
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h3>Your cart is empty</h3>
          <p>Add some products to your cart.</p>

          <button
            className="primary-btn"
            onClick={() => setShowCart(false)}
          >
            CONTINUE SHOPPING
          </button>
        </div>
      ) : (
        <div className="cart-items">

          {cart.map((item, index) => (
            <div className="cart-item" key={`${item.id}-${index}`}>

              <img
                src={item.image}
                alt={item.name}
              />

              <div className="cart-item-info">
                <p>{item.category}</p>
                <h3>{item.name}</h3>
                <strong>₹{item.price}</strong>

                <p>
                  Quantity: {item.quantity || 1}
                </p>
              </div>

              <button
                className="remove-cart"
                onClick={() => {
                  setCart(
                    cart.filter((_, cartIndex) => cartIndex !== index)
                  );
                }}
              >
                Remove
              </button>

            </div>
          ))}

        </div>
      )}

    </div>
  </section>
)}
{/* Product Details */}
{selectedProduct && (
  <section className="product-details">
    <button
      className="close-details"
      onClick={() => setSelectedProduct(null)}
    >
      ✕ Close
    </button>

    <div className="details-container">
      <div className="details-image">
        <img
          src={selectedProduct.image}
          alt={selectedProduct.name}
        />
      </div>

      <div className="details-info">
        <p>{selectedProduct.category}</p>

        <h2>{selectedProduct.name}</h2>

        <h3>₹{selectedProduct.price}</h3>
        <div className="option-box">
  <span>Size</span>

  <div className="option-buttons">
    {["S", "M", "L", "XL"].map((size) => (
      <button
        key={size}
        className={selectedSize === size ? "selected" : ""}
        onClick={() => setSelectedSize(size)}
      >
        {size}
      </button>
    ))}
  </div>
</div>
<div className="option-box">
  <span>Color</span>

  <div className="option-buttons">
    {["Black", "White", "Blue", "Pink"].map((color) => (
      <button
        key={color}
        className={selectedColor === color ? "selected" : ""}
        onClick={() => setSelectedColor(color)}
      >
        {color}
      </button>
    ))}
  </div>
</div>
        <div className="quantity-box">
  <span>Quantity</span>

  <div className="quantity-controls">
    <button
      onClick={() =>
        setQuantity(quantity > 1 ? quantity - 1 : 1)
      }
    >
      −
    </button>

    <strong>{quantity}</strong>

    <button onClick={() => setQuantity(quantity + 1)}>
      +
    </button>
  </div>
</div>

        <p className="details-description">
          Premium quality fashion designed for comfort,
          style and everyday wear. Perfect for your modern
          wardrobe.
        </p>

        <button
  className="primary-btn"
  onClick={() => {
    const existingProduct = cart.find(
      (item) => item.id === selectedProduct.id
    );

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === selectedProduct.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
  ...selectedProduct,
  quantity: quantity,
  size: selectedSize,
  color: selectedColor,
}
      ]);
    }
  }}
>
  ADD TO CART
</button>
        <button
          className="secondary-btn"
          onClick={() => {
            if (!wishlist.some((item) => item.id === selectedProduct.id)) {
              setWishlist([...wishlist, selectedProduct]);
            }
          }}
        >
          ♡ ADD TO WISHLIST
        </button>
      </div>
    </div>
  </section>
)}
{/* Login / Register */}
{showLogin && (
  <section className="auth-section">
    <div className="auth-container">

      <button
        className="close-details"
        onClick={() => setShowLogin(false)}
      >
        ✕ Close
      </button>

      <h2>{isRegister ? "Create Account" : "Welcome Back"}</h2>

      <p>
        {isRegister
          ? "Create your LUXEWEAR account"
          : "Login to your LUXEWEAR account"}
      </p>

      {isRegister && (
        <input
          type="text"
          placeholder="Full Name"
          className="auth-input"
        />
      )}

      <input
        type="email"
        placeholder="Email Address"
        className="auth-input"
      />

      <input
        type="password"
        placeholder="Password"
        className="auth-input"
      />

      <button className="primary-btn">
        {isRegister ? "CREATE ACCOUNT" : "LOGIN"}
      </button>

      <p className="auth-switch">
        {isRegister
          ? "Already have an account?"
          : "Don't have an account?"}

        <button
          className="auth-link"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? " Login" : " Register"}
        </button>
      </p>

    </div>
  </section>
)}
      {/* Banner */}
      <section className="offer-banner" id="sale">
        <div>
          <p>LIMITED TIME OFFER</p>
          <h2>UP TO 50% OFF</h2>
          <span>On selected styles & collections</span>
          <br />
          <button className="primary-btn">SHOP SALE</button>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div>
          <span>🚚</span>
          <h3>Free Shipping</h3>
          <p>On orders above ₹999</p>
        </div>

        <div>
          <span>↩️</span>
          <h3>Easy Returns</h3>
          <p>7 days easy return</p>
        </div>

        <div>
          <span>🔒</span>
          <h3>Secure Payment</h3>
          <p>100% secure checkout</p>
        </div>

        <div>
          <span>💬</span>
          <h3>24/7 Support</h3>
          <p>We're here to help</p>
          
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-brand">
          <h2>LUXE<span>WEAR</span></h2>
          <p>
            Modern fashion for modern lifestyles.
            <br />
            Discover your style with us.
          </p>
        </div>

        <div>
          <h3>SHOP</h3>
          <p>Men</p>
          <p>Women</p>
          <p>Kids</p>
          <p>New Arrivals</p>
        </div>

        <div>
          <h3>HELP</h3>
          <p>Contact Us</p>
          <p>Shipping</p>
          <p>Returns</p>
          <p>FAQs</p>
        </div>

        <div>
          <h3>FOLLOW US</h3>
          <p>Instagram</p>
          <p>Facebook</p>
          <p>Twitter</p>
        </div>
      </footer>

      <div className="copyright">
        © 2026 LUXEWEAR. All Rights Reserved.
      </div>
    </div>
  );
}

export default App;