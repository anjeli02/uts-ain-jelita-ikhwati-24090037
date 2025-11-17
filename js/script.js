// ===== DATA DUMMY =====
const summary = {
    totalProducts: 120,
    totalSales: 85,
    totalRevenue: 12500000
};

let products = [
    { id: 1, name: "Kopi Gayo", price: 25000, stock: 50 },
    { id: 2, name: "Teh Hitam", price: 18000, stock: 30 },
    { id: 3, name: "Coklat Aceh", price: 30000, stock: 20 }
];

//  HELPER FUNCTIONS
function formatRupiah(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}

// ===== LOGIN PAGE =====
if (document.getElementById('loginForm')) {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        // validasi email dan password gaboleh kosong
        if (email === '' || password === '') {
            errorMessage.textContent = 'Email dan Password tidak boleh kosong!';
            errorMessage.classList.add('show');
            return;
        }

        const correctPassword = '24090037';
        const correctEmail = 'ainjelitaikh@gmail.com';
        
        // login berhasil
        errorMessage.classList.remove('show');
        alert('Login berhasil!');
        
        // redirect ke dashboard
        window.location.href = 'dashboard.html';
    });
    
    // ngilangin error saat user mengetik
    emailInput.addEventListener('input', function() {
        errorMessage.classList.remove('show');
    });
    
    passwordInput.addEventListener('input', function() {
        errorMessage.classList.remove('show');
    });
}

// ===== DASHBOARD PAGE =====
if (document.getElementById('totalProducts')) {
    document.getElementById('totalProducts').textContent = summary.totalProducts;
    document.getElementById('totalSales').textContent = summary.totalSales;
    document.getElementById('totalRevenue').textContent = formatRupiah(summary.totalRevenue);
}

// ===== PRODUCTS PAGE =====
if (document.getElementById('productTableBody')) {
    const productTableBody = document.getElementById('productTableBody');
    
    // fungsi untuk render products
    function renderProducts() {
        productTableBody.innerHTML = '';
        
        products.forEach((product, index) => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                <td>
                    <button class="btn-edit" onclick="editProduct(${product.id})">✏️</button>
                    <button class="btn-delete" onclick="deleteProduct(${product.id}, this)">🗑️</button>
                </td>
            `;
            
            productTableBody.appendChild(row);
        });
    }
    
    // fungsi edit produk
    window.editProduct = function(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            alert(`Edit produk ${product.name}`);
        }
    }
    
    // ffungsi delete produk
    window.deleteProduct = function(productId, buttonElement) {
        const product = products.find(p => p.id === productId);
        
        if (product && confirm('Yakin hapus produk ini?')) {
            // ngapus dari array
            products = products.filter(p => p.id !== productId);
            
            // ngpus baris dari tabel
            const row = buttonElement.closest('tr');
            row.remove();
            
            // Re-render untuk update nomor urut
            renderProducts();
        }
    }
    
    // initial render
    renderProducts();
}