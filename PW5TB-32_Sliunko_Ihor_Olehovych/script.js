function calculate_1() {
    const PL_110 = document.getElementById("PL-110").valueAsNumber || 0;
    const V_110 = document.getElementById("V-110").valueAsNumber || 0;
    const T_110 = document.getElementById("T-110").valueAsNumber || 0;
    const V_10 = document.getElementById("V-10").valueAsNumber || 0;
    const BUS_10 = document.getElementById("BUS-10").valueAsNumber || 0;

    const w_oc = (0.007 * PL_110) + (0.01 * V_110) + (0.015 * T_110) + (0.02 * V_10) + (0.03 * BUS_10);
    const t_voc = ((0.007 * PL_110 * 10) + (0.01 * V_110 * 30) + (0.015 * T_110 * 100) + (0.02 * V_10 * 15) + (0.03 * BUS_10 * 2)) / w_oc;
    const k_aoc = w_oc * t_voc / 8760;
    const k_p_max = Math.max(
        PL_110 != 0 ? 5.845 : 0,
        V_110 != 0 ? 3 : 0,
        T_110 != 0 ? 43 : 0,
        V_10 != 0 ? 4.95 : 0,
        BUS_10 != 0 ? 0.835 : 0,
    );
    const k_p_oc = 1.2 * k_p_max / 8760;
    const w_dk = 2 * w_oc * (k_aoc + k_p_oc);
    const w_dc = w_dk + 0.02;

    document.getElementById("result1").innerHTML = `
        <strong>Частота відмов одноколової системи:</strong><br>
        ${w_oc.toFixed(4)} рік<sup>-1</sup><br>
        <strong>Середня тривалість відновлення:</strong><br>
        ${t_voc.toFixed(4)} год<br>
        <strong>Коефіцієнт аварійного простою одноколової системи:</strong><br>
        ${k_aoc.toExponential(2)}<br>
        <strong>Коефіцієнт планового простою одноколової системи:</strong><br>
        ${k_p_oc.toExponential(2)} год<br>
        <strong>Частота відмов одночасно двох кіл двоколової системи:</strong><br>
        ${w_dk.toExponential(2)} рік<sup>-1</sup><br>
        <strong>Частота відмов двоколової системи з урахуванням секційного вимикача:</strong><br>
        ${w_dc.toFixed(4)} рік<sup>-1</sup><br>
    `;
}

function calculate_2() {
    const Z_per_a = document.getElementById("Z_per_a").valueAsNumber || 0;
    const Z_per_p = document.getElementById("Z_per_p").valueAsNumber || 0;
    const w = document.getElementById("w").valueAsNumber || 0;
    const t_v = document.getElementById("t_v").valueAsNumber || 0;
    const k_p = document.getElementById("k_p").valueAsNumber || 0;
    const P_M = document.getElementById("P_M").valueAsNumber || 0;
    const T_M = document.getElementById("T_M").valueAsNumber || 0;

    const M_w_ned_a = w * t_v * P_M * T_M;
    const M_w_ned_p = k_p * P_M * T_M;
    const m_Z_per = Z_per_a * M_w_ned_a + Z_per_p * M_w_ned_p;

    document.getElementById("result2").innerHTML = `
        <strong>Математичне сподівання аварійного недовідпущення електроенергії становить:</strong><br>
        ${M_w_ned_a.toFixed(2)} кВт*год<br>
        <strong>Математичне сподівання планового недовідпущення електроенергії становить:</strong><br>
        ${M_w_ned_p.toFixed(2)} кВт*год<br>
        <strong>Математичне сподівання збитків від переривання електропостачання:</strong><br>
        ${m_Z_per.toFixed(2)} грн<br>
    `;
}
