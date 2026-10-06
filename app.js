// Inicialitzar amb 3 files per defecte (Examen, Treball, Pràctica)
window.onload = () => {
    afegirFila("Examen Parcial", 7.5, 40);
    afegirFila("Treball en Grup", 9.0, 30);
    afegirFila("Pràctiques d'Aula", 8.0, 30);
};

function afegirFila(nomPredef = "", notaPredef = "", pesPredef = "") {
    const container = document.getElementById('files-container');
    const idUnic = Date.now() + Math.random();

    const rowDiv = document.createElement('div');
    rowDiv.className = "flex items-center gap-2 bg-slate-950/60 border border-slate-800/80 p-3 rounded-2xl transition hover:border-slate-700";
    rowDiv.id = `fila-${idUnic}`;

    rowDiv.innerHTML = `
        <div class="flex-grow">
            <input type="text" placeholder="Nom (Ex: Parcial 1 / Actitud)" value="${nomPredef}" class="fila-nom w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500">
        </div>
        <div class="w-20 md:w-24">
            <input type="number" step="0.01" min="0" max="10" placeholder="Nota /10" value="${notaPredef}" class="fila-nota w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500 text-center font-mono">
        </div>
        <div class="w-20 md:w-24">
            <input type="number" step="0.01" min="0" max="100" placeholder="Pes %" value="${pesPredef}" class="fila-pes w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500 text-center font-mono">
        </div>
        <button onclick="eliminarFila('${idUnic}')" class="text-slate-500 hover:text-rose-400 p-2 transition font-bold text-sm" title="Eliminar fila">
            &times;
        </button>
    `;

    container.appendChild(rowDiv);
}

function eliminarFila(id) {
    const fila = document.getElementById(`fila-${id}`);
    if (fila) {
        fila.style.opacity = '0';
        setTimeout(() => fila.remove(), 150);
    }
}

function calcularMitjanaDinamica() {
    const notas = document.querySelectorAll('.fila-nota');
    const pesos = document.querySelectorAll('.fila-pes');

    let sumaPonderada = 0;
    let sumaPesos = 0;

    for (let i = 0; i < notas.length; i++) {
        const notaVal = parseFloat(notas[i].value);
        const pesVal = parseFloat(pesos[i].value);

        if (isNaN(notaVal) || isNaN(pesVal)) {
            continue;
        }

        sumaPonderada += notaVal * (pesVal / 100);
        sumaPesos += pesVal;
    }

    const resultatBox = document.getElementById('resultat-box');
    const resultatText = document.getElementById('resultat-text');
    const resultatSubtext = document.getElementById('resultat-subtext');

    resultatBox.classList.remove('hidden');

    if (sumaPesos === 0) {
        resultatText.innerText = "Error";
        resultatSubtext.innerText = "Si us plau, introdueix almenys una nota i un pes vàlid.";
        return;
    }

    let notaFinalCalculada = sumaPonderada;
    if (sumaPesos !== 100) {
        notaFinalCalculada = sumaPonderada / (sumaPesos / 100);
    }

    resultatText.innerText = notaFinalCalculada.toFixed(2) + " / 10";
    resultatSubtext.innerText = `Suma total dels pesos analitzats: ${sumaPesos}%. ${sumaPesos !== 100 ? '(Calculat proporcionalment al 100%)' : ''}`;
}
