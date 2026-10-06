class CalculatorManager {
    afegirFila(nom = "", nota = "", pes = "") {
        const container = document.getElementById('files-container');
        const idUnic = Date.now() + Math.random();

        const rowDiv = document.createElement('div');
        rowDiv.className = "flex items-center gap-2 bg-slate-50/80 border border-slate-200/80 p-2.5 rounded-2xl transition hover:border-slate-300";
        rowDiv.id = `fila-${idUnic}`;

        rowDiv.innerHTML = `
            <div class="flex-grow">
                <input type="text" placeholder="Concepte (Ex: Teoria / Pràctica)" value="${nom}" class="fila-nom w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-teal-500">
            </div>
            <div class="w-20 md:w-24">
                <input type="number" step="0.01" min="0" max="10" placeholder="Nota /10" value="${nota}" class="fila-nota w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-teal-500 text-center font-mono">
            </div>
            <div class="w-20 md:w-24">
                <input type="number" step="0.01" min="0" max="100" placeholder="Pes %" value="${pes}" class="fila-pes w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-teal-500 text-center font-mono">
            </div>
            <button onclick="calculatorManager.eliminarFila('${idUnic}')" class="text-slate-400 hover:text-rose-500 p-2 transition font-bold text-sm" title="Eliminar">&times;</button>
        `;
        container.appendChild(rowDiv);
    }

    eliminarFila(id) {
        const fila = document.getElementById(`fila-${id}`);
        if (fila) {
            fila.style.opacity = '0';
            setTimeout(() => fila.remove(), 150);
        }
    }

    netejarFiles() {
        document.getElementById('files-container').innerHTML = '';
    }

    calcularMitjana() {
        const notes = document.querySelectorAll('.fila-nota');
        const pesos = document.querySelectorAll('.fila-pes');
        let sumaPonderada = 0, sumaPesos = 0;

        for (let i = 0; i < notes.length; i++) {
            const notaVal = parseFloat(notes[i].value);
            const pesVal = parseFloat(pesos[i].value);
            if (isNaN(notaVal) || isNaN(pesVal)) continue;
            sumaPonderada += notaVal * (pesVal / 100);
            sumaPesos += pesVal;
        }

        const box = document.getElementById('resultat-box');
        const titol = document.getElementById('resultat-titol');
        const text = document.getElementById('resultat-text');
        const sub = document.getElementById('resultat-subtext');
        box.classList.remove('hidden');

        if (sumaPesos === 0) {
            titol.innerText = "Avís"; text.innerText = "Incomplet"; sub.innerText = "Introdueix dades vàlides."; return;
        }

        let notaFinal = sumaPesos !== 100 ? sumaPonderada / (sumaPesos / 100) : sumaPonderada;
        titol.innerText = "Mitjana Ponderada Final";
        text.innerText = notaFinal.toFixed(2) + " / 10";
        sub.innerText = `Suma de pesos analitzats: ${sumaPesos}%. Càlcul realitzat amb claredat.`;
    }

    calcularNotaInversa() {
        const acum = parseFloat(document.getElementById('inv-acumulada').value);
        const pesF = parseFloat(document.getElementById('inv-pes').value);
        const obj = parseFloat(document.getElementById('inv-objectiu').value);

        const box = document.getElementById('resultat-box');
        const titol = document.getElementById('resultat-titol');
        const text = document.getElementById('resultat-text');
        const sub = document.getElementById('resultat-subtext');
        box.classList.remove('hidden');

        if (isNaN(acum) || isNaN(pesF) || isNaN(obj)) {
            titol.innerText = "Avís"; text.innerText = "Camps buits"; sub.innerText = "Omple tots els valors."; return;
        }

        const pF = pesF / 100;
        const nec = (obj - (acum * (1 - pF))) / pF;
        titol.innerText = "Nota Requerida Examen Final";

        if (nec <= 0) {
            text.innerText = "0.00 / 10"; sub.innerText = "Objectiu ja assolit anteriorment.";
        } else if (nec > 10) {
            text.innerText = nec.toFixed(2) + " / 10"; sub.innerText = "Matemàticament superior a 10.";
        } else {
            text.innerText = nec.toFixed(2) + " / 10"; sub.innerText = `Necessites un ${nec.toFixed(2)} a l'examen final.`;
        }
    }
}
const calculatorManager = new CalculatorManager();
