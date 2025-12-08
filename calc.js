// Récupération des éléments
const f_diameter = document.getElementById("f_diameter");
const f_teeth = document.getElementById("f_teeth");
const f_vc = document.getElementById("f_vc");
const f_fz = document.getElementById("f_fz");
const f_n = document.getElementById("f_n");
const f_vf = document.getElementById("f_vf");
const f_material = document.getElementById("f_material");
const materialBadge = document.getElementById("material-badge");

// Calcul direct (Vc -> n -> Vf)
function calculateFraisage() {
  const D = parseFloat(f_diameter.value);
  const Z = parseInt(f_teeth.value);
  const Vc = parseFloat(f_vc.value);
  const fz = parseFloat(f_fz.value);

  if (!D || !Vc) return;

  const n = (1000 * Vc) / (Math.PI * D);
  f_n.value = n.toFixed(2);

  const Vf = Z * fz * n;
  f_vf.value = Vf.toFixed(2);

  updateChart(n, Vf);
}

// Calcul inverse
function calculateFraisageReverse(target) {
  const D = parseFloat(f_diameter.value);
  const Z = parseInt(f_teeth.value);
  const n = parseFloat(f_n.value);
  const vf = parseFloat(f_vf.value);

  if (target === "n" && D && n) {
    const vc = (Math.PI * D * n) / 1000;
    f_vc.value = vc.toFixed(2);
  }

  if (target === "vf" && n && Z) {
    const fz = vf / (n * Z);
    f_fz.value = fz.toFixed(4);
  }

  updateChart(n, vf);
}

// Matériau -> Vc
function updateVcFraisage() {
  const mat = f_material.options[f_material.selectedIndex];
  f_vc.value = mat.value;

  updateBadge(mat.text);
  calculateFraisage();
}

// Badge matériau
function updateBadge(text) {
  materialBadge.textContent = text;
  materialBadge.className = "badge badge-inside-cell " + (text === "HSS" ? "hss" : "carbure");
}

// Export Excel
function exportToExcel() {
  const data = [[
    "Ø", f_diameter.value,
    "Z", f_teeth.value,
    "Vc", f_vc.value,
    "fz", f_fz.value,
    "n", f_n.value,
    "Vf", f_vf.value
  ]];

  let csv = "";
  data.forEach(row => csv += row.join(";") + "\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "calcul_fraisage.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Chart.js
let chart;
function updateChart(n, vf) {
  const ctx = document.getElementById("chartFraisage").getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Vitesse n (tr/min)", "Avance Vf (mm/min)"],
      datasets: [{
        label: "Valeurs Calculées",
        data: [n || 0, vf || 0],
        backgroundColor: ["#1a8f3e", "#23a455"],
        borderRadius: 10
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => ctx.raw.toFixed(2)
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: "#fff" }
        },
        x: {
          ticks: { color: "#fff" }
        }
      }
    }
  });
}
