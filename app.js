const appManager = {
    canviarPestanya: function(pestanya) {
        document.getElementById('modul-mitjana').classList.add('hidden');
        document.getElementById('modul-test').classList.add('hidden');
        document.getElementById('resultat-box').classList.add('hidden');

        const btnMitjana = document.getElementById('btn-pestanya-mitjana');
        const btnTest = document.getElementById('btn-pestanya-test');

        if(btnMitjana) {
            btnMitjana.classList.remove('bg-white', 'text-slate-800', 'shadow-sm');
            btnMitjana.classList.add('text-slate-500', 'hover:text-slate-800');
        }
        if(btnTest) {
            btnTest.classList.remove('bg-white', 'text-slate-800', 'shadow-sm');
            btnTest.classList.add('text-slate-500', 'hover:text-slate-800');
        }

        if (pestanya === 'mitjana') {
            document.getElementById('modul-mitjana').classList.remove('hidden');
            if(btnMitjana) {
                btnMitjana.classList.remove('text-slate-500', 'hover:text-slate-800');
                btnMitjana.classList.add('bg-white', 'text-slate-800', 'shadow-sm');
            }
        } else if (pestanya === 'test') {
            document.getElementById('modul-test').classList.remove('hidden');
            if(btnTest) {
                btnTest.classList.remove('text-slate-500', 'hover:text-slate-800');
                btnTest.classList.add('bg-white', 'text-slate-800', 'shadow-sm');
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    appManager.canviarPestanya('mitjana');
});
