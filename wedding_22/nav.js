document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navContainer = document.querySelector('.nav');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navContainer.classList.toggle('active');
        
        if (navContainer.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    const navLinks = document.querySelectorAll('.nav li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                navContainer.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
});