// Calculateur d'Usinage

document.addEventListener('DOMContentLoaded', () => {
    const calcForm = document.getElementById('calcForm');
    if (calcForm) {
        document.getElementById('calculateBtn').addEventListener('click', () => {
            const vc = parseFloat(document.getElementById('vc').value);
            const d = parseFloat(document.getElementById('d').value);
            const fz = parseFloat(document.getElementById('fz').value);
            const z = parseFloat(document.getElementById('z').value);
            const ap = parseFloat(document.getElementById('ap').value);
            const ae = parseFloat(document.getElementById('ae').value);

            // Validation des champs
            if (isNaN(vc) || isNaN(d) || isNaN(fz) || isNaN(z) || isNaN(ap) || isNaN(ae)) {
                alert('Veuillez remplir tous les champs avec des valeurs valides.');
                return;
            }

            // Calculs
            const n = (vc * 1000) / (Math.PI * d); // Vitesse de rotation (tr/min)
            const vf = n * fz * z; // Avance par minute (mm/min)

            // Affichage des résultats
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
    }
});
