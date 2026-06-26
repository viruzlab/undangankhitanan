/* ===================================
   UNDANGAN KHITANAN DIGITAL - JS
   =================================== */

// ===== CONFIGURATION =====
const CONFIG = {
    eventDate: new Date('2026-07-01T10:00:00+07:00'),
    childName: 'Muhammad Zaini Dahlan',
    parentNames: 'Bapak Yadi Supriyadi & Ibu Adelia',
};

// ===== GUEST NAME FROM URL =====
function getGuestName() {
    const params = new URLSearchParams(window.location.search);
    return params.get('kpd') || params.get('to') || 'Bapak/Ibu/Saudara/i';
}

document.addEventListener('DOMContentLoaded', function() {
    // Set guest name
    const guestNameEl = document.getElementById('guestName');
    if (guestNameEl) {
        guestNameEl.textContent = getGuestName();
    }

    // Initialize countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Initialize scroll animations
    initScrollAnimations();

    // Load saved wishes
    loadWishes();
});

// ===== OPENING SCREEN =====
function openInvitation() {
    const openingScreen = document.getElementById('openingScreen');
    openingScreen.classList.add('hidden');

    // Show music button
    const musicBtn = document.getElementById('musicBtn');
    musicBtn.classList.add('visible');

    // Try to play music
    playMusic();

    // Trigger scroll animations after a short delay
    setTimeout(() => {
        triggerVisibleAnimations();
    }, 500);
}

// ===== MUSIC CONTROLS =====
let isMusicPlaying = false;

function playMusic() {
    const audio = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicBtn');

    audio.volume = 0.3;
    const playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            isMusicPlaying = true;
            musicBtn.classList.add('playing');
            updateMusicIcon(true);
        }).catch(() => {
            isMusicPlaying = false;
            updateMusicIcon(false);
        });
    }
}

function toggleMusic() {
    const audio = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicBtn');

    if (isMusicPlaying) {
        audio.pause();
        isMusicPlaying = false;
        musicBtn.classList.remove('playing');
        updateMusicIcon(false);
    } else {
        audio.play();
        isMusicPlaying = true;
        musicBtn.classList.add('playing');
        updateMusicIcon(true);
    }
}

function updateMusicIcon(playing) {
    const icon = document.getElementById('musicIcon');
    if (playing) {
        icon.innerHTML = '<path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" fill="currentColor"/>';
    } else {
        icon.innerHTML = '<path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" fill="currentColor"/>';
    }
}

// ===== COUNTDOWN =====
function updateCountdown() {
    const now = new Date();
    const diff = CONFIG.eventDate - now;

    if (diff <= 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

function triggerVisibleAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('visible');
        }
    });
}

// ===== WISHES =====
const DUMMY_WISHES = [];

function loadWishes() {
    const wishesList = document.getElementById('wishesList');
    const savedWishes = JSON.parse(localStorage.getItem('khitanan_wishes') || '[]');
    const allWishes = [...savedWishes, ...DUMMY_WISHES];

    wishesList.innerHTML = '';
    allWishes.forEach(wish => {
        wishesList.innerHTML += createWishHTML(wish);
    });
}

function createWishHTML(wish) {
    const initial = wish.name.charAt(0).toUpperCase();
    const attendanceText = wish.attendance === 'hadir' ? 'Hadir' : wish.attendance === 'tidak' ? 'Tidak Hadir' : 'Ragu';
    const badgeClass = wish.attendance === 'hadir' ? 'hadir' : 'tidak-hadir';

    return `
        <div class="wish-item">
            <div class="wish-header">
                <div class="wish-avatar">${initial}</div>
                <span class="wish-name">${escapeHTML(wish.name)}</span>
                <span class="attendance-badge ${badgeClass}">${attendanceText}</span>
            </div>
            <p class="wish-message">${escapeHTML(wish.message)}</p>
        </div>
    `;
}

function submitWish(event) {
    event.preventDefault();

    const name = document.getElementById('wishName').value.trim();
    const attendance = document.getElementById('wishAttendance').value;
    const message = document.getElementById('wishMessage').value.trim();

    if (!name || !attendance || !message) {
        showToast('Mohon isi semua field!');
        return;
    }

    const newWish = {
        name: name,
        attendance: attendance,
        message: message,
        time: 'Baru saja'
    };

    // Save to localStorage
    const savedWishes = JSON.parse(localStorage.getItem('khitanan_wishes') || '[]');
    savedWishes.unshift(newWish);
    localStorage.setItem('khitanan_wishes', JSON.stringify(savedWishes));

    // Reload wishes
    loadWishes();

    // Reset form
    document.getElementById('wishForm').reset();

    // Show success toast
    showToast('✅ Ucapan berhasil dikirim!');

    // Scroll to wishes list
    document.getElementById('wishesList').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ===== COPY TO CLIPBOARD =====
function copyText(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.textContent;
        button.textContent = '✓ Tersalin';
        button.classList.add('copied');

        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);

        showToast('📋 Berhasil disalin!');
    }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        const originalText = button.textContent;
        button.textContent = '✓ Tersalin';
        button.classList.add('copied');

        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);

        showToast('📋 Berhasil disalin!');
    });
}

// ===== TOAST NOTIFICATION =====
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== HELPER FUNCTIONS =====
function escapeHTML(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

// ===== SMOOTH SCROLL FOR INTERNAL LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
