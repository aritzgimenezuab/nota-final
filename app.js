const appManager = {
    canviarPestanya: function(pestanya) {
        // 1. Amaguem tots els mòduls i el resultat
        document.getElementById('modul-mitjana').classList.add('hidden');
        document.getElementById('modul-test').classList.add('hidden');
        document.getElementById('resultat-box').classList.add('hidden');

        // 2. Apaguem els dos botons
        const botons = ['btn-pestanya-mitjana', 'btn-pestanya-test'];
        botons.forEach(id => {
            const btn = document.getElementById(id);
            if(btn) {
                btn.classList.remove('bg-white', 'text-slate-800', 'shadow-sm');
                btn.classList.add('text-slate-500', 'hover:text-slate-800');
            }
        });

        // 3. Encenguem la pestanya seleccionada
        if (pestanya === 'mitjana') {
            document.getElementById('modul-mitjana').classList.remove('hidden');
            const btn = document.getElementById('btn-pestanya-mitjana');
            btn.classList.remove('text-slate-500', 'hover:text-slate-800');
            btn.classList.add('bg-white', 'text-slate-800', 'shadow-sm');
        } else if (pestanya === 'test') {
            document.getElementById('modul-test').classList.remove('hidden');
            const btn = document.getElementById('btn-pestanya-test');
            btn.classList.remove('text-slate-500', 'hover:text-slate-800');
            btn.classList.add('bg-white', 'text-slate-800', 'shadow-sm');
        }
    }
};

// Quan la pàgina carrega, s'obre 'Mitjana' per defecte
document.addEventListener('DOMContentLoaded', () => {
    appManager.canviarPestanya('mitjana');
});
