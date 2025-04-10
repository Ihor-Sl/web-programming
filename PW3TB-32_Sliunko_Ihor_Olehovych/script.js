function calculate() {
    const power = document.getElementById("power").valueAsNumber || 0;
    const standardDeviation = document.getElementById("standard-deviation").valueAsNumber || 0;
    const standardDeviationImproved = document.getElementById("standard-deviation-improved").valueAsNumber || 0;
    const energyPrice = document.getElementById("energy-price").valueAsNumber || 0;

    const powerImbalance = integrateNormalDistribution(power - power * 0.05, power + power * 0.05, standardDeviation, power);
    const profit = power * 24 * powerImbalance * energyPrice
    const fine = power * 24 * (1 - powerImbalance) * energyPrice
    const finalProfit = profit - fine

    const powerImbalanceImproved = integrateNormalDistribution(power - power * 0.05, power + power * 0.05, standardDeviationImproved, power);
    const profitImproved = power * 24 * powerImbalanceImproved * energyPrice
    const fineImproved = power * 24 * (1 - powerImbalanceImproved) * energyPrice
    const finalProfitImproved = profitImproved - fineImproved

    document.getElementById("result").innerHTML = `
        <strong>Прибуток до вдосконалення:</strong><br>
        ${finalProfit.toFixed(2)} тис. грн.<br>
        <strong>Прибуток після вдосконалення:</strong><br>
        ${finalProfitImproved.toFixed(2)} тис. грн.<br>
        <strong>Різниця прибутків:</strong><br>
        ${(finalProfitImproved - finalProfit).toFixed(2)} тис. грн.<br>
    `
}

function integrateNormalDistribution(a, b, sigma, mu) {
    return 0.5 * (erf((b - mu) / (Math.SQRT2 * sigma)) - erf((a - mu) / (Math.SQRT2 * sigma)))
}

function erf(x) {
    // save the sign of x
    var sign = (x >= 0) ? 1 : -1;
    x = Math.abs(x);

    // constants
    var a1 = 0.254829592;
    var a2 = -0.284496736;
    var a3 = 1.421413741;
    var a4 = -1.453152027;
    var a5 = 1.061405429;
    var p = 0.3275911;

    // A&S formula 7.1.26
    var t = 1.0 / (1.0 + p * x);
    var y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y; // erf(-x) = -erf(x);
}