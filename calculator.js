const calculatorManager = {
    // ---- 1. MITJANA PONDERADA ----
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
            subText.innerText = "Afegeix notes per calcular.";
            return;
        }

        if (sumaPesos !== 100) {
            subText.innerText = `Els percentatges sumen ${sumaPesos}%, no 100%. La nota final mostrada és proporcional.`;
            textNota.innerText = (sumaPonderada / (sumaPesos / 100)).toFixed(2);
        } else {
            textNota.innerText = sumaPonderada.toFixed(2);
            subText.innerText = "Aquesta és la teva nota mitjana ponderada exacta tenint en compte els percentatges introduïts.";
        }
    },

    // ---- 2. CÀLCUL TIPUS TEST ----
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
            subText.innerText = "Error: El test ha de tenir preguntes.";
            return;
        }
        if ((encerts + errors + blancs) > totalPreguntes) {
            textNota.innerText = "Error";
            subText.innerText = "Has sumat més encerts, fallades i blancs que el total de preguntes de l'examen!";
            return;
        }

        const valorPregunta = notaMaxima / totalPreguntes;
        const valorError = valorPregunta * penalitzacioRatio;
        
        const puntsEncerts = encerts * valorPregunta;
        const puntsPenalitzacio = errors * valorError;
        let notaFinal = puntsEncerts - puntsPenalitzacio;
        
        if (notaFinal < 0) notaFinal = 0;

        textNota.innerText = notaFinal.toFixed(2);
        subText.innerHTML = `
            Cada pregunta encertada suma <strong>+${valorPregunta.toFixed(3)}</strong>.<br>
            Cada error resta <strong>-${valorError.toFixed(3)}</strong>.<br><br>
            Càlcul: Tens ${puntsEncerts.toFixed(2)} punts base i una penalització de -${puntsPenalitzacio.toFixed(2)} punts.
        `;
    },

    // ---- 3. COMPARTIR PER WHATSAPP MITJANÇANT IMATGE ----
    compartirNotaWhatsApp: async function() {
        const btnCompartir = document.getElementById('btn-compartir');
        const textOriginal = btnCompartir.innerHTML;
        
        // Avisem que s'està generant
        btnCompartir.innerHTML = "Generant imatge... ⏳";
        
        try {
            // Seleccionem només la caixa blanca neta amb els càlculs i el logo
            const zonaCaptura = document.getElementById('zona-captura');
            
            // Creem la imatge amb html2canvas
            const canvas = await html2canvas(zonaCaptura, {
                backgroundColor: "#ffffff",
                scale: 2 // Fa que la foto tingui alta resolució
            });

            // Convertim el canvas en un arxiu d'imatge
            canvas.toBlob(async (blob) => {
                const fitxer = new File([blob], "Nota-FinalMark.png", { type: "image/png" });
                
                // Mirem si el mòbil permet compartir arxius (ho fan gairebé tots els mòbils avui en dia)
                if (navigator.canShare && navigator.canShare({ files: [fitxer] })) {
                    await navigator.share({
                        title: 'La meva nota de FinalMark',
                        text: 'Mira la nota que he tret! Calculat ràpid amb FinalMark.app',
                        files: [fitxer]
                    });
                    btnCompartir.innerHTML = "Compartit! ✅";
                } else {
                    // Si el navegador és vell o s'està des de PC, descarreguem la foto
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = "Nota-FinalMark.png";
                    a.click();
                    alert("S'ha descarregat la foto de la nota als teus arxius! Ara la pots enviar per WhatsApp tranquil·lament.");
                    btnCompartir.innerHTML = textOriginal;
                }
                
                // Restaurem el botó passats 3 segons
                setTimeout(() => { btnCompartir.innerHTML = textOriginal; }, 3000);
            });

        } catch (error) {
            console.error("Error al generar imatge:", error);
            alert("No s'ha pogut generar la imatge. Revisa que tinguis connexió per carregar la llibreria.");
            btnCompartir.innerHTML = textOriginal;
        }
    }
};
