function calculate() {
    const coalMass = document.getElementById("coal").valueAsNumber || 0;
    const fuelOilMass = document.getElementById("fuelOil").valueAsNumber || 0;

    const Qri_coal = 20.47;
    const Qri_fuelOil = 39.48;
    const flyAshFractionCoal = 0.8;
    const flyAshFractionFuelOil = 1;
    const ashMassCoal = 25.2;
    const ashMasFuelOil = 0.15;
    const combustionMassCoal = 1.5;
    const combustionMassFuelOil = 0;
    const efficiency = 0.985;

    const emmisionFactorCoal = Math.pow(10, 6) / Qri_coal * flyAshFractionCoal * ashMassCoal / (100 - combustionMassCoal) * (1 - efficiency);
    const grossEmissionCoal = Math.pow(10, -6) * emmisionFactorCoal * Qri_coal * coalMass;
    const emmisionFactorFuelOil = Math.pow(10, 6) / Qri_fuelOil * flyAshFractionFuelOil * ashMasFuelOil / (100 - combustionMassFuelOil) * (1 - efficiency);
    const grossEmissionFuelOil = Math.pow(10, -6) * emmisionFactorFuelOil * Qri_fuelOil * fuelOilMass;
    const emmisionFactorGas = 0; // Бо при спалюванні природного газу тверді частинки відсутні. flyAshFractionGas = 0
    const grossEmmisionGas = 0; // Бо emmisionFactorGas = 0

    document.getElementById("result").innerHTML = `
        <strong>Показник емісії твердих частинок при спалюванні вугілля становитиме:</strong><br>
        ${emmisionFactorCoal.toFixed(2)} г/ГДж<br>
        <strong>Валовий викид при спалюванні вугілля становитиме:</strong><br>
        ${grossEmissionCoal.toFixed(2)} т<br>
        <strong>Показник емісії твердих частинок при спалюванні мазуту становитиме:</strong><br>
        ${emmisionFactorFuelOil.toFixed(2)} г/ГДж<br>
        <strong>Валовий викид при спалюванні мазуту становитиме:</strong><br>
        ${grossEmissionFuelOil.toFixed(2)} т<br>
        <strong>Показник емісії твердих частинок при спалюванні природного газу становитиме:</strong><br>
        ${emmisionFactorGas.toFixed(2)} г/ГДж<br>
        <strong>Валовий викид при спалюванні природного газу становитиме:</strong><br>
        ${grossEmmisionGas.toFixed(2)} т<br>
    `
}
І