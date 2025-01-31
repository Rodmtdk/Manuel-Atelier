// Script principal pour le site Manuel d'Atelier

// Fonction pour ouvrir le calculateur d'usinage
function openCalculateur() {
    const width = Math.min(screen.width, 600);
    const height = Math.min(screen.height, 600);
    const calcWindow = window.open('', '_blank', `width=${width},height=${height}`);

    if (!calcWindow || calcWindow.closed) {
        alert("Erreur : La fenêtre du calculateur ne s'est pas ouverte. Vérifiez vos paramètres de navigateur.");
        return;
    }

    calcWindow.document.write(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Calculateur d'Usinage</title>
            <link rel="stylesheet" href="calc-styles.css">
        </head>
        <body>
            <h1>Calculateur d'Usinage</h1>
            <form id="calcForm">
                <!-- Inputs du calculateur -->
            </form>
            <div id="result" class="result" style="display: none;"></div>
            <script src="calc.js"></script>
        </body>
        </html>
    `);

    calcWindow.document.close();
}

// Défilement fluide vers une section
function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Animation lors du défilement
function animateSections() {
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    animateSections();
});
