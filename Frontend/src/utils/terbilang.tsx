export function terbilang(angka: number): string | null {
  const bilne = [
    'kosong',
    'satu',
    'dua',
    'tiga',
    'empat',
    'lima',
    'enam',
    'tujuh',
    'delapan',
    'sembilan',
    'sepuluh',
    'sebelas',
  ];

  if (angka < 12) {
    return `src/assets/audio/${bilne[angka]}.mp3`;
  } else if (angka < 20) {
    return `${terbilang(angka - 10)}|src/assets/audio/belas.mp3`;
  } else if (angka < 100) {
    return `${terbilang(
      Math.floor(angka / 10)
    )}|src/assets/audio/puluh.mp3|${terbilang(angka % 10)}`;
  } else if (angka < 200) {
    return `src/assets/audio/seratus.mp3|${terbilang(angka - 100)}`;
  } else if (angka < 1000) {
    return `${terbilang(
      Math.floor(angka / 100)
    )}|src/assets/audio/ratus.mp3|${terbilang(angka % 100)}`;
  } else if (angka < 2000) {
    return `src/assets/audio/seribu.mp3|${terbilang(angka - 1000)}`;
  } else if (angka < 1000000) {
    return `${terbilang(
      Math.floor(angka / 1000)
    )}|src/assets/audio/ribu.mp3|${terbilang(angka % 1000)}`;
  } else if (angka < 1000000000) {
    return `${terbilang(
      Math.floor(angka / 1000000)
    )}|src/assets/audio/juta.mp3|${terbilang(angka % 1000000)}`;
  } else if (angka < 1000000000000) {
    return `${terbilang(
      Math.floor(angka / 1000000000)
    )}|src/assets/audio/milyar.mp3|${terbilang(angka % 1000000000)}`;
  } else if (angka < 1000000000000000) {
    return `${terbilang(
      Math.floor(angka / 1000000000000)
    )}|src/assets/audio/trilyun.mp3|${terbilang(angka % 1000000000000)}`;
  }
  return null;
}
