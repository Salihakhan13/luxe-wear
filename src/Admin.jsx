import { useEffect, useState } from "react";

function Admin() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
const [categoryName, setCategoryName] = useState("");
const [editingCategory, setEditingCategory] = useState(null);
const [editingOrder, setEditingOrder] = useState(null);

const [productForm, setProductForm] = useState({
  name: "",
  category: "",
  price: "",
  image: "",
  description: "",
  stock: ""
});

  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));

    fetch("http://localhost:8080/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
      fetch("http://localhost:8080/api/orders")
  .then((response) => response.json())
  .then((data) => setOrders(data))
  .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  return (
    <div
  style={{
    padding: "30px",
    maxWidth: "1200px",
    margin: "0 auto"
  }}
>
      <h1>LUXEWEAR Admin Panel</h1>

      <h2>Dashboard</h2>
      <div
  style={{
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginTop: "20px"
  }}
>
  <div
    style={{
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      minWidth: "180px"
    }}
  >
    <h3>Total Products</h3>
    <p>{products.length}</p>
  </div>

  <div
    style={{
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      minWidth: "180px"
    }}
  >
    <h3>Total Categories</h3>
    <p>{categories.length}</p>
  </div>

  <div
    style={{
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      minWidth: "180px"
    }}
  >
    <h3>Total Orders</h3>
    <p>{orders.length}</p>
  </div>
</div>
      <button
  type="button"
  onClick={() => setShowCategoryForm(!showCategoryForm)}
  style={{
    padding: "10px 20px",
    marginTop: "20px",
    cursor: "pointer"
  }}
>
  {showCategoryForm ? "Close Category Form" : "Add Category"}
</button>

{showCategoryForm && (
  <div style={{ marginTop: "20px", maxWidth: "400px" }}>
    <h2>Add New Category</h2>

    <input
      type="text"
      placeholder="Category Name"
      value={categoryName}
      onChange={(e) => setCategoryName(e.target.value)}
    />

    <button
      type="button"
      style={{
        marginTop: "10px",
        padding: "10px 20px"
      }}
      onClick={() => {
        fetch("http://localhost:8080/api/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: categoryName
          })
        })
          .then((response) => response.json())
          .then((newCategory) => {
            setCategories([...categories, newCategory]);
            setCategoryName("");
            setShowCategoryForm(false);
            alert("Category added successfully!");
          })
          .catch((error) => {
            console.error("Error adding category:", error);
            alert("Failed to add category");
          });
      }}
    >
      Save Category
    </button>
  </div>
)}

      <div>
        <p>Total Products: {products.length}</p>
        <p>Total Categories: {categories.length}</p>
      </div>
      <button
  onClick={() => setShowProductForm(!showProductForm)}
  style={{
    padding: "10px 20px",
    marginTop: "20px",
    cursor: "pointer"
  }}
>
  {showProductForm ? "Close Form" : "Add Product"}
</button>

{showProductForm && (
  <div style={{ marginTop: "20px", maxWidth: "500px" }}>
    <h2>Add New Product</h2>

    <input
      type="text"
      placeholder="Product Name"
      value={productForm.name}
      onChange={(e) =>
        setProductForm({ ...productForm, name: e.target.value })
        
      }
    />

    <select
      value={productForm.category}
      onChange={(e) =>
        setProductForm({ ...productForm, category: e.target.value })
      }
    >
      <option value="">Select Category</option>

      {categories.map((category) => (
        <option key={category.id} value={category.name}>
          {category.name}
        </option>
      ))}
    </select>

    <input
      type="number"
      placeholder="Price"
      value={productForm.price}
      onChange={(e) =>
        setProductForm({ ...productForm, price: e.target.value })
      }
    />

    <input
      type="text"
      placeholder="Image URL"
      value={productForm.image}
      onChange={(e) =>
        setProductForm({ ...productForm, image: e.target.value })
      }
    />

    <textarea
      placeholder="Description"
      value={productForm.description}
      onChange={(e) =>
        setProductForm({ ...productForm, description: e.target.value })
      }
    />

    <input
      type="number"
      placeholder="Stock"
      value={productForm.stock}
      onChange={(e) =>
        setProductForm({ ...productForm, stock: e.target.value })
      }
    />

    <button
  style={{ marginTop: "10px", padding: "10px 20px" }}
  onClick={() => {
    fetch("http://localhost:8080/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...productForm,
        price: Number(productForm.price),
        stock: Number(productForm.stock)
      })
    })
      .then((response) => response.json())
      .then((newProduct) => {
        setProducts([...products, newProduct]);

        setProductForm({
          name: "",
          category: "",
          price: "",
          image: "",
          description: "",
          stock: ""
        });

        setShowProductForm(false);

        alert("Product added successfully!");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        alert("Failed to add product");
      });
  }}
>
  Save Product
</button>
  </div>
)}
<h2 style={{ marginTop: "40px" }}>Manage Categories</h2>

{categories.map((category) => (
  <div
    key={category.id}
    style={{
      border: "1px solid #ddd",
      padding: "15px",
      marginTop: "15px",
      maxWidth: "500px"
    }}
  >
    <h3>{category.name}</h3>
    <button
  type="button"
  onClick={() => {
    setEditingCategory(category);
  }}
  style={{
    marginRight: "10px",
    padding: "8px 15px",
    cursor: "pointer"
  }}
>
  Edit
</button>

    <button
      type="button"
      onClick={() => {
        fetch(`http://localhost:8080/api/categories/${category.id}`, {
          method: "DELETE"
        })
          .then(() => {
            setCategories(
              categories.filter((item) => item.id !== category.id)
            );
            alert("Category deleted successfully!");
          })
          .catch((error) => {
            console.error("Error deleting category:", error);
            alert("Failed to delete category");
          });
      }}
    >
      Delete
    </button>
  </div>
))}
<h2 style={{ marginTop: "40px" }}>Customer Management</h2>

<div
  style={{
    border: "1px solid #ddd",
    padding: "20px",
    marginTop: "15px",
    maxWidth: "700px"
  }}
>
  {orders.length === 0 ? (
    <p>No customers found.</p>
  ) : (
    orders.map((order) => (
      <div
        key={order.id}
        style={{
          borderBottom: "1px solid #eee",
          padding: "15px 0"
        }}
      >
        <h3>{order.customerName}</h3>
        <p>Email: {order.email}</p>
        <p>Phone: {order.phone}</p>
        <p>Address: {order.address}</p>
      </div>
    ))
  )}
</div>
<h2 style={{ marginTop: "40px" }}>Manage Orders</h2>
{editingOrder && (
  <div
    style={{
      marginTop: "20px",
      padding: "20px",
      border: "1px solid #ddd",
      maxWidth: "500px"
    }}
  >
    <h2>Edit Order Status</h2>

    <p>
      <strong>Order #{editingOrder.id}</strong>
    </p>

    <select
      value={editingOrder.status}
      onChange={(e) =>
        setEditingOrder({
          ...editingOrder,
          status: e.target.value
        })
      }
      style={{
        padding: "10px",
        width: "100%"
      }}
    >
      <option value="Pending">Pending</option>
      <option value="Confirmed">Confirmed</option>
      <option value="Shipped">Shipped</option>
      <option value="Delivered">Delivered</option>
    </select>

    <button
      type="button"
      style={{
        marginTop: "10px",
        padding: "10px 20px"
      }}
      onClick={() => {
        fetch(`http://localhost:8080/api/orders/${editingOrder.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editingOrder)
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to update order");
            }
            return response.json();
          })
          .then((updatedOrder) => {
            setOrders(
              orders.map((item) =>
                item.id === updatedOrder.id
                  ? updatedOrder
                  : item
              )
            );

            setEditingOrder(null);
            alert("Order status updated successfully!");
          })
          .catch((error) => {
            console.error("Error updating order:", error);
            alert("Failed to update order status");
          });
      }}
    >
      Update Status
    </button>

    <button
      type="button"
      style={{
        marginLeft: "10px",
        padding: "10px 20px"
      }}
      onClick={() => setEditingOrder(null)}
    >
      Cancel
    </button>
  </div>
)}

{orders.length === 0 ? (
  <p>No orders found.</p>
) : (
  orders.map((order) => (
    <div
      key={order.id}
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        marginTop: "15px",
        maxWidth: "700px"
      }}
    >
      <h3>Order #{order.id}</h3>

      <p><strong>Customer:</strong> {order.customerName}</p>
      <p><strong>Phone:</strong> {order.phone}</p>
      <p><strong>Email:</strong> {order.email}</p>
      <p><strong>Address:</strong> {order.address}</p>
      <p><strong>Amount:</strong> ₹{order.totalAmount}</p>
      <p><strong>Payment:</strong> {order.paymentMethod}</p>
      <p><strong>Status:</strong> {order.status}</p>
<button
  type="button"
  onClick={() => setEditingOrder(order)}
  style={{
    marginRight: "10px",
    padding: "8px 15px",
    cursor: "pointer"
  }}
>
  Edit Status
</button>
      
      <button
  type="button"
  style={{
    padding: "8px 15px",
    cursor: "pointer"
  }}
  onClick={() => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) return;

    fetch(`http://localhost:8080/api/orders/${order.id}`, {
      method: "DELETE"
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete order");
        }

        setOrders(
          orders.filter((item) => item.id !== order.id)
        );

        alert("Order deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting order:", error);
        alert("Failed to delete order");
      });
  }}
>
  Delete Order
</button>
    </div>
  ))
)}
<h2 style={{ marginTop: "40px" }}>Manage Products</h2>
{editingCategory && (
  <div style={{ marginTop: "20px", maxWidth: "400px" }}>
    <h2>Edit Category</h2>

    <input
      type="text"
      placeholder="Category Name"
      value={editingCategory.name}
      onChange={(e) =>
        setEditingCategory({
          ...editingCategory,
          name: e.target.value
        })
      }
    />

    <button
      type="button"
      style={{
        marginTop: "10px",
        padding: "10px 20px"
      }}
      onClick={() => {
        fetch(
          `http://localhost:8080/api/categories/${editingCategory.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              name: editingCategory.name
            })
          }
        )
          .then((response) => response.json())
          .then((updatedCategory) => {
            setCategories(
              categories.map((item) =>
                item.id === updatedCategory.id
                  ? updatedCategory
                  : item
              )
            );

            setEditingCategory(null);

            alert("Category updated successfully!");
          })
          .catch((error) => {
            console.error("Error updating category:", error);
            alert("Failed to update category");
          });
      }}
    >
      Update Category
    </button>

    <button
      type="button"
      style={{
        marginLeft: "10px",
        padding: "10px 20px"
      }}
      onClick={() => setEditingCategory(null)}
    >
      Cancel
    </button>
  </div>
)}
{editingProduct && (
  <div style={{ marginTop: "20px", maxWidth: "500px" }}>
    <h2>Edit Product</h2>

    <input
      type="text"
      placeholder="Product Name"
      value={editingProduct.name}
      onChange={(e) =>
        setEditingProduct({
          ...editingProduct,
          name: e.target.value
        })
      }
    />

    <input
      type="number"
      placeholder="Price"
      value={editingProduct.price}
      onChange={(e) =>
        setEditingProduct({
          ...editingProduct,
          price: e.target.value
        })
      }
    />

    <input
      type="text"
      placeholder="Image URL"
      value={editingProduct.image}
      onChange={(e) =>
        setEditingProduct({
          ...editingProduct,
          image: e.target.value
        })
      }
    />

    <textarea
      placeholder="Description"
      value={editingProduct.description}
      onChange={(e) =>
        setEditingProduct({
          ...editingProduct,
          description: e.target.value
        })
      }
    />

    <input
      type="number"
      placeholder="Stock"
      value={editingProduct.stock}
      onChange={(e) =>
        setEditingProduct({
          ...editingProduct,
          stock: e.target.value
        })
      }
    />

    <button
      style={{ marginTop: "10px", padding: "10px 20px" }}
      onClick={() => {
        fetch(
          `http://localhost:8080/api/products/${editingProduct.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              ...editingProduct,
              price: Number(editingProduct.price),
              stock: Number(editingProduct.stock)
            })
          }
        )
          .then((response) => response.json())
          .then((updatedProduct) => {
            setProducts(
              products.map((item) =>
                item.id === updatedProduct.id
                  ? updatedProduct
                  : item
              )
            );

            setEditingProduct(null);

            alert("Product updated successfully!");
          })
          .catch((error) => {
            console.error("Error updating product:", error);
            alert("Failed to update product");
          });
      }}
    >
      Update Product
    </button>

    <button
      style={{
        marginLeft: "10px",
        padding: "10px 20px"
      }}
      onClick={() => setEditingProduct(null)}
    >
      Cancel
    </button>
  </div>
)}

{products.map((product) => (
  <div
    key={product.id}
    style={{
      border: "1px solid #ddd",
      padding: "15px",
      marginTop: "15px",
      maxWidth: "700px"
    }}
  >
    <h3>{product.name}</h3>
    <p>Category: {product.category}</p>
    <p>Price: ₹{product.price}</p>
    <p>Stock: {product.stock}</p>

    <button
  type="button"
  onClick={() => {
    setEditingProduct(product);
  }}
  style={{
    marginRight: "10px",
    padding: "8px 15px",
    cursor: "pointer"
  }}
>
  Edit
</button>

<button
  type="button"
  onClick={() => {
    fetch(`http://localhost:8080/api/products/${product.id}`, {
      method: "DELETE"
    })
      .then(() => {
        setProducts(
          products.filter((item) => item.id !== product.id)
        );
        alert("Product deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        alert("Failed to delete product");
      });
  }}
>
  Delete
</button>
  </div>
))}
    </div>
  );
}

export default Admin;