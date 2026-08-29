/**
 * IHK WISO ABC- und XYZ-Materialanalyse Engine
 * Combines cumulative value analysis (Lorenz curve: A <= 80%, B <= 95%, C > 95%)
 * with demand predictability (XYZ: X <= 0.15, Y <= 0.35, Z > 0.35) for procurement optimization.
 */

export function analyzeAbcXyzMaterials(items = []) {
  if (!items || items.length === 0) {
    return { items: [], totalValue: 0, aCount: 0, bCount: 0, cCount: 0 };
  }

  // 1. Calculate individual annual value
  const processed = items.map(item => {
    const annualValue = (item.annualQuantity || 0) * (item.unitPrice || 0);
    return {
      ...item,
      annualValue
    };
  });

  // 2. Sort descending by annual value
  processed.sort((a, b) => b.annualValue - a.annualValue);

  const totalValue = processed.reduce((sum, item) => sum + item.annualValue, 0);

  // 3. Classify ABC and XYZ
  let runningSum = 0;
  const analyzedItems = processed.map((item, index) => {
    runningSum += item.annualValue;
    const valuePercent = totalValue > 0 ? (item.annualValue / totalValue) * 100 : 0;
    const cumulativePercent = totalValue > 0 ? (runningSum / totalValue) * 100 : 0;

    // ABC Classification: A <= 80% (or first item), B <= 95%, C > 95%
    let abcClass = 'C';
    if (index === 0 || cumulativePercent <= 80) {
      abcClass = 'A';
    } else if (cumulativePercent <= 95) {
      abcClass = 'B';
    }

    // XYZ Classification (Variation coefficient)
    const vk = item.variationCoeff || 0.1;
    let xyzClass = 'Z';
    if (vk <= 0.15) {
      xyzClass = 'X';
    } else if (vk <= 0.35) {
      xyzClass = 'Y';
    }

    const matrixClass = `${abcClass}${xyzClass}`;

    // Procurement recommendation
    let recommendation = 'Vorratsbeschaffung';
    if (matrixClass === 'AX' || matrixClass === 'AY') {
      recommendation = 'Just-in-Time (JIT) / Fertigungssynchrone Beschaffung';
    } else if (matrixClass === 'AZ') {
      recommendation = 'Fallweise Einzelbeschaffung bei Auftragseingang';
    } else if (matrixClass === 'BX' || matrixClass === 'BY') {
      recommendation = 'Bedarfsgesteuerte Vorratsbeschaffung (Meldebestand)';
    } else if (abcClass === 'C') {
      recommendation = 'C-Teile-Management / Kanban / Großmengenbestellung';
    }

    return {
      ...item,
      valuePercent: Math.round(valuePercent * 10) / 10,
      cumulativePercent: Math.round(cumulativePercent * 10) / 10,
      abcClass,
      xyzClass,
      matrixClass,
      recommendation
    };
  });

  return {
    items: analyzedItems,
    totalValue,
    aCount: analyzedItems.filter(i => i.abcClass === 'A').length,
    bCount: analyzedItems.filter(i => i.abcClass === 'B').length,
    cCount: analyzedItems.filter(i => i.abcClass === 'C').length
  };
}
