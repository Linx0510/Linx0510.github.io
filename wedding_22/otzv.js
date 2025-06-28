document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.getElementById('reviewForm');
    const nameInput = document.getElementById('name');
    const messageInput = document.getElementById('message');
    const uploadInput = document.querySelector('.upload-input');
    const uploadBox = document.querySelector('.upload-box');
    const uploadText = document.querySelector('.upload-text');
    const uploadIcon = document.querySelector('.upload-icon');
    
    uploadInput.addEventListener('change', function(e) {
        if (this.files && this.files[0]) {
            const fileName = this.files[0].name;
            uploadText.textContent = fileName;
            
            const reader = new FileReader();
            reader.onload = function(event) {
                const imgPreview = document.createElement('img');
                imgPreview.src = event.target.result;
                imgPreview.style.maxHeight = '60px';
                imgPreview.style.maxWidth = '60px';
                imgPreview.style.borderRadius = '4px';
                
                uploadBox.innerHTML = '';
                uploadBox.appendChild(imgPreview);
                
                const fileNameText = document.createElement('div');
                fileNameText.textContent = fileName;
                fileNameText.style.fontSize = '12px';
                fileNameText.style.marginTop = '8px';
                fileNameText.style.color = '#EFEFEF';
                fileNameText.style.textAlign = 'center';
                fileNameText.style.maxWidth = '100%';
                fileNameText.style.overflow = 'hidden';
                fileNameText.style.textOverflow = 'ellipsis';
                fileNameText.style.whiteSpace = 'nowrap';
                uploadBox.appendChild(fileNameText);
            };
            reader.readAsDataURL(this.files[0]);
        }
    });
    
    uploadBox.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.borderColor = '#4CAF50';
        this.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
    });
    
    uploadBox.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.style.borderColor = '#EFEFEF';
        this.style.backgroundColor = 'transparent';
    });
    
    uploadBox.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor = '#EFEFEF';
        this.style.backgroundColor = 'transparent';
        
        if (e.dataTransfer.files.length) {
            uploadInput.files = e.dataTransfer.files;
            const event = new Event('change');
            uploadInput.dispatchEvent(event);
        }
    });
    
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        resetErrors();
        
        let isValid = true;
        
        if (!nameInput.value.trim()) {
            showError(nameInput, 'nameError', 'Пожалуйста, введите ваше имя');
            isValid = false;
        }
        
        if (!messageInput.value.trim()) {
            showError(messageInput, 'messageError', 'Пожалуйста, введите ваш отзыв');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showError(messageInput, 'messageError', 'Отзыв должен содержать не менее 10 символов');
            isValid = false;
        }
        
        if (isValid) {
            addNewReview();
        }
    });
    
    function showError(input, errorId, message) {
        input.classList.add('error');
        const errorElement = document.getElementById(errorId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function resetErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(function(error) {
            error.style.display = 'none';
        });
        
        const errorInputs = document.querySelectorAll('.form-input.error');
        errorInputs.forEach(function(input) {
            input.classList.remove('error');
        });
    }
    
    function addNewReview() {
        const name = nameInput.value.trim();
        const message = messageInput.value.trim();
        const photoInput = uploadInput;
        const photo = photoInput.files[0];
        
        const newReview = document.createElement('div');
        newReview.className = 'otzv';
        
        if (photo) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const photoHtml = `<img src="${e.target.result}" alt="Фото от ${name}" style="height: 338px; width: auto; border-radius: 5px;">`;
                newReview.innerHTML = `
                    ${photoHtml}
                    <div class="textblok">
                        <h5>${name}</h5>
                        <p>${message}</p>
                    </div>
                `;
                insertNewReview(newReview);
            };
            reader.readAsDataURL(photo);
        } else {
            newReview.innerHTML = `
                <img src="img/default-avatar.png" alt="Фото от ${name}" style="height: 338px; width: auto; border-radius: 5px;">
                <div class="textblok">
                    <h5>${name}</h5>
                    <p>${message}</p>
                </div>
            `;
            insertNewReview(newReview);
        }
    }
    
    function insertNewReview(newReview) {
        const mainElement = document.querySelector('main');
        const firstReview = mainElement.querySelector('.otzv');
        
        if (firstReview) {
            mainElement.insertBefore(newReview, firstReview);
        } else {
            mainElement.appendChild(newReview);
        }
        
        
        newReview.style.opacity = '0';
        newReview.style.transform = 'translateY(20px)';
        setTimeout(() => {
            newReview.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            newReview.style.opacity = '1';
            newReview.style.transform = 'translateY(0)';
        }, 10);
        
        reviewForm.reset();
        
        uploadBox.innerHTML = `
            <div class="upload-icon">
                <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30 42.2473C30 42.2473 32.129 47.397 30 47.7519C27.871 48.1067 16.516 48.1067 14.387 47.7519C12.258 47.397 14.387 42.2487 14.387 42.2487M22.157 44.3467L22.126 33.193M26.769 37.3737L22.128 32.8486L17.484 37.3724" stroke="#EFEFEF" stroke-linejoin="round"/>
                </svg>
            </div>
            <div class="upload-text">Перетащите фото сюда или кликните для загрузки</div>
            <input type="file" class="upload-input" accept="image/*">
        `;
        
        setTimeout(() => {
            newReview.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        
        const newUploadInput = document.querySelector('.upload-input');
        newUploadInput.addEventListener('change', uploadInput._events.change[0].listener);
    }
});