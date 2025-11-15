// Aguarda o HTML carregar
document.addEventListener('DOMContentLoaded', () => {
    
    const subNav = document.getElementById('sub-nav-mestre');
    const contentSections = document.querySelectorAll('.content-section');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');

    // --- 1. LÓGICA DAS ABAS (TABS) ---
    if (subNav) {
        subNav.addEventListener('click', (e) => {
            // Só ativa se clicar num botão de aba
            if (!e.target.classList.contains('sub-nav-btn')) return;

            const targetId = e.target.dataset.target;
            
            // Atualiza botões
            subNav.querySelectorAll('.sub-nav-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            // Atualiza conteúdo
            contentSections.forEach(section => {
                section.classList.toggle('active', section.id === targetId);
            });

            // (NOVO) Fecha o menu popup após clicar numa aba
            if (window.innerWidth <= 768) {
                subNav.classList.remove('open');
            }
        });
    }

    // --- 2. LÓGICA DO MENU POPUP (HAMBÚRGUER) ---
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', () => {
            subNav.classList.add('open');
        });
    }

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', () => {
            subNav.classList.remove('open');
        });
    }
});