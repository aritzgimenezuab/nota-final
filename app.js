function canviarMode(mode) {
    const tabMinim = document.getElementById('tab-minim');
    const tabMitjana = document.getElementById('tab-mitjana');
    const panelMinim = document.getElementById('panel-minim');
    const panelMitjana = document.getElementById('panel-mitjana');
    const resultatBox = document.getElementById('resultat-box');

    resultatBox.classList.add('hidden');

    if (mode === 'minim') {
        tabMinim.className = "flex-1 py-2.5 rounded-xl text-xs font-bold transition bg-blue-600 text-white shadow-lg";
        tabMitjana.className = "flex-1 py-2.5 rounded-xl text-xs font-bold transition text-slate-400 hover:text-white";
        panelMinim.classList.remove('hidden');
        panelMitjana.classList.add('hidden');
    } else {
        tabMitjana.className = "flex-1 py-2.5 rounded-xl text-xs font-bold transition bg-indigo-600 text-white shadow-lg";
        tabMinim.className = "flex-1 py-2.5 rounded-xl text-xs font-bold transition text-slate-400 hover:text-white";
        panelMitjana.classList.remove('hidden');
        panelMinim.classList.add('hidden');
    }
}

function calcularNotaMinima() {
    const notaAcumulada = parseFloat(document.getElementById('nota-acumulada').value);
    const pesFinal = parseFloat(document.getElementById('pes-final').value);
    const notaObjectiu = parseFloat(document.getElementById('nota-objectiu').value);

    if (isNaN(notaAcumulada) || isNaN(pesFinal) || isNaN(notaObjectiu)) {
        alert("Si us plau, omple tots els camps correctament.");
        return;
    }

    const percentatgeFinal = pesFinal / 100;
    const percentatgeAcumulat = 1 - percentatgeFinal;

    // Fórmula: Objectiu = (Acumulat * %Acumulat) + (NotaFinal * %Final)
    // NotaFinal = (Objectiu - (Acumulat * %Acumulat)) / %Final
    const puntsAcumulats = notaAcumulada * percentatgeAcumulat;
    const notaNecessaria = (notaObjectiu - puntsAcumulats) / percentatgeFinal;

    const resultatBox = document.getElementById('resultat-box');
    const resultatText = document.getElementById('resultat-text');
    const resultatSubtext = document.getElementById('resultat-subtext');

    resultatBox.classList.remove('hidden');

    if (notaNecessaria <= 0) {
        resultatText.innerText = "0.00 / 10";
        resultatSubtext.innerText = "¡Enhorabona! Ja has superat l'assignatura abans de l'examen final.";
    } else if (notaNecessaria > 10) {
        resultatText.innerText = notaNecessaria.toFixed(2) + " / 10";
        resultatSubtext.innerText = "⚠️️ Matemàticament impossible d'arribar a aquesta nota (necessitaries més d'un 10).";
    } else {
        resultatText.innerText = notaNecessaria.toFixed(2) + " / 10";
        resultatSubtext.innerText = `Necessites treure un ${notaNecessaria.toFixed(2)} a l'examen final per aconseguir el teu objectiu.`;
    }
}

function calcularMitjanaPonderada() {
    const nota1 = parseFloat(document.getElementById('m-nota1').value) || 0;
    const pes1 = parseFloat(document.getElementById('m-pes1').value) || 0;
    
    const nota2 = parseFloat(document.getElementById('m-nota2').value) || 0;
    const pes2 = parseFloat(document.getElementById('m-pes2').value) || 0;
    
    const nota3 = parseFloat(document.getElementById('m-nota3').value) || 0;
    const pes3 = parseFloat(document.getElementById('m-pes3').value) || 0;

    const sumaPesos = pes1 + pes2 + pes3;

    if (sumaPesos <= 0) {
        alert("Introdueix almenys una nota amb el seu pes corresponent.");
        return;
    }

    const mitjana = ((nota1 * pes1) + (nota2 * pes2) + (nota3 * pes3)) / sumaPesos;

    const resultatBox = document.getElementById('resultat-box');
    const resultatText = document.getElementById('resultat-text');
    const resultatSubtext = document.getElementById('resultat-subtext');

    resultatBox.classList.remove('hidden');
    resultatText.innerText = mitjana.toFixed(2) + " / 10";
    resultatSubtext.innerText = `Mitjana calculada sobre un total del ${sumaPesos}% dels pesos introduïts.`;
}
