document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Theme Toggle
    const themeToggles = document.querySelectorAll('.theme-toggle');
    
    // Check local storage for theme
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    themeToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            if (document.documentElement.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    });

    // RTL Toggle
    const rtlToggles = document.querySelectorAll('.rtl-toggle');
    
    if (localStorage.getItem('dir') === 'rtl') {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }

    rtlToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentDir = document.documentElement.getAttribute('dir');
            if (currentDir === 'rtl') {
                document.documentElement.setAttribute('dir', 'ltr');
                localStorage.setItem('dir', 'ltr');
            } else {
                document.documentElement.setAttribute('dir', 'rtl');
                localStorage.setItem('dir', 'rtl');
            }
        });
    });

    // Scroll to Top Button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Header active state
    const navLinks = document.querySelectorAll('.nav-link');
    let currentPath = window.location.pathname.split('/').pop();
    if (!currentPath || currentPath === '/') currentPath = 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            if (link.closest('#mobile-menu')) {
                // Mobile/Tablet active state - Highlighting
                link.classList.add('bg-amber-50', 'dark:bg-amber-900/20', 'text-amber-600', 'dark:text-amber-400', 'border-l-4', 'border-amber-600', 'pl-4', 'pr-3');
                link.classList.remove('px-3', 'text-zinc-900', 'dark:text-white');
            } else {
                // Desktop active state
                link.classList.add('text-amber-600', 'dark:text-amber-400', 'font-semibold');
                link.classList.remove('text-zinc-600', 'dark:text-zinc-300');
            }
        }
    });

    // Simple Form Validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                } else {
                    field.classList.remove('border-red-500');
                }
            });

            if (isValid) {
                // If it's a login or signup form, just show success, or submit.
                // For demo purposes, we will just alert.
                // In a real app, we'd submit.
                const btn = form.querySelector('button[type="submit"]');
                const origText = btn.innerText;
                btn.innerText = 'Processing...';
                setTimeout(() => {
                    alert('Submitted successfully!');
                    btn.innerText = origText;
                    form.reset();
                }, 1000);
            }
        });
    });

    // Password Visibility Toggle
    const togglePassword = document.querySelectorAll('.toggle-password');
    togglePassword.forEach(btn => {
        btn.addEventListener('click', function () {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            
            // Update icon
            if (type === 'text') {
                this.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"></path></svg>`;
            } else {
                this.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>`;
            }
        });
    });
});
