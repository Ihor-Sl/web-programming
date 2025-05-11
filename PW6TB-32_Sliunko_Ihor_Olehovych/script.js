function calculate() {
    const hr = getHRData();
    const big = getBigData();
    const total_nPn = document.getElementById("total_nPn").valueAsNumber || 0;
    const total_nPnKv = document.getElementById("total_nPnKv").valueAsNumber || 0;
    const total_nPnKvTg = document.getElementById("total_nPnKvTg").valueAsNumber || 0;
    const total_nPn2 = document.getElementById("total_nPn2").valueAsNumber || 0;

    const hr_sum = {
        n: 0,
        un: 0,
        nPn: 0,
        kv: 0,
        nPnKv: 0,
        nPnKvTg: 0,
        nPn2: 0,
        ne: 0,
        kr: 0,
        pr: 0,
        qr: 0,
        sr: 0,
        ir: 0
    };
    let result = "Струми на I рівні електропостачання:<br>";
    for (const name in hr) {
        const d = hr[name];
        const nPn = d.n * d.Pn;
        const nPnKv = d.n * d.Pn * d.Kv;
        const nPnKvTg = d.n * d.Pn * d.Kv * d.tgPhi;
        const nPn2 = d.n * Math.pow(d.Pn, 2);
        const Ir = nPn / (Math.sqrt(3) * d.Un * d.cosPhi * d.eta);
        result += `${name} - I<sub>р</sub> = ${Ir.toFixed(2)} А<br>`;

        hr_sum.n += d.n;
        if (hr_sum.un == 0) {
            hr_sum.un += d.Un;
        }
        else {
            hr_sum.un = (hr_sum.un + d.Un) / 2;
        }

        hr_sum.nPn += nPn;
        hr_sum.nPnKv += nPnKv;
        hr_sum.nPnKvTg += nPnKvTg;
        hr_sum.nPn2 += nPn2;
    }
    for (const name in big) {
        const d = big[name];
        const nPn = d.n * d.Pn;
        const Ir = nPn / (Math.sqrt(3) * d.Un * d.cosPhi * d.eta);
        result += `${name} - I<sub>р</sub> = ${Ir.toFixed(2)} А<br>`;
    }

    hr_sum.kv = hr_sum.nPnKv / hr_sum.nPn;
    hr_sum.ne = (hr_sum.nPn ** 2) / hr_sum.nPn2;
    hr_sum.kr = getkrM(hr_sum.ne, hr_sum.kv);
    hr_sum.pr = hr_sum.kr * hr_sum.nPnKv;
    hr_sum.qr = hr_sum.nPnKvTg;
    hr_sum.sr = Math.sqrt((hr_sum.pr ** 2) + (hr_sum.qr ** 2));
    hr_sum.ir = hr_sum.pr / hr_sum.un;

    const total_kv = total_nPnKv / total_nPn;
    const total_ne = (total_nPn ** 2) / total_nPn2;
    const total_kr = getkrT(total_ne, total_kv);
    const total_pr = total_kr * total_nPnKv;
    const total_qr = total_kr * total_nPnKvTg;
    const total_sr = Math.sqrt((total_pr ** 2) + (total_qr ** 2));
    const total_ir = total_pr / 0.38;

    result += `
        Груповий коефіцієнт використання для ШР1=ШР2=ШР3: ${hr_sum.kv.toFixed(4)};<br>
        Ефективна кількість ЕП для ШР1=ШР2=ШР3: ${hr_sum.ne.toFixed(0)};<br>
        Розрахунковий коефіцієнт активної потужності для ШР1=ШР2=ШР3: ${hr_sum.kr.toFixed(2)};<br>
        Розрахункове активне навантаження для ШР1=ШР2=ШР3: ${hr_sum.pr.toFixed(2)} кВт;<br>
        Розрахункове реактивне навантаження для ШР1=ШР2=ШР3: ${hr_sum.qr.toFixed(2)} квар.;<br>
        Повна потужність для ШР1=ШР2=ШР3: ${hr_sum.sr.toFixed(4)} кВ*А;<br>
        Розрахунковий груповий струм для ШР1=ШР2=ШР3: ${hr_sum.ir.toFixed(2)} А;<br>
        Коефіцієнти використання цеху в цілому: ${total_kv.toFixed(2)};<br>
        Ефективна кількість ЕП цеху в цілому: ${total_ne.toFixed(0)};<br>
        Розрахунковий коефіцієнт активної потужності цеху в цілому: ${total_kr.toFixed(2)};<br>
        Розрахункове активне навантаження на шинах 0,38 кВ ТП: ${total_pr.toFixed(2)} кВт;<br>
        Розрахункове реактивне навантаження на шинах 0,38 кВ ТП: ${total_qr.toFixed(2)} квар;<br>
        Повна потужність на шинах 0,38 кВ ТП: ${total_sr.toFixed(2)} кВ*А;<br>
        Розрахунковий груповий струм на шинах 0,38 кВ ТП: ${total_ir.toFixed(2)} А.
    `;

    document.getElementById("result").innerHTML = result;
}

const big_names = ["Зварювальний трансформатор", "Сушильна шафа"]

function getHRData() {
    const hr = {};
    const rows = document.querySelectorAll("tbody tr");

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        const name = cells[0].textContent.trim();

        if (big_names.includes(name)) return;

        const inputs = Array.from(cells).slice(1).map(cell => cell.querySelector("input"));

        const [eta, cosPhi, Un, n, Pn, Kv, tgPhi] = inputs.map(input => parseFloat(input.value));
        hr[name] = { eta, cosPhi, Un, n, Pn, Kv, tgPhi };
    });

    return hr;
}

function getBigData() {
    const big = {};
    const rows = document.querySelectorAll("tbody tr");

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        const name = cells[0].textContent.trim();

        if (!big_names.includes(name)) return;

        const inputs = Array.from(cells).slice(1).map(cell => cell.querySelector("input"));

        const [eta, cosPhi, Un, n, Pn, Kv, tgPhi] = inputs.map(input => parseFloat(input.value));
        big[name] = { eta, cosPhi, Un, n, Pn, Kv, tgPhi };
    });

    return big;
}

function getkrM(ne, Kv) {
    const neValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 25, 30, 35, 40, 50, 60, 80, 100];

    const kvValues = [0.1, 0.15, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8];

    const krTable = [
        [8.00, 5.33, 4.00, 2.67, 2.00, 1.60, 1.33, 1.14, 1.00],
        [6.22, 4.33, 3.39, 2.45, 1.98, 1.60, 1.33, 1.14, 1.00],
        [4.06, 2.89, 2.31, 1.74, 1.45, 1.34, 1.22, 1.14, 1.00],
        [3.24, 2.35, 1.91, 1.47, 1.25, 1.21, 1.12, 1.06, 1.00],
        [2.84, 2.09, 1.72, 1.35, 1.16, 1.16, 1.08, 1.03, 1.00],
        [2.64, 1.96, 1.62, 1.28, 1.14, 1.13, 1.06, 1.01, 1.00],
        [2.49, 1.86, 1.54, 1.23, 1.12, 1.10, 1.04, 1.00, 1.00],
        [2.37, 1.78, 1.48, 1.19, 1.10, 1.08, 1.02, 1.00, 1.00],
        [2.27, 1.71, 1.43, 1.16, 1.09, 1.07, 1.01, 1.00, 1.00],
        [2.18, 1.65, 1.39, 1.13, 1.07, 1.05, 1.00, 1.00, 1.00],
        [2.04, 1.56, 1.32, 1.08, 1.05, 1.03, 1.00, 1.00, 1.00],
        [1.94, 1.49, 1.27, 1.05, 1.02, 1.00, 1.00, 1.00, 1.00],
        [1.85, 1.43, 1.23, 1.02, 1.00, 1.00, 1.00, 1.00, 1.00],
        [1.78, 1.39, 1.19, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00],
        [1.72, 1.35, 1.16, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00],
        [1.60, 1.27, 1.10, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00],
        [1.51, 1.21, 1.05, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00],
        [1.44, 1.16, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00],
        [1.40, 1.13, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00],
        [1.30, 1.07, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00],
        [1.25, 1.03, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00],
        [1.20, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00],
        [1.16, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00],
        [1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00, 1.00]
    ];

    function findClosestValue(value, arr) {
        return arr.reduce((prev, curr) => Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev);
    }

    const closestNe = findClosestValue(ne, neValues);
    const closestKv = findClosestValue(Kv, kvValues);

    const neIndex = neValues.indexOf(closestNe);
    const kvIndex = kvValues.indexOf(closestKv);

    return krTable[neIndex][kvIndex];
}

function getkrT(ne, Kv) {
    const table = [
        { range: [0, 1], values: [8.00, 5.33, 4.00, 2.67, 2.00, 1.60, 1.33, 1.14] },
        { range: [2, 2], values: [5.01, 3.44, 2.69, 1.90, 1.52, 1.24, 1.11, 1.00] },
        { range: [3, 3], values: [2.40, 2.17, 1.80, 1.42, 1.23, 1.14, 1.08, 1.00] },
        { range: [4, 4], values: [2.28, 1.73, 1.46, 1.19, 1.06, 1.04, 1.00, 0.97] },
        { range: [5, 5], values: [1.31, 1.12, 1.02, 1.00, 0.98, 0.96, 0.94, 0.93] },
        { range: [6, 8], values: [1.20, 1.00, 0.96, 0.95, 0.94, 0.93, 0.92, 0.91] },
        { range: [9, 10], values: [1.10, 0.97, 0.91, 0.90, 0.90, 0.90, 0.90, 0.90] },
        { range: [10, 25], values: [0.80, 0.80, 0.80, 0.85, 0.85, 0.85, 0.85, 0.90] },
        { range: [25, 50], values: [0.75, 0.75, 0.75, 0.75, 0.75, 0.80, 0.85, 0.85] },
        { range: [51, Infinity], values: [0.65, 0.65, 0.65, 0.70, 0.70, 0.75, 0.80, 0.80] }
    ];

    const Kv_values = [0.1, 0.15, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7];

    const row = table.find(({ range }) => ne >= range[0] && ne <= range[1]);

    if (!row) return null;

    let KvIndex = Kv_values.findIndex(value => Kv <= value);
    if (KvIndex === -1) KvIndex = Kv_values.length - 1;

    return row.values[KvIndex];
}