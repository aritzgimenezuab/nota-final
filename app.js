class AppManager {
    canviarPestanya(modul) {
        const btnM = document.getElementById('btn-pestanya-mitjana');
        const btnE = document.getElementById('btn-pestanya-examen');
        const panelM = document.getElementById('modul-mitjana');
        const panelE = document.getElementById('modul-examen');
        document.getElementById('resultat-box').classList.add('hidden');

        if (modul === 'mitjana') {
            btnM.className = "flex-1 py-2 rounded-xl text-xs font-medium transition bg-white text-slate-800 shadow-xs";
            btnE.className = "flex-1 py-2 rounded-xl text-xs font-medium transition text-slate-500 hover:text-slate-800";
            panelM.classList.remove('hidden'); panelE.classList.add('hidden');
        } else {
            btnE.className = "flex-1 py-2 rounded-xl text-xs font-medium transition bg-white text-slate-800 shadow-xs";
            btnM.className = "flex-1 py-2 rounded-xl text-xs font-medium transition text-slate-500 hover:text-slate-800";
            panelE.classList.remove('hidden'); panelM.classList.add('hidden');
        }
    }
}
const appManager = new AppManager();

window.onload = () => {
    themeManager.aplicarEsteticaSerena();
    storageManager.carregarEstatInicial();
    authManager.verificarEstat();
};
