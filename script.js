// Script principal pour le site Manuel d'Atelier

// Fonction pour ouvrir le calculateur d'usinage
function openCalculateur() {
    const calcWindow = window.open('', '_blank', 'width=600,height=600');

    if (!calcWindow) {
        alert('Impossible d\'ouvrir une nouvelle fenêtre. Veuillez vérifier les paramètres de votre navigateur.');
        return;
    }

    calcWindow.document.write(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Calculateur d'Usinage</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    padding: 0;
                    background: #f4f4f4;
                    color: #333;
                    line-height: 1.6;
                }
                h1 {
                    text-align: center;
                    color: #1A8F3E;
                }
                form {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    max-width: 400px;
                    margin: 20px auto;
                }
                input[type="number"] {
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    font-size: 1em;
                }
                button {
                    padding: 10px;
                    background-color: #1A8F3E;
                    color: #fff;
                    border: none;
                    border-radius: 5px;
                    font-size: 1em;
                    cursor: pointer;
                }
                button:hover {
                    background-color: #23A455;
                }
                .result {
                    margin-top: 20px;
                    padding: 10px;
                    background: #e8f5e9;
                    border: 1px solid #1A8F3E;
                    border-radius: 5px;
                }
            </style>
        </head>
        <body>
            <h1>Calculateur d'Usinage</h1>
            <form id="calcForm">
                <label>Vitesse de coupe (Vc en m/min) :<input type="number" id="vc" required></label>
                <label>Diamètre de l'outil ou de la pièce (D en mm) :<input type="number" id="d" required></label>
                <label>Avance par dent (fz en mm/dent) :<input type="number" id="fz" required></label>
                <label>Nombre de dents de l'outil :<input type="number" id="z" required></label>
                <label>Profondeur de passe (ap en mm) :<input type="number" id="ap" required></label>
                <label>Largeur de passe (ae en mm) :<input type="number" id="ae" required></label>
                <button type="button" id="calculateBtn">Calculer</button>
            </form>
            <div id="result" class="result" style="display: none;"></div>

            <script>
                // Calcul de la vitesse de rotation (N) et de l'avance (Vf)
                function calculateUsinage(vc, d, fz, z, ap, ae) {
                    const n = (vc * 1000) / (Math.PI * d); // Vitesse de rotation (tr/min)
                    const vf = n * fz * z; // Avance par minute (mm/min)
                    return { n, vf, ap, ae };
                }

                document.addEventListener('DOMContentLoaded', () => {
                    document.getElementById('calculateBtn').addEventListener('click', () => {
                        const vc = parseFloat(document.getElementById('vc').value);
                        const d = parseFloat(document.getElementById('d').value);
                        const fz = parseFloat(document.getElementById('fz').value);
                        const z = parseFloat(document.getElementById('z').value);
                        const ap = parseFloat(document.getElementById('ap').value);
                        const ae = parseFloat(document.getElementById('ae').value);

                        if (isNaN(vc) || isNaN(d) || isNaN(fz) || isNaN(z) || isNaN(ap) || isNaN(ae)) {
                            alert('Veuillez remplir tous les champs avec des valeurs valides.');
                            return;
                        }

                        const { n, vf } = calculateUsinage(vc, d, fz, z, ap, ae);
                        const resultDiv = document.getElementById('result');
                        resultDiv.style.display = 'block';
                        resultDiv.innerHTML = `
                            <h3>Résultats :</h3>
                            <p>- Vitesse de rotation (N) : ${n.toFixed(2)} tr/min</p>
                            <p>- Avance par minute (Vf) : ${vf.toFixed(2)} mm/min</p>
                            <p>- Profondeur de passe (ap) : ${ap} mm</p>
                            <p>- Largeur de passe (ae) : ${ae} mm</p>
                        `;
                    });
                });
            </script>
        </body>
        </html>
    `);

    calcWindow.document.close(); // Finalisation du contenu
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
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
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
