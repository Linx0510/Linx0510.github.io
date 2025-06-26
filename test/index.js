(() => {
    const slidesWrapper = document.querySelector('.slides-wrapper');
    const slides = Array.from(document.querySelectorAll('.slide'));
    const prevBtn = document.querySelector('.arrow-left');
    const nextBtn = document.querySelector('.arrow-right');
    const slideCount = slides.length;
    const autoSlideDelay = 5000; 
    let currentIndex = 0;
    let autoSlideTimer = null;
    let isAnimating = false; 

    function updateSlide() {
        if (isAnimating) return;
        isAnimating = true;
        
        slidesWrapper.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
        slides.forEach((slide, index) => {
            slide.setAttribute('aria-hidden', index !== currentIndex);
        });
        
        
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    function showNext() {
        if (isAnimating) return;
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlide();
    }

    function showPrev() {
        if (isAnimating) return;
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSlide();
    }

    
    function resetAutoSlide() {
        if (autoSlideTimer) {
            clearInterval(autoSlideTimer);
        }
        autoSlideTimer = setInterval(showNext, autoSlideDelay);
    }

    function init() {
        prevBtn.addEventListener('click', () => {
            showPrev();
            resetAutoSlide();
        });
        nextBtn.addEventListener('click', () => {
            showNext();
            resetAutoSlide();
        });
        [prevBtn, nextBtn].forEach(button => {
            button.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    button.click();
                }
            });
        });
        resetAutoSlide();
        updateSlide();
        
        
        slides.forEach(slide => {
            slide.style.width = '100%';
        });
    }

    document.addEventListener('DOMContentLoaded', init);
})();