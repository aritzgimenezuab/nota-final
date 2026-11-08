const languageManager = {
    canviarIdioma: function(idioma) {
        // Evitem que la web peti si l'arxiu de traduccions no està carregat
        if (typeof translations === 'undefined' || !translations[idioma]) return;
        
        const diccionari = translations[idioma];
        
        for (const [id, text] of Object.entries(diccionari)) {
            const element = document.getElementById(id);
            if (element) {
                element.innerText = text;
            }
        }
        localStorage.setItem('FinalMark_Idioma', idioma);
    },
    
    iniciar: function() {
        const idiomaGuardat = localStorage.getItem('FinalMark_Idioma') || 'ca';
        const selector = document.getElementById('language-selector');
        
        if (selector) {
            selector.value = idiomaGuardat;
        }
        this.canviarIdioma(idiomaGuardat);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    languageManager.iniciar();
});
