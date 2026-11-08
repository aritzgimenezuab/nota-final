const authManager = {
    obrirModal: function() {
        const modal = document.getElementById('auth-modal');
        if (modal) modal.classList.remove('hidden');
    },
    tancarModal: function() {
        const modal = document.getElementById('auth-modal');
        if (modal) modal.classList.add('hidden');
    },
    guardarUsuari: function() {
        const emailInput = document.getElementById('auth-email-input');
        
        if (emailInput && emailInput.value.includes('@')) {
            // Guardem l'usuari de forma local
            localStorage.setItem('FinalMark_Usuari', emailInput.value);
            
            // Efecte visual prèmium per al botó
            const btn = document.querySelector('#auth-modal button.bg-teal-700');
            const textOriginal = btn.innerText;
            btn.innerText = "Vinculat correctament! ✔️";
            btn.classList.replace('bg-teal-700', 'bg-green-600');
            
            // Tanquem el modal després d'un segon i mig
            setTimeout(() => {
                this.tancarModal();
                btn.innerText = textOriginal;
                btn.classList.replace('bg-green-600', 'bg-teal-700');
            }, 1500);
        } else {
            alert('Si us plau, introdueix un correu universitari o personal vàlid.');
        }
    }
};
