document.addEventListener('DOMContentLoaded', function() {
    let image = document.querySelector('.weather-image-left img');
    
    // Изначально устанавливаем translateY за пределами видимой области
    image.style.transform = 'translateY(-100vh)';

    // Задаем анимацию при появлении элемента
    image.style.transition = 'transform 1s ease-in-out';

    // Задаем новое значение transform, чтобы выезжать на экран
    setTimeout(function() {
        image.style.transform = 'translateY(0)';
    }, 100);
});



