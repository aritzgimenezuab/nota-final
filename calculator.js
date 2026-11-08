const calculatorManager = {
    // 1. Funcions de Mitjana Ponderada
    afegirFila: function() {
        const container = document.getElementById('files-container');
        const filaId = Date.now();
        const filaHTML = `
            <div class="flex gap-2 items-center fila-nota" id="fila-${filaId}">
                <input type="text" placeholder="Nom (ex: Pràctica 1)" class="flex-2 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm w-full">
                <input type="number" placeholder="Nota" step="0.1" class="nota-input flex-1 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm w-full">
                <input type="number" placeholder="Pes %" step="1" class="pes-input flex-1 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm w-full">
                <button onclick="this.parentElement.remove()" class="text-red-400 hover:text-red-600 font-bold p-2 text-lg">✕</button>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', filaHTML);
    },

    calcularMitjana: function() {
        const files = document.querySelectorAll('.fila-nota');
        let sumaPonderada = 0;
        let sumaPesos = 0;

        files.forEach(fila => {
            const nota = parseFloat(fila.querySelector('.nota-input').value) || 0;
            const pes = parseFloat(fila.querySelector('.pes-input').value) || 0;
            sumaPonderada += nota * (pes / 100);
            sumaPesos += pes;
        });

        const box = document.getElementById('resultat-box');
        const textNota = document.getElementById('resultat-text');
        const subText = document.getElementById('resultat-subtext');

        box.classList.remove('hidden');

        if (sumaPesos === 0) {
            textNota.innerText = "0.00";
            subText.innerText = "Afegeix notes i percentatges per calcular.";
            return;
        }

        if (sumaPesos !== 100) {
            subText.innerText = `Els percentatges sumen ${sumaPesos}%, no 100%. La nota es mostra proporcionalment.`;
            textNota.innerText = (sumaPonderada / (sumaPesos / 100)).toFixed(2);
        } else {
            textNota.innerText = sumaPonderada.toFixed(2);
            subText.innerText = "Aquesta és la teva nota mitjana ponderada exacta.";
        }
    },

    // 2. Funció Examen Invers
    calcularNotaInversa: function() {
        const notaAcumulada = parseFloat(document.getElementById('inv-acumulada').value) || 0;
        const pesExamen = parseFloat(document.getElementById('inv-pes').value) || 0;
        const notaObjectiu = parseFloat(document.getElementById('inv-objectiu').value) || 5;

        const box = document.getElementById('resultat-box');
        const textNota = document.getElementById('resultat-text');
        const subText = document.getElementById('resultat-subtext');
        box.classList.remove('hidden');

        if (pesExamen <= 0 || pesExamen > 100) {
            textNota.innerText = "-";
            subText.innerText = "Posa un percentatge vàlid per a l'examen.";
            return;
        }

        const pesAcumulat = 100 - pesExamen;
        const partAcumulada = notaAcumulada * (pesAcumulat / 100);
        const puntsFaltants = notaObjectiu - partAcumulada;
        const notaNecessaria = puntsFaltants / (pesExamen / 100);

        if (notaNecessaria > 10) {
            textNota.innerText = notaNecessaria.toFixed(2);
            subText.innerHTML = "Impossible. Necessites més d'un 10 a l'examen.";
        } else if (notaNecessaria <= 0) {
            textNota.innerText = "0.00";
            subText.innerHTML = "Ja tens l'objectiu superat només amb l'avaluació continuada!";
        } else {
            textNota.innerText = notaNecessaria.toFixed(2);
            subText.innerHTML = `Necessites un <strong>${notaNecessaria.toFixed(2)}</strong> a l'examen per arribar al ${notaObjectiu}.`;
        }
    },

    // 3. NOVA Funció Tipus Test
    calcularTest: function() {
        const totalPreguntes = parseFloat(document.getElementById('test-total').value) || 0;
        const notaMaxima = parseFloat(document.getElementById('test-maxima').value) || 10;
        const penalitzacioRatio = parseFloat(document.getElementById('test-penalitzacio').value) || 0;
        
        const encerts = parseFloat(document.getElementById('test-encerts').value) || 0;
        const errors = parseFloat(document.getElementById('test-errors').value) || 0;
        const blancs = parseFloat(document.getElementById('test-blancs').value) || 0;

        const box = document.getElementById('resultat-box');
        const textNota = document.getElementById('resultat-text');
        const subText = document.getElementById('resultat-subtext');
        box.classList.remove('hidden');

        if (totalPreguntes <= 0) {
            textNota.innerText = "-";
            subText.innerText = "El test ha de tenir preguntes.";
            return;
        }

        if ((encerts + errors + blancs) > totalPreguntes) {
            textNota.innerText = "Error";
            subText.innerText = "Tens més encerts, fallades i blancs que preguntes totals!";
            return;
        }

        const valorPregunta = notaMaxima / totalPreguntes;
        const valorError = valorPregunta * penalitzacioRatio;
        
        const puntsEncerts = encerts * valorPregunta;
        const puntsPenalitzacio = errors * valorError;
        let notaFinal = puntsEncerts - puntsPenalitzacio;
        
        if (notaFinal < 0) notaFinal = 0; // Evitar notes negatives

        textNota.innerText = notaFinal.toFixed(2);
        subText.innerHTML = `
            Cada encert et suma <strong>+${valorPregunta.toFixed(3)}</strong> punts.<br>
            Cada error et resta <strong>-${valorError.toFixed(3)}</strong> punts.<br>
            Base: ${puntsEncerts.toFixed(2)} punts | Penalització: -${puntsPenalitzacio.toFixed(2)} punts.
        `;
    }
};
