const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('footer-cta');
const closeModalBtn = document.getElementById('close-modal');

function openModal() {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; 
}


function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; 
}

openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

function showError(input, message) {
    const inputWrapper = input.parentElement;
    let errorElement = inputWrapper.querySelector('.error-message');

    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        inputWrapper.appendChild(errorElement);
    }

    errorElement.textContent = message;
    input.classList.add('error');
}

function clearError(input) {
    const inputWrapper = input.parentElement;
    const errorElement = inputWrapper.querySelector('.error-message');

    if (errorElement) {
        errorElement.remove();
    }

    input.classList.remove('error');
}


const form = document.querySelector('.modal form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        
        const nameInput = form.querySelector('input[type="text"]');
        const phoneInput = form.querySelector('input[type="tel"]');
        
        let isValid = true;
        
        if (!nameInput.value.trim()) {
            showError(nameInput, 'Пожалуйста, введите ваше имя');
            isValid = false;
        } else {
            clearError(nameInput);
        }
        
        if (!phoneInput.value.trim()) {
            showError(phoneInput, 'Пожалуйста, введите ваш телефон');
            isValid = false;
        } else {
            clearError(phoneInput);
        }
        
        if (isValid) {
            
            alert('Форма успешно отправлена!');
            closeModal();
            form.reset();
        }
    });
}

const phoneInput = document.querySelector('input[type="tel"]');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        const x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ''}`;
    });
}