// Chờ cho trang tải hoàn tất
document.addEventListener('DOMContentLoaded', () => {
    // 1. Hiệu ứng Hạt Nền Động (Particle Effect)
    createParticles();

    // 2. Tương tác Nền khi Tập Trung vào các Trường Nhập Liệu
    setupFocusEffects();
});

/**
 * Tạo ra các hạt bụi cam mờ bay lơ lửng trên nền
 */
function createParticles() {
    const container = document.body;
    const numParticles = 70; // Số lượng hạt bay

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Vị trí ngẫu nhiên
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;

        // Kích thước ngẫu nhiên
        const size = Math.random() * 3 + 1; // 1px đến 4px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Thời gian và độ trễ hoạt ảnh ngẫu nhiên
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.animationDuration = `${Math.random() * 15 + 10}s`;

        container.appendChild(particle);
    }

    // Thêm CSS cho hạt trực tiếp vào script để tiện
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        .particle {
            position: absolute;
            background-color: rgba(255, 94, 0, 0.4); /* Màu cam mờ */
            border-radius: 50%;
            opacity: 0;
            animation: particleMove linear infinite;
            pointer-events: none; /* Đảm bảo không cản trở tương tác form */
            z-index: -1;
        }

        @keyframes particleMove {
            0% { transform: translateY(0) scale(1); opacity: 0; }
            10% { opacity: 0.8; }
            90% { opacity: 0.8; }
            100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
        }
    `;
    document.head.appendChild(particleStyle);
}

/**
 * Làm cho hình nền mờ và tối hơn khi sếp tập trung vào form
 */
function setupFocusEffects() {
    const inputs = document.querySelectorAll('.input-group input');
    const background = document.querySelector('.background-container');

    inputs.forEach(input => {
        // Khi sếp tập trung vào một trường
        input.addEventListener('focus', () => {
            // Làm mờ nền thêm và phóng to nhẹ để form nổi bật hơn nữa
            background.style.filter = 'brightness(0.6) blur(6px)';
            background.style.transform = 'scale(1.04)';
        });

        // Khi sếp rời khỏi trường
        input.addEventListener('blur', () => {
            // Khôi phục nền về trạng thái ban đầu
            background.style.filter = 'brightness(0.7) blur(2px)';
            background.style.transform = 'scale(1)';
        });
    });
}