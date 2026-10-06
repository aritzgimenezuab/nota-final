class AuthManager {
    obrirModal() { document.getElementById('auth-modal').classList.remove('hidden'); }
    tancarModal() { document.getElementById('auth-modal').classList.add('hidden'); }

    guardarUsuari() {
        const email = document.getElementById('auth-email-input').value;
        if (email && email.includes('@')) {
            localStorage.setItem('finalmark_user_email', email);
            this.tancarModal();
            this.verificarEstat();
        } else {
            alert("Si us plau, introdueix un correu electrònic vàlid.");
        }
    }

    verificarEstat() {
        const email = localStorage.getItem('finalmark_user_email');
        const container = document.getElementById('auth-header-container');
        if (email) {
            container.innerHTML = `
                <div class="flex items-center space-x-2">
                    <span class="text-xs bg-slate-100 text-teal-800 px-3 py-1.5 rounded-xl font-mono border border-slate-200">${email}</span>
                    <button onclick="authManager.tancarSessio()" class="text-xs text-slate-400 hover:text-slate-600">Sortir</button>
                </div>
            `;
        }
    }

    tancarSessio() {
        localStorage.removeItem('finalmark_user_email');
        location.reload();
    }
}
const authManager = new AuthManager();
