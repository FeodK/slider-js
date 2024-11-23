
const images = [
    'src/img/slide1.jpg',
    'src/img/slide2.jpg',
    'src/img/slide3.jpg'
  ];
  
  let currentIndex = 0;

  function changeImage(direction) {
    currentIndex += direction;
  
    if (currentIndex < 0) {
      currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
      currentIndex = 0; 
    }
  
    updateSlider();
  }
  
  function goToImage(index) {
    currentIndex = index;
    updateSlider();
  }

  function updateSlider() {
    const imageElement = document.getElementById('slider-image');
    imageElement.src = images[currentIndex];
  

    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
  }
  
  function openModal(imageSrc) {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    modal.style.display = 'flex';
    modalImage.src = imageSrc;
  }
  

  function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
  }
  

  function renderSlider() {

    let sliderHTML = `
      <div class="slider-container">
        <div class="slider">
          <img id="slider-image" src="${images[currentIndex]}" alt="Слайд">
          <button class="slider-button prev">&#10094;</button>
          <button class="slider-button next">&#10095;</button>
        </div>
        <div class="dots-container">
          ${images.map((image, index) => `
            <span class="dot ${index === currentIndex ? 'active' : ''}" data-index="${index}"></span>
          `).join('')}
        </div>
      </div>
      <div id="modal" class="modal">
        <div class="modal-content">
          <span class="close-btn">&times;</span>
          <img id="modal-image" src="" alt="Модальное изображение">
        </div>
      </div>
    `;
  

    document.body.innerHTML = sliderHTML;
  
    document.querySelector('.prev').addEventListener('click', () => changeImage(-1));
    document.querySelector('.next').addEventListener('click', () => changeImage(1));
  
    document.querySelectorAll('.dot').forEach(dot => {
      dot.addEventListener('click', (e) => goToImage(Number(e.target.dataset.index)));
    });
  

    const sliderImage = document.getElementById('slider-image');
    sliderImage.addEventListener('click', () => openModal(images[currentIndex]));
  
    const closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', closeModal);
  
    const modal = document.getElementById('modal');
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });
  }
  
  window.onload = renderSlider;