const storageManager = {
    guardarEstatActual: function() {
        const files = document.querySelectorAll('.fila-nota');
        let dadesAssignatura = [];
        
        files.forEach(fila => {
            const nom = fila.querySelector('input[type="text"]').value;
            const nota = fila.querySelector('.nota-input').value;
            const pes = fila.querySelector('.pes-input').value;
            
            if (nom || nota || pes) {
                dadesAssignatura.push({ nom, nota, pes });
            }
        });

        localStorage.setItem('FinalMark_Assignatura', JSON.stringify(dadesAssignatura));
        
        const btn = document.querySelector('button[onclick="storageManager.guardarEstatActual()"]');
        if (btn) {
            const textOriginal = btn.innerHTML;
            btn.innerHTML = "Desat! ✔️";
            btn.classList.add('text-green-600', 'bg-green-50');
            
            setTimeout(() => {
                btn.innerHTML = textOriginal;
                btn.classList.remove('text-green-600', 'bg-green-50');
            }, 1500);
        }
    },

    carregarEstatActual: function() {
        const dadesGuardades = localStorage.getItem('FinalMark_Assignatura');
        
        if (dadesGuardades) {
            const dadesAssignatura = JSON.parse(dadesGuardades);
            const container = document.getElementById('files-container');
            
            container.innerHTML = '';
            
            dadesAssignatura.forEach(item => {
                const filaId = Date.now() + Math.random();
                // APLICANT PERCENTATGES FIXOS AL CARREGAR LES DADES
                const filaHTML = `
                    <div class="flex flex-col sm:flex-row gap-2 items-center fila-nota w-full" id="fila-${filaId}">
                        <input type="text" value="${item.nom || ''}" placeholder="Nom (ex: Pràctica 1)" class="w-full sm:w-[50%] bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm">
                        <input type="number" value="${item.nota || ''}" placeholder="Nota" step="0.1" class="nota-input w-full sm:w-[20%] bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-center">
                        <input type="number" value="${item.pes || ''}" placeholder="Pes %" step="1" class="pes-input w-full sm:w-[20%] bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-center">
                        <button onclick="this.parentElement.remove()" class="w-full sm:w-[10%] text-red-400 hover:text-red-600 font-bold p-2 text-xl flex justify-center items-center">✕</button>
                    </div>
                `;
                container.insertAdjacentHTML('beforeend', filaHTML);
            });
        } else {
            if (typeof calculatorManager !== 'undefined') {
                calculatorManager.afegirFila();
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    storageManager.carregarEstatActual();
});
