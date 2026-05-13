const app = {
    // 1. Inicialização
    init() {
        this.loadChecklist();
        this.addEventListeners();
        console.log("Portal Financeiro Carregado.");
    },

    // 2. Cálculo de Juros Compostos
    calcularJuros() {
        const p = parseFloat(document.getElementById('capital').value);
        const pmt = parseFloat(document.getElementById('aporte').value);
        const r = (parseFloat(document.getElementById('taxa').value) / 100) / 12;
        const n = parseFloat(document.getElementById('tempo').value) * 12;

        // Fórmula de juros compostos com aportes mensais
        const valorFinal = p * Math.pow(1 + r, n) + pmt * (Math.pow(1 + r, n) - 1) / r;

        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.style.display = 'block';
        resultadoDiv.innerHTML = `Resultado: R$ ${valorFinal.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    },

    // 3. Gestão do Checklist
    addEventListeners() {
        const checks = document.querySelectorAll('#checklist input');
        checks.forEach(check => {
            check.addEventListener('change', () => {
                this.saveChecklist();
                this.updateProgressBar();
            });
        });
    },

    saveChecklist() {
        const status = Array.from(document.querySelectorAll('#checklist input'))
                            .map(c => c.checked);
        localStorage.setItem('finance_checklist', JSON.stringify(status));
    },

    loadChecklist() {
        const saved = JSON.parse(localStorage.getItem('finance_checklist'));
        if (saved) {
            const checks = document.querySelectorAll('#checklist input');
            saved.forEach((val, i) => checks[i].checked = val);
        }
        this.updateProgressBar();
    },

    updateProgressBar() {
        const checks = document.querySelectorAll('#checklist input');
        const checked = Array.from(checks).filter(c => c.checked).length;
        const percent = (checked / checks.length) * 100;
        document.getElementById('progress-bar').style.width = percent + '%';
    }
};

// Rodar ao carregar a página
window.onload = () => app.init();