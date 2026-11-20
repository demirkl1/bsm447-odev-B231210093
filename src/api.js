// Varyant d: 2024 takımlar (constructor) puan durumu
export const API_URL = 'https://api.jolpi.ca/ergast/f1/2024/constructorstandings/';

export async function fetchConstructorStandings() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Sunucu hatası: ' + response.status);
  }
  const json = await response.json();

  // Liste iç içe bir yolda duruyor
  const standings = json.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;

  // API sayıları string gönderiyor, Number() ile çeviriyoruz
  const leaderPoints = Number(standings[0].points);

  return standings.map((s) => ({
    id: s.Constructor.constructorId,
    position: Number(s.position),
    name: s.Constructor.name,
    nationality: s.Constructor.nationality,
    points: Number(s.points),
    wins: Number(s.wins),
    url: s.Constructor.url,
    gap: leaderPoints - Number(s.points), // lidere puan farkı
  }));
}
