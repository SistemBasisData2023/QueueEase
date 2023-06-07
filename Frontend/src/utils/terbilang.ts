export function terbilang(angka: number): string {
  const bilne=["","satu","dua","tiga","empat","lima","enam","tujuh","delapan","sembilan","sepuluh","sebelas"];

  if (angka < 12) {
    return bilne[angka];
  } else if (angka < 20) {
    return terbilang(angka-10)+" belas";
  } else if (angka < 100) {
    return terbilang(Math.floor(angka/10))+" puluh "+terbilang(angka%10);
  } else if (angka < 200) {
    return "seratus "+terbilang(angka-100);
  } else if (angka < 1000) {
    return terbilang(Math.floor(angka/100))+" ratus "+terbilang(angka%100);
  } else if (angka < 2000) {
    return "seribu "+terbilang(angka-1000);
  } else if (angka < 1000000) {
    return terbilang(Math.floor(angka/1000))+" ribu "+terbilang(angka%1000);
  } else if (angka < 1000000000) {
    return terbilang(Math.floor(angka/1000000))+" juta "+terbilang(angka%1000000);
  } else if (angka < 1000000000000) {
    return terbilang(Math.floor(angka/1000000000))+" milyar "+terbilang(angka%1000000000);
  } else if (angka < 1000000000000000) {
    return terbilang(Math.floor(angka/1000000000000))+" trilyun "+terbilang(angka%1000000000000);
  }
  return ""
}

