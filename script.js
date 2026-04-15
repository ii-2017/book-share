// ૧. WhatsApp પર મેસેજ મોકલવાનું ફંક્શન
function contactSeller(phoneNumber, bookName) {
    if (!phoneNumber || phoneNumber === "" || phoneNumber === "undefined") {
        alert("સેલરનો WhatsApp નંબર ઉપલબ્ધ નથી.");
        return;
    }
    const message = `Hello, I saw your book "${bookName}" on BOOKSHARE and I am interested in buying it.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// ૨. Wishlist Toggle ફંક્શન
function toggleWishlist(button, bookName) {
    button.classList.toggle('active');
    if (button.classList.contains('active')) {
        alert(bookName + " Wishlist માં ઉમેરાઈ ગઈ છે! ❤️");
    } else {
        alert(bookName + " Wishlist માંથી કાઢી નાખી.");
    }
}

// ૩. Category Filter ફંક્શન
function filterBooks(category, element) {
    const books = document.querySelectorAll('.book-card');
    const tags = document.querySelectorAll('.cat-tag');

    // એક્ટિવ ટેગની સ્ટાઈલ બદલો
    if(element) {
        tags.forEach(tag => tag.classList.remove('active-tag'));
        element.classList.add('active-tag');
    }

    books.forEach(book => {
        const bookCat = book.getAttribute('data-category');
        if (category === 'all' || bookCat === category) {
            book.style.display = 'block';
        } else {
            book.style.display = 'none';
        }
    });
}

// ૪. બુક સેવ કરવાનું લોજિક (Upload Page માટે)
const bookForm = document.getElementById('bookForm');

if (bookForm) {
    bookForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // બધી વેલ્યુ મેળવો
        const titleVal = document.getElementById('title').value;
        const catVal = document.getElementById('category').value;
        const priceVal = document.getElementById('price').value;
        const locVal = document.getElementById('location').value;
        const whatsappVal = document.getElementById('whatsapp').value;
        const condVal = document.getElementById('book-condition').value;

        // નવો બુક ઓબ્જેક્ટ
        const newBook = {
            title: titleVal,
            category: catVal,
            price: priceVal,
            location: locVal,
            whatsapp: whatsappVal,
            condition: condVal,
            id: Date.now()
        };

        // લોકલ સ્ટોરેજમાં સેવ કરો
        let books = JSON.parse(localStorage.getItem('myBooks')) || [];
        books.push(newBook);
        localStorage.setItem('myBooks', JSON.stringify(books));

        // રિક્વેસ્ટ નોટિફિકેશન ચેક
        const requestedTitle = localStorage.getItem('lastRequestedBook');
        if (requestedTitle && titleVal.toLowerCase().includes(requestedTitle.toLowerCase())) {
            alert("🔔 NOTIFICATION: આ બુકની કોઈએ રિક્વેસ્ટ કરેલી છે!");
        }

        alert("બુક સફળતાપૂર્વક અપલોડ થઈ ગઈ છે!");
        
        // થોભો, ડેટા સેવ થયા પછી જ હોમ પેજ પર જશે
        setTimeout(() => {
            window.location.href = "index.html";
        }, 500);
    });
}

// ૫. હોમ પેજ પર બુક્સ બતાવવાનું ફંક્શન (Index Page માટે)
function displayBooks() {
    const bookGrid = document.getElementById('bookGrid');
    if (!bookGrid) return; 

    const savedBooks = JSON.parse(localStorage.getItem('myBooks')) || [];

    savedBooks.forEach(book => {
        const bookHTML = `
            <div class="book-card" data-category="${book.category}">
                <div class="book-img">
                    <img src="https://via.placeholder.com/200x250?text=${encodeURIComponent(book.title)}" alt="Book">
                    <button class="wishlist-btn" onclick="toggleWishlist(this, '${book.title}')">❤</button>
                </div>
                <div class="book-info">
                    <div class="seller-rating" style="font-size: 0.8rem; color: #64748b; margin-bottom: 5px;">
                        Seller Trust: <span style="color: #fbbf24;">⭐⭐⭐⭐☆</span>
                    </div>
                    <div class="location-badge">📍 ${book.location}</div>
                    <h3>${book.title}</h3>
                    <p style="font-size: 0.85rem; color: #22c55e; font-weight: 700; margin-top: 5px;">
                        Condition: ${book.condition}/5 Star Quality
                    </p>
                    <div class="price-row"><span class="price">₹${book.price}</span></div>
                    <button class="chat-btn" onclick="contactSeller('${book.whatsapp}', '${book.title}')">
                        Chat on WhatsApp
                    </button>
                </div>
            </div>
        `;
        bookGrid.innerHTML += bookHTML;
    });
}

// પેજ લોડ થાય ત્યારે બુક્સ બતાવવાનું ફંક્શન ચલાવો
window.addEventListener('DOMContentLoaded', displayBooks);
const searchInput = document.querySelector('.search-bar input');
const searchBtn = document.querySelector('.search-bar button');

if (searchInput) {
    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
        const books = document.querySelectorAll('.book-card');

        books.forEach(book => {
            const title = book.querySelector('h3').innerText.toLowerCase();
            if (title.includes(searchTerm)) {
                book.style.display = 'block';
            } else {
                book.style.display = 'none';
            }
        });
    });
}
// ૧. Live Search માટે
const searchInput = document.getElementById('bookSearch');

if (searchInput) {
    searchInput.addEventListener('keyup', function() {
        let value = this.value.toLowerCase();
        let cards = document.querySelectorAll('.book-card');

        cards.forEach(card => {
            let title = card.querySelector('h3').innerText.toLowerCase();
            if (title.indexOf(value) > -1) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
}

// ૨. City Filter માટે
const cityDropdown = document.getElementById('city-select');

if (cityDropdown) {
    cityDropdown.addEventListener('change', function() {
        let selectedCity = this.value.toLowerCase();
        let cards = document.querySelectorAll('.book-card');

        cards.forEach(card => {
            let location = card.querySelector('.location-badge').innerText.toLowerCase();
            if (selectedCity === "all" || location.includes(selectedCity)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
}

function markAsSold(btn) {
    console.log("Button Clicked!"); // આ ચેક કરવા માટે છે

    // તમારા HTML સ્ટ્રક્ચર મુજબ: button -> book-info -> book-card
    // એટલે આપણે બે વાર parentElement લેવું પડશે
    const card = btn.parentElement.parentElement; 
    
    console.log("Card found:", card);

    if (confirm("શું આ બુક વેચાઈ ગઈ છે?")) {
        card.classList.add('sold');
        btn.innerText = "SOLD OUT";
        btn.style.background = "#ff4757";
        btn.disabled = true;
        alert("બુક હવે Sold Out દેખાશે.");
    }
}
function checkStatus() {
    const loginBtn = document.getElementById('loginBtn');
    const logoutLink = document.getElementById('logoutLink');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
        loginBtn.style.display = 'none'; 
        // અહીં 'block' ની જગ્યાએ 'inline-block' કરી નાખ્યું છે
        logoutLink.style.display = 'inline-block'; 
    } else {
        loginBtn.style.display = 'inline-block';
        logoutLink.style.display = 'none';
    }
    displaySavedBooks();
}
function deleteBook(index) {
    // યુઝરને પૂછવા માટે (Double Check)
    if (confirm("શું તમે આ બુકને કાયમી માટે ડિલીટ કરવા માંગો છો?")) {
        // ૧. સ્ટોરેજમાંથી ડેટા લાવો
        let books = JSON.parse(localStorage.getItem('myBooks')) || [];
        
        // ૨. લિસ્ટમાંથી બુક કાઢી નાખો
        books.splice(index, 1);
        
        // ૩. નવું લિસ્ટ સ્ટોરેજમાં સેવ કરો
        localStorage.setItem('myBooks', JSON.stringify(books));
        
        // ૪. પેજ રિફ્રેશ કરો જેથી તે કાર્ડ ગાયબ થઈ જાય
        alert("બુક લિસ્ટમાંથી કાઢી નાખવામાં આવી છે.");
        window.location.reload();
    }
}