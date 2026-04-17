// --- ૧. Signup પેજ માટેનું ફંક્શન ---
function saveUser(event) {
    event.preventDefault();
    const name = document.getElementById('userName').value; // Signup પેજના ID મુજબ
    localStorage.setItem('userName', name);
    alert("Account Created! Welcome " + name);
    window.location.href = "dashboard.html";
}

// --- ૨. Sell Book (Upload) પેજ માટેનું ફંક્શન ---
function uploadBook(event) {
    event.preventDefault();
    
    // તમારા ફોર્મના ID મુજબ ડેટા મેળવવો
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const location = document.getElementById('location').value;
    const category = document.getElementById('category').value;
    const whatsapp = document.getElementById('whatsapp').value;

    let myBooks = JSON.parse(localStorage.getItem('myBooks')) || [];

    const newBook = {
        title: title,
        price: price,
        location: location,
        category: category,
        whatsapp: whatsapp,
        id: Date.now()
    };

    myBooks.push(newBook);
    localStorage.setItem('myBooks', JSON.stringify(myBooks));

    alert("Book uploaded successfully! 🎉");
    window.location.href = "dashboard.html";
}

// --- ૩. હોમ પેજ પર બુક્સ બતાવવા માટે (Free Tag સાથે) ---
function displayHomeBooks() {
    const regularGrid = document.getElementById('bookGrid');
    if (!regularGrid) return; // જો હોમ પેજ ન હોય તો અટકી જશે

    const allBooks = JSON.parse(localStorage.getItem('myBooks')) || [];
    regularGrid.innerHTML = ""; // જૂનો ડેટા સાફ કરો

    allBooks.forEach(book => {
        // ૧. ચેક કરો કે બુક ફ્રી છે કે નહીં
        let isFree = (book.price == 0 || String(book.price).toLowerCase() === 'free');
        let priceTag = "";
        let cardStyle = "";
        
        if (isFree) {
            priceTag = `<span style="background: #582C83; color: white; padding: 5px 12px; border-radius: 50px; font-size: 0.75rem; font-weight: 800; position: absolute; top: 15px; left: 15px; z-index: 10; box-shadow: 0 4px 10px rgba(88,44,131,0.3);">🎁 FREE DONATION</span>`;
            cardStyle = "border: 2px solid #582C83;"; 
        }

        // ૨. કાર્ડ બનાવવું
        regularGrid.innerHTML += `
            <div class="book-card" style="position: relative; ${cardStyle}">
                ${priceTag}
                <div class="book-img">
                    <img src="default-book.jpg" alt="Book">
                </div>
                <div class="book-info">
                    <div class="location-badge">📍 ${book.location}</div>
                    <h3>${book.title}</h3>
                    <div class="price-row">
                        <span class="price">${isFree ? 'FREE' : '₹' + book.price}</span>
                    </div>
                    <button class="chat-btn" onclick="window.open('https://wa.me/${book.whatsapp}', '_blank')" style="background: ${isFree ? '#582C83' : '#22c55e'}">
                        ${isFree ? 'Get For Free' : 'Chat on WhatsApp'}
                    </button>
                </div>
            </div>`;
    });
}

// --- ૪. Dashboard પેજ માટે ---
function loadDashboard() {
    const name = localStorage.getItem('userName');
    const nameDisplay = document.getElementById('displayUserName');
    if(name && nameDisplay) {
        nameDisplay.innerText = "Welcome, " + name;
    }

    const myBooks = JSON.parse(localStorage.getItem('myBooks')) || [];
    const container = document.getElementById('userBookGrid');
    
    if(container) {
        if(myBooks.length === 0) {
            container.innerHTML = "<p style='color: #64748b; font-style: italic;'>You haven't listed any books yet.</p>";
        } else {
            container.innerHTML = "";
            myBooks.forEach((book, index) => {
                let isFree = (book.price == 0 || String(book.price).toLowerCase() === 'free');
                container.innerHTML += `
                    <div class="book-card" style="padding: 20px; border-radius: 20px; background: white; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: ${isFree ? '2px solid #582C83' : 'none'};">
                        <div class="book-info">
                            <h3 style="color: #582C83; font-weight: 800;">${book.title}</h3>
                            <p class="price" style="font-size: 1.4rem; font-weight: 800; color: #582C83;">${isFree ? 'FREE' : '₹' + book.price}</p>
                            <p style="color: #64748b; font-size: 0.9rem;">📍 ${book.location}</p>
                            <button onclick="deleteBook(${index})" class="dashboard-delete-btn">
                                <i class="fas fa-trash-alt"></i> Delete
                            </button>
                        </div>
                    </div>`;
            });
        }
    }
}

// બુક ડીલીટ કરવા માટે
function deleteBook(index) {
    let myBooks = JSON.parse(localStorage.getItem('myBooks'));
    myBooks.splice(index, 1);
    localStorage.setItem('myBooks', JSON.stringify(myBooks));
    loadDashboard();
}

// જ્યારે પેજ લોડ થાય ત્યારે બંને ફંક્શન ચલાવવા
window.onload = function() {
    loadDashboard();   // ડેશબોર્ડ માટે
    displayHomeBooks(); // હોમ પેજ માટે
};
function displayHomeBooks() {
    const regularGrid = document.getElementById('bookGrid');
    if (!regularGrid) return;

    const allBooks = JSON.parse(localStorage.getItem('myBooks')) || [];
    regularGrid.innerHTML = ""; 

    allBooks.forEach(book => {
        // ૧. કિંમત 0 છે કે નહીં તે પ્રોપર ચેક કરો
        const priceValue = parseInt(book.price);
        const isFree = (priceValue === 0 || String(book.price).toLowerCase() === 'free');
        
        // ૨. ફ્રી ટેગની ડિઝાઇન
        let freeBadge = isFree ? 
            `<div style="position: absolute; top: 15px; left: 15px; background: #582C83; color: white; padding: 6px 12px; border-radius: 8px; font-weight: 800; font-size: 0.7rem; z-index: 10; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">🎁 FREE DONATION</div>` 
            : "";

        // ૩. કાર્ડમાં ટેગ અને બોર્ડર સેટ કરો
        regularGrid.innerHTML += `
            <div class="book-card" style="position: relative; border: ${isFree ? '2px solid #582C83' : '1px solid #eee'}; overflow: hidden;">
                ${freeBadge}
                <div class="book-img" style="height: 200px; background: #f9f9f9; display: flex; align-items: center; justify-content: center;">
                    <img src="default-book.jpg" alt="Book" style="max-height: 100%;">
                </div>
                <div class="book-info" style="padding: 15px;">
                    <div style="color: #582C83; font-size: 0.8rem; font-weight: 600;">📍 ${book.location || 'Unknown'}</div>
                    <h3 style="margin: 10px 0; font-size: 1.1rem; color: #333;">${book.title}</h3>
                    <div class="price" style="font-size: 1.5rem; font-weight: 800; color: #582C83; margin-bottom: 15px;">
                        ${isFree ? 'FREE' : '₹' + book.price}
                    </div>
                    
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <button onclick="window.open('https://wa.me/${book.whatsapp || ''}', '_blank')" 
                                style="background: ${isFree ? '#582C83' : '#25D366'}; color: white; border: none; padding: 10px; border-radius: 8px; font-weight: bold; cursor: pointer;">
                            ${isFree ? 'Contact Donor' : 'Chat on WhatsApp'}
                        </button>
                    </div>
                </div>
            </div>`;
    });
}