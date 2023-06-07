

export function terbilang(angka: number): JSX.Element | null {
  const bilne=["","satu","dua","tiga","empat","lima","enam","tujuh","delapan","sembilan","sepuluh","sebelas"];

  if (angka < 12) {
    return <audio src={`/path/to/${bilne[angka]}.mp3`} controls />;
  } else if (angka < 20) {
    return (
      <>
        {terbilang(angka - 10)}
        <audio src="/path/to/belas.mp3" controls />
      </>
    );
  } else if (angka < 100) {
    return (
      <>
        {terbilang(Math.floor(angka / 10))}
        <audio src="/path/to/puluh.mp3" controls />
        {terbilang(angka % 10)}
      </>
    );
  } else if (angka < 200) {
    return (
      <>
        <audio src="/path/to/seratus.mp3" controls />
        {terbilang(angka - 100)}
      </>
    );
  } else if (angka < 1000) {
    return (
      <>
        {terbilang(Math.floor(angka / 100))}
        <audio src="/path/to/ratus.mp3" controls />
        {terbilang(angka % 100)}
      </>
    );
  } else if (angka < 2000) {
    return (
      <>
        <audio src="/path/to/seribu.mp3" controls />
        {terbilang(angka - 1000)}
      </>
    );
  } else if (angka < 1000000) {
    return (
      <>
        {terbilang(Math.floor(angka / 1000))}
        <audio src="/path/to/ribu.mp3" controls />
        {terbilang(angka % 1000)}
      </>
    );
  } else if (angka < 1000000000) {
    return (
      <>
        {terbilang(Math.floor(angka / 1000000))}
        <audio src="/path/to/juta.mp3" controls />
        {terbilang(angka % 1000000)}
      </>
    );
  } else if (angka < 1000000000000) {
    return (
      <>
        {terbilang(Math.floor(angka / 1000000000))}
        <audio src="/path/to/milyar.mp3" controls />
        {terbilang(angka % 1000000000)}
      </>
    );
  } else if (angka < 1000000000000000) {
    return (
      <>
        {terbilang(Math.floor(angka / 1000000000000))}
        <audio src="/path/to/trilyun.mp3" controls />
        {terbilang(angka % 1000000000000)}
      </>
    );
  }
  return null;
}
