// Data link yang dapat diedit
const editableLinks = [
    {
        id: 1,
        title: "Our Product Website",
        description: "Visit my website",
        url: "https://xentrixsensi.vercel.app/",
        icon: "fas fa-globe",
        iconColor: "text-blue-300",
        active: true
    },
    {
        id: 2,
        title: "Contact Me",
        description: "Contact My Admin",
        url: "https://wa.me//628895823757",
        icon: "fab fa-whatsapp",
        iconColor: "text-blue-300",
        active: true
    },
    {
        id: 3,
        title: "TikTok",
        description: "Edited Content",
        url: "https://www.tiktok.com/@xenzxsukamimisusu",
        icon: "fab fa-tiktok",
        iconColor: "text-blue-300",
        active: true
    },
    {
        id: 4,
        title: "Instagram",
        description: "Official Account",
        url: "https://www.instagram.com/xentrix_official",
        icon: "fab fa-instagram",
        iconColor: "text-blue-300",
        active: true
    },
    {
        id: 5,
        title: "Discord",
        description: "My Community",
        url: "https://discord.gg/va8cseeMdn",
        icon: "fab fa-discord",
        iconColor: "text-blue-300",
        active: true
    },
    {
        id: 6,
        title: "Email",
        description: "Contact My Email",
        url: "xenzzsetting.business@gmail.com",
        icon: "fas fa-envelope",
        iconColor: "text-blue-300",
        active: true
    }
];

// Fungsi untuk menampilkan link
function renderLinks() {
    const linksContainer = document.getElementById('links-container');
    linksContainer.innerHTML = '';
    
    editableLinks.forEach(link => {
        if (link.active) {
            const linkCard = document.createElement('a');
            linkCard.href = link.url;
            linkCard.target = "_blank";
            linkCard.className = "glass-card p-5 flex items-center transition-all duration-300";
            
            linkCard.innerHTML = `
                <div class="icon-glow p-3 rounded-lg mr-4">
                    <i class="${link.icon} ${link.iconColor} text-xl"></i>
                </div>
                <div class="flex-1">
                    <h3 class="font-bold text-lg">${link.title}</h3>
                    <p class="text-gray-400 text-sm">${link.description}</p>
                </div>
                <div class="ml-auto">
                    <i class="fas fa-external-link-alt text-gray-500"></i>
                </div>
            `;
            
            linksContainer.appendChild(linkCard);
        }
    });
}

// Fungsi untuk mengedit link
function editLink(linkId, newData) {
    const linkIndex = editableLinks.findIndex(link => link.id === linkId);
    if (linkIndex !== -1) {
        editableLinks[linkIndex] = { ...editableLinks[linkIndex], ...newData };
        renderLinks();
        return true;
    }
    return false;
}

// Fungsi untuk menambah link baru
function addLink(newLink) {
    const maxId = editableLinks.length > 0 ? Math.max(...editableLinks.map(link => link.id)) : 0;
    newLink.id = maxId + 1;
    editableLinks.push(newLink);
    renderLinks();
    return newLink.id;
}

// Fungsi untuk menghapus link
function deleteLink(linkId) {
    const linkIndex = editableLinks.findIndex(link => link.id === linkId);
    if (linkIndex !== -1) {
        editableLinks.splice(linkIndex, 1);
        renderLinks();
        return true;
    }
    return false;
}

// Inisialisasi partikel.js
document.addEventListener('DOMContentLoaded', function() {
    // Render links pertama kali
    renderLinks();
    
    // Konfigurasi partikel dengan efek glow
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 60,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ["#3b82f6", "#60a5fa", "#93c5fd", "#1e40af"]
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                }
            },
            opacity: {
                value: 0.6,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.2,
                    sync: false
                }
            },
            size: {
                value: 4,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.5,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#3b82f6",
                opacity: 0.3,
                width: 1,
                shadow: {
                    enable: true,
                    color: "#3b82f6",
                    blur: 5
                }
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 160,
                    line_linked: {
                        opacity: 0.8
                    }
                },
                push: {
                    particles_nb: 6
                },
                bubble: {
                    distance: 250,
                    size: 8,
                    duration: 2,
                    opacity: 0.8,
                    speed: 3
                }
            }
        },
        retina_detect: true
    });
    
    // Animasi untuk link cards saat halaman dimuat
    setTimeout(() => {
        const linkCards = document.querySelectorAll('.glass-card');
        linkCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }, 500);
    
    // Tambahkan efek klik pada link cards
    document.addEventListener('click', function(e) {
        if (e.target.closest('.glass-card')) {
            const card = e.target.closest('.glass-card');
            
            // Efek ripple
            const ripple = document.createElement('div');
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(59,130,246,0.8) 0%, rgba(59,130,246,0) 70%);
                transform: scale(0);
                animation: ripple-animation 0.8s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
                z-index: 10;
            `;
            
            card.style.position = 'relative';
            card.style.overflow = 'hidden';
            card.appendChild(ripple);
            
            // Hapus elemen ripple setelah animasi selesai
            setTimeout(() => {
                ripple.remove();
            }, 800);
        }
    });
    
    // Tambahkan style untuk animasi ripple
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Animasi untuk icon pada hover
    const icons = document.querySelectorAll('.icon-glow i');
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // Tambahkan animasi untuk profile image saat hover
    const profileImage = document.querySelector('.profile-image img');
    profileImage.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = 
            '0 15px 40px rgba(59, 130, 246, 0.5), 0 0 50px rgba(59, 130, 246, 0.3)';
    });
    
    profileImage.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 
            '0 10px 30px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.2)';
    });
});

// === FUNGSI UNTUK MENGEDIT LINK DARI CONSOLE ===
// Untuk mengedit, tambahkan, atau menghapus link dari console browser

// Contoh penggunaan dari console:
// 1. Mengedit link yang ada:
//    editLink(1, { title: "Website Baru", url: "https://websitebaru.com" });
//
// 2. Menambah link baru:
//    addLink({
//        title: "Twitter",
//        description: "Follow saya di Twitter",
//        url: "https://twitter.com/johndoe",
//        icon: "fab fa-twitter",
//        iconColor: "text-blue-400",
//        active: true
//    });
//
// 3. Menghapus link:
//    deleteLink(3);
//
// 4. Menonaktifkan link:
//    editLink(2, { active: false });