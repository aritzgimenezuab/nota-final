class StorageManager {
    guardarEstatActual() {
        const files = [];
        document.querySelectorAll('#files-container > div').forEach(row => {
            files.push({
                nom: row.querySelector('.fila-nom').value,
                nota: row.querySelector('.fila-nota').value,
                pes: row.querySelector('.fila-pes').value
            });
        });
        localStorage.setItem('finalmark_dades_serene', JSON.stringify(files));
        alert("Estat desat amb èxit.");
    }

    carregarEstatInicial() {
        const guardat = localStorage.getItem('finalmark_dades_serene');
        if (guardat) {
            try {
                const files = JSON.parse(guardat);
                calculatorManager.netejarFiles();
                files.forEach(f => calculatorManager.afegirFila(f.nom, f.nota, f.pes));
                return;
            } catch(e) {}
        }
        calculatorManager.afegirFila("Examen Parcial (60%)", 7.5, 40);
        calculatorManager.afegirFila("Treball en grup (40%)", 9.0, 60);
    }
}
const storageManager = new StorageManager();
