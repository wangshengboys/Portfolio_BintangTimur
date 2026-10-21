document.addEventListener("DOMContentLoaded", function() {
    // --- 1. HITUNG UMUR OTOMATIS (Berdasarkan Juni 2004) ---
    function updateAge() {
        // Tanggal lahir: Juni 2004 (Bulan di JS 0-indexed: 5 = Juni)
        const birthDate = new Date(2004, 5, 1);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        // Kurangi 1 tahun jika bulan belum sampai atau tanggal belum terlewati
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        const ageElements = document.querySelectorAll(".user-age, #user-age");
        ageElements.forEach(el => {
            el.textContent = age;
        });
    }

    updateAge();

    // --- 2. SCROLL-SPY NAVIGASI ---
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links li a");

    const sectionsWithId = Array.from(sections).filter(section => section.id);
    if (sectionsWithId.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -70% 0px", // Deteksi hanya ketika section berada di paruh atas layar
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("id");
                    if (!id) return;

                    const activeLink = document.querySelector(`.nav-links li a[href="#${id}"]`);
                    if (activeLink) {
                        // Hapus class active hanya dari anchor links (#)
                        navLinks.forEach(link => {
                            if (link.getAttribute("href")?.startsWith("#")) {
                                link.classList.remove("active");
                            }
                        });
                        activeLink.classList.add("active");
                    }
                }
            });
        }, observerOptions);

        sectionsWithId.forEach(section => {
            observer.observe(section);
        });
    }

    // --- 3. TUTUP MENU MOBILE OTOMATIS SAAT TAUTAN DIKLIK ---
    const menuToggle = document.getElementById("menu-toggle");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (menuToggle && menuToggle.checked) {
                menuToggle.checked = false;
            }
        });
    });
});

