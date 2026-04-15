const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');
const revealItems = document.querySelectorAll('.reveal');
const budgetForm = document.querySelector('#budget-form');
const fileInput = document.querySelector('input[name="foto"]');
const fileName = document.querySelector('#file-name');
const whatsappNumber = '5528999503534';

if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
        const isOpen = siteNav.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            siteNav.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
});

revealItems.forEach((item) => revealObserver.observe(item));

if (fileInput && fileName) {
    fileInput.addEventListener('change', () => {
        const selectedFile = fileInput.files && fileInput.files[0];
        fileName.textContent = selectedFile ? `Imagem selecionada: ${selectedFile.name}` : 'Nenhuma imagem selecionada';
    });
}

if (budgetForm) {
    budgetForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(budgetForm);
        const photo = formData.get('foto');
        const photoName = photo && photo.name ? photo.name : 'Nenhuma foto selecionada';

        const fields = [
            ['Nome', formData.get('nome')],
            ['Telefone', formData.get('telefone')],
            ['WhatsApp', formData.get('whatsapp')],
            ['E-mail', formData.get('email') || 'Não informado'],
            ['Tipo de serviço', formData.get('servico')],
            ['Medidas', formData.get('medidas') || 'Não informado'],
            ['Descrição do projeto', formData.get('descricao')],
            ['Foto do local', photoName],
        ];

        const message = [
            'Olá, gostaria de solicitar um orçamento.',
            '',
            ...fields.map(([label, value]) => `${label}: ${value}`),
        ].join('\n');

        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    });
}
