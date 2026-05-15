import mermaid from 'mermaid';

// Initialize Mermaid
mermaid.initialize({ startOnLoad: true, theme: 'dark' });

// DOM Elements
const logEl = document.getElementById('log');
const runBtn = document.getElementById('runSim');
const simStatus = document.getElementById('simStatus');
const resetBtn = document.getElementById('resetDash');
const progressBar = document.getElementById('progressBar');
const particles = [document.getElementById('particle1'), document.getElementById('particle2')];
const auditLogBody = document.getElementById('auditLogBody');
const currentTimeEl = document.getElementById('currentTime');
const throughputVal = document.getElementById('throughputVal');
const latencyVal = document.getElementById('latencyVal');
const successRateVal = document.getElementById('successRateVal');
const dlqVal = document.getElementById('dlqVal');
const incidentList = document.getElementById('incidentList');
const pipelineStatus = document.getElementById('pipelineStatus');

// Update Clock
setInterval(() => {
    if (currentTimeEl) {
        currentTimeEl.textContent = new Date().toLocaleTimeString();
    }
}, 1000);

// Tab Switching
const navBtns = document.querySelectorAll('.nav-btn');
const tabContents = document.querySelectorAll('.tab-content');

navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        navBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(`${tabId}Tab`)?.classList.add('active');
        if (tabId === 'arch') mermaid.run({ querySelector: '.mermaid' });
    });
});

function addLog(msg: string, type: 'info' | 'success' | 'warn' = 'info') {
    if (!logEl) return;
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
    logEl.prepend(entry);
}

function addAuditLog(domain: string, action: string, status: string, level: string = 'INFO') {
    if (!auditLogBody) return;
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${new Date().toLocaleTimeString()}</td>
        <td><span class="tag ${level.toLowerCase()}">${level}</span></td>
        <td>${domain}</td>
        <td>${action}</td>
        <td><span class="${status === 'OK' ? 'text-success' : 'text-warning'}">${status}</span></td>
    `;
    auditLogBody.prepend(row);
}

const sampleSAPRecord = {
    BELNR: "10004582",
    GJAHR: "2026",
    BUKRS: "MC01",
    HSL: 24500.50
};

// Stats state
let currentThroughput = 37.8;
let currentLatency = 1.2;
let currentSuccessRate = 99.98;
let currentDlq = 17;
let isSimulating = false;

function updateStats() {
    if (isSimulating) {
        currentThroughput = 150 + Math.random() * 50;
        currentLatency = 2.5 + Math.random() * 1.5;
    } else {
        currentThroughput = 35 + Math.random() * 10;
        currentLatency = 1.0 + Math.random() * 0.5;
    }
    
    if (throughputVal) throughputVal.innerHTML = `${currentThroughput.toFixed(1)} <small>rec/s</small>`;
    if (latencyVal) latencyVal.textContent = `${currentLatency.toFixed(2)}s`;
    if (successRateVal) successRateVal.textContent = `${currentSuccessRate.toFixed(2)}%`;
    if (dlqVal) dlqVal.textContent = currentDlq.toString();
}

setInterval(updateStats, 2000);

function addIncident(title: string, meta: string, type: 'warn' | 'error') {
    if (!incidentList) return;
    const item = document.createElement('div');
    item.className = `incident-item ${type}`;
    item.innerHTML = `
        <div class="incident-title">${title}</div>
        <div class="incident-meta">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - ${meta}</div>
    `;
    incidentList.prepend(item);
    if (incidentList.children.length > 5) {
        incidentList.removeChild(incidentList.lastChild!);
    }
}

async function runSimulation() {
    if (!runBtn || !simStatus || !progressBar) return;
    
    isSimulating = true;
    runBtn.setAttribute('disabled', 'true');
    runBtn.textContent = "SYNCING...";
    if (pipelineStatus) {
        pipelineStatus.textContent = "PIPELINE: HIGH LOAD";
        pipelineStatus.style.color = "var(--warning)";
    }
    
    // Step 1: Extraction
    simStatus.textContent = "EXTRACTING FROM SAP...";
    progressBar.style.width = '20%';
    particles[0]?.classList.add('active');
    addLog(`[SAP] Fetching record ${sampleSAPRecord.BELNR} via ODP...`);
    await new Promise(r => setTimeout(r, 1200));

    // Step 2: Transformation
    simStatus.textContent = "APPLYING MAPPING LOGIC...";
    progressBar.style.width = '50%';
    particles[0]?.classList.remove('active');
    particles[1]?.classList.add('active');
    addLog(`[BRIDGE] Mapping: ${sampleSAPRecord.BELNR} -> MC01-2026-10004582`, 'success');
    addLog(`[BRIDGE] Currency Conversion (INR): Success`, 'success');
    await new Promise(r => setTimeout(r, 1000));

    // Step 3: Ingestion
    simStatus.textContent = "INGESTING TO FINSIGHT...";
    progressBar.style.width = '80%';
    addLog(`[FINSIGHT] POST /v1/journal-entries...`);
    await new Promise(r => setTimeout(r, 1500));

    // Step 4: Complete
    const success = Math.random() > 0.15; // 85% chance of success
    progressBar.style.width = '100%';
    particles[1]?.classList.remove('active');
    
    if (success) {
        addLog(`[FINSIGHT] 201 Created. BatchID: B-${Math.floor(Math.random()*10000)}`, 'success');
        addAuditLog('GL', 'Manual Sync', 'OK');
    } else {
        addLog(`[FINSIGHT] 503 Service Unavailable. Routing to DLQ.`, 'warn');
        addAuditLog('GL', 'Manual Sync', 'FAIL', 'WARN');
        currentDlq++;
        currentSuccessRate = Math.max(99.0, currentSuccessRate - 0.05);
        addIncident('1 record routed to DLQ', 'FinSight timeout', 'error');
        updateStats();
    }
    
    simStatus.textContent = "SYNC COMPLETE!";
    runBtn.textContent = "TRIGGER SYNC";
    runBtn.removeAttribute('disabled');
    isSimulating = false;

    setTimeout(() => {
        progressBar.style.width = '0%';
        simStatus.textContent = "Ready for manual trigger...";
        if (pipelineStatus) {
            pipelineStatus.textContent = "PIPELINE ACTIVE";
            pipelineStatus.style.color = "var(--success)";
        }
    }, 3000);
}

runBtn?.addEventListener('click', runSimulation);

resetBtn?.addEventListener('click', () => {
    if (logEl) logEl.innerHTML = '<div class="log-entry info">[SYSTEM] Dashboard reset performed.</div>';
    if (auditLogBody) auditLogBody.innerHTML = '';
    if (incidentList) incidentList.innerHTML = '';
    
    currentDlq = 0;
    currentSuccessRate = 100.00;
    updateStats();
    
    addLog("System re-initialized.", "success");
    addAuditLog('SYSTEM', 'Dashboard Reset', 'OK', 'WARN');
});

// Random background noise
setInterval(() => {
    const events = [
        { d: 'GL', a: 'Heartbeat Check', s: 'OK' },
        { d: 'AP', a: 'Delta Poll', s: 'OK' },
        { d: 'SYS', a: 'Token Refresh', s: 'OK' }
    ];
    const e = events[Math.floor(Math.random() * events.length)];
    addLog(`[SYSTEM] ${e.a}: ${e.d} is ${e.s}`);
    if (Math.random() > 0.7) addAuditLog(e.d, e.a, e.s);
}, 20000);
