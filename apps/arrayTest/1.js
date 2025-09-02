function combineArrays(colors, items, status) {
  const result = [];
  const maxLen = Math.max(colors.length, items.length, status.length);
  
  for (let i = 0; i < maxLen; i++) {
    const item = items[i % items.length];
    const stat = status[i % status.length];
    let colorIndex = i % colors.length;
    if (colorIndex === 0) {
    } else if (colorIndex % 2 === 0) {
      colorIndex = colorIndex - 1;
    } else {
      colorIndex = Math.min(colorIndex + 1, colors.length - 1);
    }
    
    const color = colors[colorIndex];
    result.push(`${item} ${color} ${stat}`);
  }
  return result;
}

// === TEST CASES ===
console.log("=== CASE 1: 5 warna ===");
console.log(
  combineArrays(
    ['merah','kuning','hijau','pink','ungu'],
    ['baju','celana','topi','jaket','sepatu'],
    ['diskon','sale','diskon','sale','sale']
  )
);

console.log("=== CASE 2: 6 warna ===");
console.log(
  combineArrays(
    ['merah','kuning','hijau','pink','ungu','maroon'],
    ['baju','celana','topi','jaket','sepatu'],
    ['diskon','sale','diskon','sale','sale']
  )
);

console.log("=== CASE 3: 7 warna ===");
console.log(
  combineArrays(
    ['merah','kuning','hijau','pink','ungu','maroon','biru'],
    ['baju','celana','topi','jaket','sepatu'],
    ['diskon','sale','diskon','sale','sale']
  )
);