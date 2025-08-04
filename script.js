// Product Data with Real Images
const products = [
  {
    id: 1,
    name: "Chocolate Fudge Cake",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&crop=center",
    description:
      "Rich, moist chocolate cake with decadent fudge frosting. Perfect for celebrations and special occasions.",
    ingredients:
      "Premium dark chocolate, organic flour, fresh eggs, pure vanilla extract, unsalted butter, sugar",
    category: "Cakes",
  },
  {
    id: 2,
    name: "French Croissants",
    price: 8.99,
    image:
      "https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?w=400&h=300&fit=crop&crop=center",
    description:
      "Buttery, flaky croissants made with traditional French techniques. Perfectly golden and crispy.",
    ingredients:
      "French butter, organic flour, fresh yeast, milk, eggs, sea salt",
    category: "Pastries",
  },
  {
    id: 3,
    name: "Artisan Sourdough Bread",
    price: 6.5,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop&crop=center",
    description:
      "Handcrafted sourdough with a perfect crust and tangy flavor. Made with our 100-year-old starter.",
    ingredients: "Organic flour, sourdough starter, water, sea salt, olive oil",
    category: "Bread",
  },
  {
    id: 4,
    name: "Strawberry Cheesecake",
    price: 28.99,
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop&crop=center",
    description:
      "Creamy New York style cheesecake topped with fresh strawberries and graham cracker crust.",
    ingredients:
      "Cream cheese, fresh strawberries, graham crackers, eggs, sugar, vanilla, sour cream",
    category: "Cakes",
  },
  {
    id: 5,
    name: "Blueberry Muffins",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&h=300&fit=crop&crop=center",
    description:
      "Soft, fluffy muffins bursting with fresh blueberries. Perfect with morning coffee or afternoon tea.",
    ingredients:
      "Fresh blueberries, organic flour, eggs, milk, butter, sugar, baking powder, lemon zest",
    category: "Muffins",
  },
  {
    id: 6,
    name: "Apple Cinnamon Danish",
    price: 4.99,
    image:
      "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=300&fit=crop&crop=center",
    description:
      "Flaky pastry filled with spiced apples and cinnamon, topped with sweet glaze.",
    ingredients:
      "Puff pastry, fresh apples, cinnamon, brown sugar, vanilla, butter, powdered sugar",
    category: "Pastries",
  },
];

let cart = [];
let currentProduct = null;

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  displayProducts();
});

// Display products in grid
function displayProducts() {
  const productsGrid = document.getElementById("productsGrid");
  productsGrid.innerHTML = "";

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.onclick = () => openProductModal(product);

    productCard.innerHTML = `
                    <div class="product-image" style="background-image: url('${product.image}')"></div>
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <div class="product-price">$${product.price}</div>
                        <button class="add-to-cart" onclick="event.stopPropagation(); quickAddToCart(${product.id})">
                            Add to Cart
                        </button>
                    </div>
                `;

    productsGrid.appendChild(productCard);
  });
}

// Open product modal
function openProductModal(product) {
  currentProduct = product;
  document.getElementById("modalTitle").textContent = product.name;
  document.getElementById("modalProductTitle").textContent = product.name;
  document.getElementById("modalPrice").textContent = `$${product.price}`;
  document.getElementById("modalDescription").textContent = product.description;
  document.getElementById(
    "modalImage"
  ).style.backgroundImage = `url('${product.image}')`;
  document.getElementById("modalIngredients").innerHTML = `
                <h4>Ingredients:</h4>
                <p>${product.ingredients}</p>
            `;
  document.getElementById("quantityInput").value = 1;
  document.getElementById("productModal").style.display = "block";
}

// Close modal
function closeModal() {
  document.getElementById("productModal").style.display = "none";
}

// Update quantity
function updateQuantity(change) {
  const quantityInput = document.getElementById("quantityInput");
  let newQuantity = parseInt(quantityInput.value) + change;
  if (newQuantity >= 1 && newQuantity <= 10) {
    quantityInput.value = newQuantity;
  }
}

// Add to cart from modal
function addToCart() {
  if (currentProduct) {
    const quantity = parseInt(document.getElementById("quantityInput").value);
    const existingItem = cart.find((item) => item.id === currentProduct.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...currentProduct, quantity: quantity });
    }

    updateCartDisplay();
    closeModal();

    // Show success message
    alert(`${quantity} x ${currentProduct.name} added to cart!`);
  }
}

// Quick add to cart
function quickAddToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    updateCartDisplay();
    alert(`${product.name} added to cart!`);
  }
}

// Update cart display
function updateCartDisplay() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelector(".cart-icon").textContent = `🛒 Cart (${totalItems})`;
}

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById("productModal");
  if (event.target === modal) {
    closeModal();
  }
};

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
