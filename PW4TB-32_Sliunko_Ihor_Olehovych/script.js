function calculate_1() {
    const U = document.getElementById("voltage").valueAsNumber || 0;
    const I_K = document.getElementById("current-sc").valueAsNumber || 0;
    const t_f = document.getElementById("fictitious-time-sc").valueAsNumber || 0;
    const S_M = document.getElementById("load").valueAsNumber || 0;
    const T_M = document.getElementById("T_M").valueAsNumber || 0;

    const I_M = (S_M / 2) / (Math.sqrt(3) * U);
    const S_ek = I_M / getJek(T_M);
    const S_min = (I_K * 1000) * Math.sqrt(t_f) / 92;

    document.getElementById("result1").innerHTML = `
        <strong>Економічний переріз:</strong><br>
        s<sub>ек</sub> = ${S_ek.toFixed(2)} мм<sup>2</sup><br>
        <strong>За термічною стійкістю до дії струмів КЗ:</strong><br>
        s ⩾ s<sub>min</sub> = ${S_min.toFixed(2)} мм<sup>2</sup><br>
    `;
}

function calculate_2() {
    const S_K = document.getElementById("power-sc").valueAsNumber || 0;

    const X_c = Math.pow(10.5, 2) / S_K;
    const X_T = Math.pow(10.5, 3) / (100 * 6.3);
    const X_E = X_c + X_T;
    const I_p0 = 10.5 / (Math.sqrt(3) * X_E);

    document.getElementById("result2").innerHTML = `
        <strong>Початкове діюче значення струму трифазного КЗ:</strong><br>
        ${I_p0.toFixed(2)} кА<br>
    `;
}

function calculate_3() {
    const U_vn = document.getElementById("voltage-max-sc").valueAsNumber || 0;
    const U_k_max = document.getElementById("voltage-nominal").valueAsNumber || 0;
    const S_nom_t = document.getElementById("power-transformer-nominal").valueAsNumber || 0;
    const R_sh = document.getElementById("resistance-stator-active").valueAsNumber || 0;
    const X_c_n = document.getElementById("resistance-stator-reactive").valueAsNumber || 0;
    const R_sh_min = document.getElementById("resistance-stator-active-min").valueAsNumber || 0;
    const X_c_min = document.getElementById("resistance-stator-reactive-min").valueAsNumber || 0;

    const X_t = (U_k_max * Math.pow(U_vn, 2)) / (100 * S_nom_t);
    const X_sh = X_c_n + X_t;
    const Z_sh = Math.sqrt(Math.pow(R_sh, 2) + Math.pow(X_sh, 2));
    const X_sh_min = X_c_min + X_t;
    const Z_sh_min = Math.sqrt(Math.pow(R_sh_min, 2) + Math.pow(X_sh_min, 2));
    const I_sh_3 = (U_vn * 1000) / (Math.sqrt(3) * Z_sh);
    const I_sh_2 = I_sh_3 * (Math.sqrt(3) / 2);
    const I_sh_3_min = (U_vn * 1000) / (Math.sqrt(3) * Z_sh_min);
    const I_sh_2_min = I_sh_3_min * (Math.sqrt(3) / 2);

    document.getElementById("result3").innerHTML = `
        <strong>Реактивний опір силового трансформатора:</strong><br>
        ${X_t.toFixed(2)} Ом<br>
        <strong>Опори в нормальному режимі:</strong><br>
        <strong>Z:</strong> ${Z_sh.toFixed(2)} Ом<br>
        <strong>X:</strong> ${X_sh.toFixed(2)} Ом<br>
        <strong>Опори в мінімальному режимі:</strong><br>
        <strong>Z:</strong> ${Z_sh_min.toFixed(2)} Ом<br>
        <strong>X:</strong> ${X_sh_min.toFixed(2)} Ом<br>
        <strong>Струми в нормальному режимі:</strong><br>
        <strong>I(3):</strong> ${I_sh_3.toFixed(2)} А<br>
        <strong>I(2):</strong> ${I_sh_2.toFixed(2)} А<br>
        <strong>Струми в мінімальному режимі:</strong><br>
        <strong>I(3):</strong> ${I_sh_3_min.toFixed(2)} А<br>
        <strong>I(2):</strong> ${I_sh_2_min.toFixed(2)} А<br>
    `;
}

function getJek(key) {
    if (key >= 1000 && key <= 3000) {
        return 1.6;
    } else if (key > 3000 && key <= 5000) {
        return 1.4;
    } else if (key > 5000) {
        return 1.2;
    } else {
        return NaN;
    }
}