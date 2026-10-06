class LanguageManager {
    constructor() {
        this.idiomaActual = localStorage.getItem('finalmark_lang') || 'ca';
    }

    inicialitzar() {
        const selector = document.getElementById('language-selector');
        if (selector) {
            selector.value = this.idiomaActual;
        }
        this.aplicarTraduccions();
    }

    canviarIdioma(nouIdioma) {
        this.idiomaActual = nouIdioma;
        localStorage.setItem('finalmark_lang', nouIdioma);
        this.aplicarTraduccions();
    }

    t(clau) {
        return dictionary[this.idiomaActual][clau] || dictionary['ca'][clau] || clau;
    }

    aplicarTraduccions() {
        const t = (clau) => this.t(clau);

        // Index.html elements
        if(document.getElementById('text-tag')) document.getElementById('text-tag').innerText = t('tag');
        if(document.getElementById('text-title')) document.getElementById('text-title').innerHTML = t('title');
        if(document.getElementById('text-subtitle')) document.getElementById('text-subtitle').innerText = t('subtitle');
        if(document.getElementById('btn-pestanya-mitjana')) document.getElementById('btn-pestanya-mitjana').innerText = t('tabMitjana');
        if(document.getElementById('btn-pestanya-examen')) document.getElementById('btn-pestanya-examen').innerText = t('tabExamen');
        if(document.getElementById('text-desglossament')) document.getElementById('text-desglossament').innerText = t('desglossament');
        if(document.getElementById('text-desar')) document.getElementById('text-desar').innerText = t('desarEstat');
        if(document.getElementById('text-afegir')) document.getElementById('text-afegir').lastElementChild.innerText = t('afegirElement');
        if(document.getElementById('text-calcular')) document.getElementById('text-calcular').innerText = t('calcularMitjana');
        if(document.getElementById('text-obj-examen')) document.getElementById('text-obj-examen').innerText = t('objExamen');
        if(document.getElementById('text-lbl-acumulada')) document.getElementById('text-lbl-acumulada').innerText = t('notaAcumulada');
        if(document.getElementById('text-lbl-pes')) document.getElementById('text-lbl-pes').innerText = t('pesFinal');
        if(document.getElementById('text-lbl-objectiu')) document.getElementById('text-lbl-objectiu').innerText = t('notaObjectiu');
        if(document.getElementById('text-calc-requerida')) document.getElementById('text-calc-requerida').innerText = t('calcularRequerida');
        if(document.getElementById('text-footer')) document.getElementById('text-footer').innerHTML = t('footer');
        if(document.getElementById('text-privadesa')) document.getElementById('text-privadesa').innerText = t('privadesa');
        if(document.getElementById('text-compte')) document.getElementById('text-compte').innerText = t('compte');
        if(document.getElementById('text-modal-title')) document.getElementById('text-modal-title').innerText = t('modalTitol');
        if(document.getElementById('text-modal-desc')) document.getElementById('text-modal-desc').innerText = t('modalText');
        if(document.getElementById('text-lbl-email')) document.getElementById('text-lbl-email').innerText = t('correuLabel');
        if(document.getElementById('text-btn-sync')) document.getElementById('text-btn-sync').innerText = t('sincronitzar');

        // Privadesa.html elements
        if(document.getElementById('text-tornar')) document.getElementById('text-tornar').innerText = t('tornarInici');
        if(document.getElementById('priv-title')) document.getElementById('priv-title').innerText = t('privTitle');
        if(document.getElementById('priv-date')) document.getElementById('priv-date').innerText = t('privDate');
        if(document.getElementById('priv-s1-title')) document.getElementById('priv-s1-title').innerText = t('privS1Title');
        if(document.getElementById('priv-s1-text')) document.getElementById('priv-s1-text').innerText = t('privS1Text');
        if(document.getElementById('priv-s2-title')) document.getElementById('priv-s2-title').innerText = t('privS2Title');
        if(document.getElementById('priv-s2-text')) document.getElementById('priv-s2-text').innerText = t('privS2Text');
        if(document.getElementById('priv-s3-title')) document.getElementById('priv-s3-title').innerText = t('privS3Title');
        if(document.getElementById('priv-s3-text1')) document.getElementById('priv-s3-text1').innerText = t('privS3Text1');
        if(document.getElementById('priv-s3-text2')) document.getElementById('priv-s3-text2').innerText = t('privS3Text2');
        if(document.getElementById('priv-s4-title')) document.getElementById('priv-s4-title').innerText = t('privS4Title');
        if(document.getElementById('priv-s4-text')) document.getElementById('priv-s4-text').innerText = t('privS4Text');

        // Actualitzar placeholders
        document.querySelectorAll('.fila-nom').forEach(input => {
            input.placeholder = t('placeholderNom');
        });
    }
}

const languageManager = new LanguageManager();
