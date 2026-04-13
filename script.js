// WhatsApp પર મેસેજ મોકલવાનું ફંક્શન
function contactSeller(phoneNumber, bookName) {
    // વોટ્સએપ મેસેજ તૈયાર કરો
    const message = `Hello, I saw your book "${bookName}" on BOOKSHARE and I am interested in buying it.`;
    
    // WhatsApp API લિંક બનાવો
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // નવી ટેબમાં વોટ્સએપ ખોલો
    window.open(whatsappUrl, '_blank');
}

// બુકને Sold Out માર્ક કરવા માટેનું લોજિક (સેલર માટે)
function markAsSold(buttonElement) {
    const card = buttonElement.closest('.book-card');
    
    // કાર્ડમાં Sold Out ક્લાસ ઉમેરો
    card.classList.add('sold');
    
    // બટન બદલી નાખો
    buttonElement.innerText = "Sold Out";
    buttonElement.disabled = true;
    buttonElement.classList.add('disabled');
    
    // અહીં તમે વોટ્સએપ પર ઓટોમેટિક મેસેજ મોકલવા માટેનું લોજિક પણ સેટ કરી શકો
    alert("This book is now marked as Sold!");
}
function toggleWishlist(button, bookName) {
    // હાર્ટનો કલર બદલવા માટે 'active' ક્લાસ ટોગલ કરો
    button.classList.toggle('active');
    
    if (button.classList.contains('active')) {
        // બુક એડ થઈ ત્યારે
        alert(bookName + " Wishlist ma add thai gayi chhe! ❤️");
    } else {
        // બુક કાઢી નાખી ત્યારે
        alert(bookName + " Wishlist mathi kadhi nakhi.");
    }
}
function filterBooks(category) {
    // બધી બુક કાર્ડ્સ મેળવો
    const books = document.querySelectorAll('.book-card');
    const tags = document.querySelectorAll('.cat-tag');

    // એક્ટિવ ટેગનો કલર બદલવા માટે (Optional)
    tags.forEach(tag => {
        tag.classList.remove('active-tag');
        if(tag.innerText.toLowerCase() === category) {
            tag.classList.add('active-tag');
        }
    });

    books.forEach(book => {
        // જો 'all' સિલેક્ટ કર્યું હોય તો બધી બુક્સ બતાવો
        if (category === 'all') {
            book.style.display = 'block';
            book.style.animation = 'fadeIn 0.5s ease'; // એનિમેશન સાથે બતાવો
        } 
        // જો કેટેગરી મેચ થાય તો બતાવો, નહીંતર છુપાવો (Hide)
        else if (book.getAttribute('data-category') === category) {
            book.style.display = 'block';
            book.style.animation = 'fadeIn 0.5s ease';
        } 
        else {
            book.style.display = 'none';
        }
    });
}
// ખરીદનાર સેલરને રેટિંગ આપી શકે તે માટે
function rateSeller(sellerName) {
    let rating = prompt(`How was your experience with ${sellerName}? (Enter 1 to 5 stars)`);
    
    if (rating >= 1 && rating <= 5) {
        alert(`Thank you! You gave ${rating} stars to the seller. This will help other students.`);
        // ભવિષ્યમાં આ રેટિંગ આપણે ડેટાબેઝમાં સેવ કરશું
    } else if (rating !== null) {
        alert("Please enter a valid rating between 1 and 5.");
    }
}