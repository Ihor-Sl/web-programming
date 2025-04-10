function calculate1() {
    const hydrogen = document.getElementById("hydrogen-1").valueAsNumber || 0;
    const carbon = document.getElementById("carbon-1").valueAsNumber || 0;
    const sulfur = document.getElementById("sulfur-1").valueAsNumber || 0;
    const nitrogen = document.getElementById("nitrogen-1").valueAsNumber || 0;
    const oxygen = document.getElementById("oxygen-1").valueAsNumber || 0;
    const moisture = document.getElementById("moisture-1").valueAsNumber || 0;
    const ash = document.getElementById("ash-1").valueAsNumber || 0;

    const dryMassFactor = 100 / (100 - moisture);
    const combustibleMassFactor = 100 / (100 - moisture - ash);

    const Q_working = (339 * carbon + 1030 * hydrogen - 108.8 * (oxygen - sulfur) - 25 * moisture) / 1000;
    const Q_dry = (Q_working + 0.025 * moisture) * (100 / (100 - moisture));
    const Q_combustible = (Q_working + 0.025 * moisture) * (100 / (100 - moisture - ash));

    document.getElementById("result-1").innerHTML = `
        <strong>Коефіцієнт переходу від робочої до сухої маси становить:</strong><br>
        ${(dryMassFactor).toFixed(2)}<br>
        <strong>Коефіцієнт переходу від робочої до горючої маси становить:</strong><br>
        ${(combustibleMassFactor).toFixed(2)}<br>
        <strong>Склад сухої маси палива:</strong><br>
        H<sup>С</sup>: ${(hydrogen * dryMassFactor).toFixed(2)}%<br>
        C<sup>С</sup>: ${(carbon * dryMassFactor).toFixed(2)}%<br>
        S<sup>С</sup>: ${(sulfur * dryMassFactor).toFixed(2)}%<br>
        N<sup>С</sup>: ${(nitrogen * dryMassFactor).toFixed(2)}%<br>
        O<sup>С</sup>: ${(oxygen * dryMassFactor).toFixed(2)}%<br>
        A<sup>С</sup>: ${(ash * dryMassFactor).toFixed(2)}%<br>

        <strong>Склад горючої маси палива:</strong><br>
        H<sup>Г</sup>: ${(hydrogen * combustibleMassFactor).toFixed(2)}%<br>
        C<sup>Г</sup>: ${(carbon * combustibleMassFactor).toFixed(2)}%<br>
        S<sup>Г</sup>: ${(sulfur * combustibleMassFactor).toFixed(2)}%<br>
        N<sup>Г</sup>: ${(nitrogen * combustibleMassFactor).toFixed(2)}%<br>
        O<sup>Г</sup>: ${(oxygen * combustibleMassFactor).toFixed(2)}%<br>

        <strong>Нижня теплота згоряння для робочої маси:</strong><br>
        Q<sup>Р</sup>: ${Q_working.toFixed(4)} МДж/кг<br>
        <strong>Нижня теплота згоряння для сухої маси:</strong><br>
        Q<sup>С</sup>: ${Q_dry.toFixed(4)} МДж/кг<br>
        <strong>Нижня теплота згоряння для горючої маси:</strong><br>
        Q<sup>Г</sup>: ${Q_combustible.toFixed(4)} МДж/кг<br>
    `;
}

function calculate2() {
    const carbon = document.getElementById("carbon-2").valueAsNumber || 0;
    const hydrogen = document.getElementById("hydrogen-2").valueAsNumber || 0;
    const oxygen = document.getElementById("oxygen-2").valueAsNumber || 0;
    const sulfur = document.getElementById("sulfur-2").valueAsNumber || 0;
    const Q_combustible = document.getElementById("q-combustible-2").valueAsNumber || 0;
    const moisture = document.getElementById("moisture-2").valueAsNumber || 0;
    const ash = document.getElementById("ash-2").valueAsNumber || 0;
    const vanadium = document.getElementById("vanadium-2").valueAsNumber || 0;

    const combustibleToWorkingMassFactor = (100 - moisture - ash) / 100;
    const dryToWorkingMassFactor = (100 - moisture) / 100;

    const Q_working = Q_combustible * (100 - moisture - ash) / 100 - 0.025 * moisture;

    document.getElementById("result-2").innerHTML = `
        <strong>Склад робочої маси мазуту:</strong><br>
        C<sup>Р</sup>: ${(carbon * combustibleToWorkingMassFactor).toFixed(2)}%<br>
        H<sup>Р</sup>: ${(hydrogen * combustibleToWorkingMassFactor).toFixed(2)}%<br>
        O<sup>Р</sup>: ${(oxygen * combustibleToWorkingMassFactor).toFixed(2)}%<br>
        S<sup>Р</sup>: ${(sulfur * combustibleToWorkingMassFactor).toFixed(2)}%<br>
        A<sup>Р</sup>: ${(ash * dryToWorkingMassFactor).toFixed(2)}%<br>
        V<sup>Р</sup>: ${(vanadium * dryToWorkingMassFactor).toFixed(2)} мг/кг<br>

        <strong>Нижня теплота згоряння мазуту для робочої маси:</strong><br>
        Q<sup>Р</sup>: ${Q_working.toFixed(4)} МДж/кг<br>
    `;
}