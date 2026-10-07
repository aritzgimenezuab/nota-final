// Gestor de perfil i sessió local (Sense servidors externs)
class AuthManager {
    obrirModal() {
        const modal = document.getElementById('auth-modal');
        if (modal) modal.classList.remove('hidden');
    }

    tancarModal() {
        const modal = document.getElementById('auth-modal');
        if (modal) modal.classList.add('hidden');
    }

    guardarUsuari() {
        const input = document.getElementById('auth-email-input');
        if (!input) return;
        
        const email = input.value.trim();
        if (email && email.includes('@')) {
            // Guardem localment al navegador sense fer peticions externes que donin error 401
            localStorage.setItem('finalmark_user_email', email);
            this.tancarModal();
            this.verificarEstat();
            
            // Missatge de confirmació net
            alert("Sessió iniciada correctament per a: " + email);
        } else {
            alert("Si us plau, introdueix un correu electrònic vàlid.");
        }
    }

    verificarEstat() {
        const email = localStorage.getItem('finalmark_user_email');
        const container = document.getElementById('auth-header-container');

        if (email && container) {
            container.innerHTML = `
                <div class="flex items-center space-x-2">
                    <span class="text-xs bg-slate-100 text-teal-800 px-3 py-1.5 rounded-xl font-mono border border-slate-200">👤 ${email}</span>
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

window.authManager = new AuthManager();
