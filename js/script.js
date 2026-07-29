document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links li a");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3 // Memicu ketika 30% dari section terlihat
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Hapus class active dari semua link
                navLinks.forEach(link => link.classList.remove("active"));

                // Dapatkan id dari section yang terlihat
                const id = entry.target.getAttribute("id");

                // Tambahkan class active ke link yang sesuai
                const activeLink = document.querySelector(`.nav-links li a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Tutup menu otomatis di versi mobile saat tautan diklik
    const menuToggle = document.getElementById("menu-toggle");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (menuToggle && menuToggle.checked) {
                menuToggle.checked = false;
            }
        });
    });
});
