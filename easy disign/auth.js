
function saveUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    let users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const existingUserIndex = users.findIndex(u => u.email === user.email);
    
    if (existingUserIndex === -1) {
        users.push(user);
    } else {
        users[existingUserIndex] = user;
    }
    
    localStorage.setItem('registeredUsers', JSON.stringify(users));
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

function checkAuth() {
    return localStorage.getItem('currentUser') !== null;
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'main.html';
}

function getUserByEmail(email) {
    const users = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    return users.find(user => user.email === email);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}


function validatePhone(phone) {
    const re = /^[\d\+][\d\(\)\ -]{4,14}\d$/;
    return re.test(phone);
}

function validateName(name) {
    return name.length >= 2;
}