const calculatorManager = {
    afegirFila: function() {
        const container = document.getElementById('files-container');
        const filaId = Date.now();
        const filaHTML = `
            <div class="flex flex-col sm:flex-row gap-2 items-center fila-nota w-full" id="fila-${filaId}">
                <input type="text" placeholder="Nom (ex: Pràctica 1)" class="w-full sm:w-[50%] bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm">
                <input type="number" placeholder="Nota" step="0.1" class="nota-input w-full sm:w-[20%] bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-center">
                <input type="number" placeholder="Pes %" step="1" class="pes-input w-full sm:w-[20%] bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-center">
                <button onclick="this.parentElement.remove()" class="w-full sm:w-[10%] text-red-400 hover:text-red-600 font-bold p-2 text-xl flex justify-center items-center">✕</button>
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

        const idiomaActiu = localStorage.getItem('FinalMark_Idioma') || 'ca';
        const dicc = translations[idiomaActiu] || translations['ca'];

        if (sumaPesos === 0) {
            textNota.innerText = "0.00";
            subText.innerText = dicc["msg-sense-notes"];
            return;
        }

        if (sumaPesos !== 100) {
            textNota.innerText = (sumaPonderada / (sumaPesos / 100)).toFixed(2);
            subText.innerText = dicc["msg-mitjana-proporcional"];
        } else {
            textNota.innerText = sumaPonderada.toFixed(2);
            subText.innerText = dicc["msg-mitjana-exacta"];
        }
    },

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

        const idiomaActiu = localStorage.getItem('FinalMark_Idioma') || 'ca';
        const dicc = translations[idiomaActiu] || translations['ca'];

        if (totalPreguntes <= 0) {
            textNota.innerText = "-";
            subText.innerText = dicc["msg-test-error-preguntes"];
            return;
        }
        if ((encerts + errors + blancs) > totalPreguntes) {
            textNota.innerText = "Error";
            subText.innerText = dicc["msg-test-error-massa"];
            return;
        }

        const valorPregunta = notaMaxima / totalPreguntes;
        const valorError = valorPregunta * penalitzacioRatio;
        
        const puntsEncerts = encerts * valorPregunta;
        const puntsPenalitzacio = errors * valorError;
        let notaFinal = puntsEncerts - puntsPenalitzacio;
        if (notaFinal < 0) notaFinal = 0;

        textNota.innerText = notaFinal.toFixed(2);
        
        // Plantilla traduïda dinàmicament
        let plantilla = dicc["msg-test-detall"] || "Cada pregunta encertada suma +{valEncert}.<br>Cada error resta -{valError}.";
        plantilla = plantilla.replace("{valEncert}", valorPregunta.toFixed(3)).replace("{valError}", valorError.toFixed(3));
        
        subText.innerHTML = plantilla;
    },

    compartirNotaWhatsApp: async function() {
        const btnCompartir = document.getElementById('btn-compartir');
        const textOriginal = btnCompartir.innerHTML;
        btnCompartir.innerHTML = "Obrint WhatsApp... ⏳";
        
        try {
            const zonaCaptura = document.getElementById('zona-captura');
            const canvas = await html2canvas(zonaCaptura, { scale: 2 });
            
            canvas.toBlob(async (blob) => {
                const fitxer = new File([blob], "Nota-FinalMark.png", { type: "image/png" });
                
                if (navigator.canShare && navigator.canShare({ files: [fitxer] })) {
                    await navigator.share({
                        title: 'Nota FinalMark',
                        files: [fitxer]
                    });
                    btnCompartir.innerHTML = textOriginal;
                } else {
                    const nota = document.getElementById('resultat-text').innerText;
                    const msg = `He tret un ${nota}! Calculat amb FinalMark.app`;
                    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
                    btnCompartir.innerHTML = textOriginal;
                }
            });
        } catch (error) {
            const nota = document.getElementById('resultat-text').innerText;
            const msg = `He tret un ${nota}! Calculat amb FinalMark.app`;
            window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
            btnCompartir.innerHTML = textOriginal;
        }
    }
};
