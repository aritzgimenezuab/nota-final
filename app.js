const appManager = {
    canviarPestanya: function(pestanya) {
        // Amagar tots els mòduls i el resultat
        document.getElementById('modul-mitjana').classList.add('hidden');
        document.getElementById('modul-examen').classList.add('hidden');
        document.getElementById('modul-test').classList.add('hidden');
        document.getElementById('resultat-box').classList.add('hidden');

        // Resetejar l'estil de tots els botons a inactiu
        const btnClassesInactiu = ['text-slate-500', 'hover:text-slate-800'];
        const btnClassesActiu = ['bg-white', 'text-slate-800', 'shadow-sm'];

        const botons = ['btn-pestanya-mitjana', 'btn-pestanya-examen', 'btn-pestanya-test'];
        botons.forEach(id => {
            const btn = document.getElementById(id);
            if(btn) {
                btn.classList.remove(...btnClassesActiu);
                btn.classList.add(...btnClassesInactiu);
            }
        });

        // Mostrar el mòdul que toca i pintar el seu botó
        if (pestanya === 'mitjana') {
            document.getElementById('modul-mitjana').classList.remove('hidden');
            const btn = document.getElementById('btn-pestanya-mitjana');
            btn.classList.remove(...btnClassesInactiu);
            btn.classList.add(...btnClassesActiu);
        } else if (pestanya === 'examen') {
            document.getElementById('modul-examen').classList.remove('hidden');
            const btn = document.getElementById('btn-pestanya-examen');
            btn.classList.remove(...btnClassesInactiu);
            btn.classList.add(...btnClassesActiu);
        } else if (pestanya === 'test') {
            document.getElementById('modul-test').classList.remove('hidden');
            const btn = document.getElementById('btn-pestanya-test');
            btn.classList.remove(...btnClassesInactiu);
            btn.classList.add(...btnClassesActiu);
        }
    }
};

// Quan s'obre la web, carregar la primera pestanya per defecte
document.addEventListener('DOMContentLoaded', () => {
    appManager.canviarPestanya('mitjana');
});
