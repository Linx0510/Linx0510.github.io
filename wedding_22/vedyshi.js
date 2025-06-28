const modal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const closeBtn = document.querySelector('.close');

const promoImages = document.querySelectorAll('.promo_clm1 img');

promoImages.forEach(img => {
    img.addEventListener('click', function() {
        let videoSrc = '';
        if (this.src.includes('promo_clmn1_1.png')) {
            videoSrc = 'video/Рилс.mp4';
        } else if (this.src.includes('promo_clmn1_2.png')) {
            videoSrc = 'video/Интервью.mp4'; 
        } else if (this.src.includes('promo_clmn1_3.png')) {
            videoSrc = 'video/Одним словом.MOV'; 
        }
        
        modalVideo.src = videoSrc;
        modal.style.display = 'flex';
        modalVideo.play();
    });
});

closeBtn.addEventListener('click', function() {
    modal.style.display = 'none';
    modalVideo.pause();
    modalVideo.currentTime = 0;
});

window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        modalVideo.pause();
        modalVideo.currentTime = 0;
    }
});