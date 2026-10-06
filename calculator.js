    afegirFila(nom = "", nota = "", pes = "") {
        const container = document.getElementById('files-container');
        const idUnic = Date.now() + Math.random();
        const placeholderText = languageManager.t('placeholderNom');

        const rowDiv = document.createElement('div');
        rowDiv.className = "flex items-center gap-2 bg-slate-50/80 border border-slate-200/80 p-2.5 rounded-2xl transition hover:border-slate-300";
        rowDiv.id = `fila-${idUnic}`;

        rowDiv.innerHTML = `
            <div class="flex-grow">
                <input type="text" placeholder="${placeholderText}" value="${nom}" class="fila-nom w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-teal-500">
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
