const storageManager = {
    guardarEstatActual: function() {
        const files = document.querySelectorAll('.fila-nota');
        let dadesAssignatura = [];
        
        files.forEach(fila => {
            const nom = fila.querySelector('input[type="text"]').value;
            const nota = fila.querySelector('.nota-input').value;
            const pes = fila.querySelector('.pes-input').value;
            
            // Guardem només si hi ha alguna dada
            if (nom || nota || pes) {
                dadesAssignatura.push({ nom, nota, pes });
            }
        });

        // Guardem al navegador
        localStorage.setItem('FinalMark_Assignatura', JSON.stringify(dadesAssignatura));
        
        // Animem el botó perquè l'usuari sàpiga que s'ha guardat
        const btn = document.getElementById('text-desar');
        const textOriginal = btn.innerHTML;
        btn.innerHTML = "Desat! ✔️";
        btn.classList.add('text-green-600', 'bg-green-50');
        
        setTimeout(() => {
            btn.innerHTML = textOriginal;
            btn.classList.remove('text-green-600', 'bg-green-50');
        }, 1500);
    },

    carregarEstatActual: function() {
        const dadesGuardades = localStorage.getItem('FinalMark_Assignatura');
        
        if (dadesGuardades) {
            const dadesAssignatura = JSON.parse(dadesGuardades);
            const container = document.getElementById('files-container');
            
            // Netegem l'espai
            container.innerHTML = '';
            
            // Recreem les files guardades
            dadesAssignatura.forEach(item => {
                const filaId = Date.now() + Math.random();
                const filaHTML = `
                    <div class="flex gap-2 items-center fila-nota" id="fila-${filaId}">
                        <input type="text" value="${item.nom || ''}" placeholder="Nom (ex: Pràctica 1)" class="flex-2 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm w-full">
                        <input type="number" value="${item.nota || ''}" placeholder="Nota" step="0.1" class="nota-input flex-1 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm w-full">
                        <input type="number" value="${item.pes || ''}" placeholder="Pes %" step="1" class="pes-input flex-1 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm w-full">
                        <button onclick="this.parentElement.remove()" class="text-red-400 hover:text-red-600 font-bold p-2 text-lg">✕</button>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', filaHTML);
            });
        } else {
            // Si és el primer cop que entra, li posem una fila buida
            if (typeof calculatorManager !== 'undefined') {
                calculatorManager.afegirFila();
            }
        }
    }
};

// Quan s'obre la web, mirem si hi ha dades guardades
document.addEventListener('DOMContentLoaded', () => {
    storageManager.carregarEstatActual();
});
