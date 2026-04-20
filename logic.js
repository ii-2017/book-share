// ૧. યુઝરનું નામ સેવ કરવા માટે (Signup)
function saveUser(event) {
    event.preventDefault();
    const name = document.getElementById('userName').value;
    localStorage.setItem('userName', name);
    alert("Account Created! Welcome " + name);
    window.location.href = "dashboard.html";
}

// ૨. બુક અપલોડ કરવા માટે
function uploadBook(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const price = document.getElementById('price').value;
    const location = document.getElementById('location').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const condition = document.getElementById('book-condition').value;

    // --- આ લાઈન ફોટો મેળવવા માટે છે ---
    const imagePreview = document.getElementById('image-preview').src; 

    // ચેક કરો કે ફોટો પસંદ કર્યો છે કે નહીં
    if (!imagePreview || imagePreview.includes("#")) {
        alert("મહેરબાની કરીને બુકનો કવર ફોટો અપલોડ કરો!");
        return;
    }

    const newBook = {
        title: title,
        category: category,
        price: price,
        location: location,
        whatsapp: whatsapp,
        condition: condition,
        image: imagePreview, // અહીં ફોટો સેવ થશે
        id: Date.now()
    };

    let myBooks = JSON.parse(localStorage.getItem('myBooks')) || [];
    myBooks.push(newBook);
    localStorage.setItem('myBooks', JSON.stringify(myBooks));

    alert("Book Listed Successfully! 🎉");
    window.location.href = "index.html";
}
// ૩. દિલને લાલ (Active) કરવા માટે
function toggleWishlist(btn, name) {
    if (btn.style.color === "rgb(255, 71, 87)" || btn.style.color === "#ff4757") {
        btn.style.color = "#ccc"; // ગ્રે કરો
    } else {
        btn.style.color = "#ff4757"; // લાલ કરો
        alert(name + " Wishlist માં ઉમેરાઈ! ❤️");
    }
}

// ૪. વિશલિસ્ટ ફિલ્ટર કરવા માટે
function filterWishlist() {
    const allCards = document.querySelectorAll('.book-card');
    let foundAny = false;

    allCards.forEach(card => {
        const wishlistBtn = card.querySelector('.wishlist-btn');
        if (wishlistBtn && (wishlistBtn.style.color === "rgb(255, 71, 87)" || wishlistBtn.style.color === "#ff4757")) {
            card.style.display = "block";
            foundAny = true;
        } else {
            card.style.display = "none";
        }
    });

    if (!foundAny) {
        alert("તમારી વિશલિસ્ટ ખાલી છે! પહેલા કોઈ બુકના ❤️ પર ક્લિક કરો.");
        allCards.forEach(card => card.style.display = "block");
    }
}

// ૫. હોમ પેજ પર બધી બુક્સ બતાવવા માટે
function displayHomeBooks() {
    const regularGrid = document.getElementById('bookGrid');
    if (!regularGrid) return;

    const allBooks = JSON.parse(localStorage.getItem('myBooks')) || [];
    // અહીં જૂની HTML બુક્સને અસર ન થાય એટલે માત્ર ડાયનેમિક બુક્સ ઉમેરાશે
    allBooks.forEach(book => {
        const isFree = (book.price == 0 || String(book.price).toLowerCase() === 'free');
        
        regularGrid.innerHTML += `
            <div class="book-card" data-category="${book.category}" style="position: relative; border: ${isFree ? '2px solid #582C83' : '1px solid #eee'}; overflow: hidden; margin-bottom: 20px;">
                <div class="book-img" style="height: 200px; background: #f9f9f9; display: flex; align-items: center; justify-content: center; position: relative;">
                    <img src="https://via.placeholder.com/150x200?text=Book" alt="Book" style="max-height: 100%;">
                    <button class="wishlist-btn" onclick="toggleWishlist(this, '${book.title}')" 
                            style="position: absolute; top: 10px; right: 10px; background: white; border: none; border-radius: 50%; width: 35px; height: 35px; cursor: pointer; box-shadow: 0 2px 10px rgba(0,0,0,0.1); z-index: 20; color: #ccc; font-size: 1.2rem; display: flex; align-items: center; justify-content: center;">
                        ❤
                    </button>
                </div>
                <div class="book-info" style="padding: 15px;">
                    <div style="color: #582C83; font-size: 0.8rem; font-weight: 600;">📍 ${book.location}</div>
                    <h3 style="margin: 10px 0;">${book.title}</h3>
                    <div class="price" style="font-size: 1.5rem; font-weight: 800; color: #582C83;">
                        ${isFree ? 'FREE' : '₹' + book.price}
                    </div>
                    <button onclick="window.open('https://wa.me/${book.whatsapp}', '_blank')" 
                            style="width: 100%; background: ${isFree ? '#582C83' : '#25D366'}; color: white; border: none; padding: 10px; border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 10px;">
                        Chat on WhatsApp
                    </button>
                </div>
            </div>`;
    });
}

// ૬. માય પ્રોફાઇલ (Dashboard) લોડ કરવા માટે
function loadDashboard() {
    const name = localStorage.getItem('userName');
    const nameDisplay = document.getElementById('displayUserName');
    if(name && nameDisplay) {
        nameDisplay.innerText = "Welcome, " + name;
    }

    const myBooks = JSON.parse(localStorage.getItem('myBooks')) || [];
    const container = document.getElementById('userBookGrid');
    
    if(container) {
        container.innerHTML = ""; 
        if(myBooks.length === 0) {
            container.innerHTML = "<p style='text-align:center; width:100%; color: #64748b;'>You haven't listed any books yet.</p>";
        } else {
            myBooks.forEach((book, index) => {
                container.innerHTML += `
                    <div class="book-card" style="padding: 20px; border: 1.5px solid #582C83; border-radius: 20px; background: white; box-shadow: 0 8px 20px rgba(88, 44, 131, 0.1);">
                        <div class="book-info">
                            <h3 style="color: #333; font-weight: 800; margin-bottom: 5px;">${book.title}</h3>
                            <p style="font-weight: 800; color: #582C83; font-size: 1.3rem; margin-bottom: 5px;">₹${book.price}</p>
                            <p style="color: #64748b; font-size: 0.85rem; margin-bottom: 15px;">📍 ${book.location}</p>
                            
                            <button onclick="deleteBook(${index})" 
                                    style="background: #582C83; color: #ffffff; border: none; padding: 12px; border-radius: 12px; cursor: pointer; width: 100%; font-weight: 700; font-size: 14px; display: flex; align-items: center; justify-content: center; gap: 8px; transition: 0.3s; box-shadow: 0 4px 12px rgba(88, 44, 131, 0.2);"
                                    onmouseover="this.style.background='#452266'; this.style.transform='translateY(-2px)'" 
                                    onmouseout="this.style.background='#582C83'; this.style.transform='translateY(0)'">
                                🗑️ Delete 
                            </button>
                        </div>
                    </div>`;
            });
        }
    }
}

// ૭. બુક ડીલીટ કરવા માટે
function deleteBook(index) {
    let myBooks = JSON.parse(localStorage.getItem('myBooks'));
    myBooks.splice(index, 1);
    localStorage.setItem('myBooks', JSON.stringify(myBooks));
    loadDashboard();
}

// ૮. પેજ લોડ થાય ત્યારે
window.onload = function() {
    displayHomeBooks();
    loadDashboard();
};
// ૧. ફોટો પસંદ કરતા જ તેને સ્ક્રીન પર બતાવવા માટે
function previewImage(event) {
    const input = event.target;
    const previewContainer = document.getElementById('preview-container');
    const previewImage = document.getElementById('image-preview');

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function(e) {
            previewImage.src = e.target.result; // ફોટોનો ડેટા સેટ કરો
            previewContainer.style.display = 'block'; // પ્રિવ્યુ બતાવવો
        }

        reader.readAsDataURL(input.files[0]); // ફાઈલ વાંચવી
    }
}

// ૨. ફોટો કાઢી નાખવા માટે
function removeImage() {
    const input = document.getElementById('book-img');
    const previewContainer = document.getElementById('preview-container');
    
    input.value = ""; // ઇનપુટ ક્લિયર કરવું
    previewContainer.style.display = 'none'; // પ્રિવ્યુ છુપાવવો
}