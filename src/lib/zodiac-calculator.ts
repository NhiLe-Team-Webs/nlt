/**
 * zodiac-calculator.ts
 * Pure astronomical calculations for zodiac signs and numerology.
 * Algorithms based on Jean Meeus "Astronomical Algorithms" (simplified).
 * All calculations are client-side — no external API required.
 */

const ZODIAC_VI = [
  "Bạch Dương", "Kim Ngưu", "Song Tử", "Cự Giải",
  "Sư Tử", "Xử Nữ", "Thiên Bình", "Bọ Cạp",
  "Nhân Mã", "Ma Kết", "Bảo Bình", "Song Ngư",
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Convert calendar date + decimal UT hours to Julian Day Number */
function toJD(year: number, month: number, day: number, utHour = 12): number {
  if (month <= 2) { year--; month += 12; }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716))
    + Math.floor(30.6001 * (month + 1))
    + day + utHour / 24 + B - 1524.5;
}

/** Reduce degrees to [0, 360) */
const norm360 = (d: number) => ((d % 360) + 360) % 360;

const DEG = Math.PI / 180;

// ─── Sun Sign ─────────────────────────────────────────────────────────────────

/**
 * Returns the Sun sign (cung Sun) from a birth date string (YYYY-MM-DD).
 * Uses standard tropical astrology boundaries.
 */
export function getSunSign(dateStr: string): string {
  const d = new Date(dateStr);
  const m = d.getMonth() + 1; // 1-12
  const day = d.getDate();

  if ((m === 3 && day >= 21) || (m === 4 && day <= 19)) return "Bạch Dương";
  if ((m === 4 && day >= 20) || (m === 5 && day <= 20)) return "Kim Ngưu";
  if ((m === 5 && day >= 21) || (m === 6 && day <= 20)) return "Song Tử";
  if ((m === 6 && day >= 21) || (m === 7 && day <= 22)) return "Cự Giải";
  if ((m === 7 && day >= 23) || (m === 8 && day <= 22)) return "Sư Tử";
  if ((m === 8 && day >= 23) || (m === 9 && day <= 22)) return "Xử Nữ";
  if ((m === 9 && day >= 23) || (m === 10 && day <= 22)) return "Thiên Bình";
  if ((m === 10 && day >= 23) || (m === 11 && day <= 21)) return "Bọ Cạp";
  if ((m === 11 && day >= 22) || (m === 12 && day <= 21)) return "Nhân Mã";
  if ((m === 12 && day >= 22) || (m === 1 && day <= 19)) return "Ma Kết";
  if ((m === 1 && day >= 20) || (m === 2 && day <= 18)) return "Bảo Bình";
  return "Song Ngư"; // Feb 19 – Mar 20
}

// ─── Life Path Number (Số Chủ Đạo) ───────────────────────────────────────────

/**
 * Calculates Life Path Number from birth date (YYYY-MM-DD).
 * Master numbers 11, 22, 33 are preserved.
 */
export function getLifePathNumber(dateStr: string): string {
  // Sum all digits of the date string (digits only)
  let sum = dateStr.replace(/-/g, "").split("").reduce((acc, ch) => acc + Number(ch), 0);

  // Reduce to single digit, preserving master numbers
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = String(sum).split("").reduce((acc, ch) => acc + Number(ch), 0);
  }
  return String(sum);
}

// ─── Pythagorean Numerology (name-based) ─────────────────────────────────────

/** Pythagorean letter-to-number table (base Latin) */
const PYTHAGOREAN: Record<string, number> = {
  a:1, j:1, s:1,
  b:2, k:2, t:2,
  c:3, l:3, u:3,
  d:4, m:4, v:4,
  e:5, n:5, w:5,
  f:6, o:6, x:6,
  g:7, p:7, y:7,
  h:8, q:8, z:8,
  i:9, r:9,
};

/** Map Vietnamese accented characters to their base Latin equivalent */
const VI_TO_BASE: Record<string, string> = {
  à:"a",á:"a",ả:"a",ã:"a",ạ:"a",
  ă:"a",ắ:"a",ặ:"a",ằ:"a",ẳ:"a",ẵ:"a",
  â:"a",ấ:"a",ầ:"a",ẩ:"a",ẫ:"a",ậ:"a",
  è:"e",é:"e",ẻ:"e",ẽ:"e",ẹ:"e",
  ê:"e",ế:"e",ề:"e",ể:"e",ễ:"e",ệ:"e",
  ì:"i",í:"i",ỉ:"i",ĩ:"i",ị:"i",
  ò:"o",ó:"o",ỏ:"o",õ:"o",ọ:"o",
  ô:"o",ố:"o",ồ:"o",ổ:"o",ỗ:"o",ộ:"o",
  ơ:"o",ớ:"o",ờ:"o",ở:"o",ỡ:"o",ợ:"o",
  ù:"u",ú:"u",ủ:"u",ũ:"u",ụ:"u",
  ư:"u",ứ:"u",ừ:"u",ử:"u",ữ:"u",ự:"u",
  ỳ:"y",ý:"y",ỷ:"y",ỹ:"y",ỵ:"y",
  đ:"d",
};

const VOWELS = new Set(["a","e","i","o","u","y"]);

function normalizeChar(ch: string): string {
  return VI_TO_BASE[ch] ?? ch;
}

function reduceNum(n: number): number {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = String(n).split("").reduce((acc, c) => acc + Number(c), 0);
  }
  return n;
}

function letterValue(name: string, vowelsOnly: boolean): number {
  return name.toLowerCase().split("").reduce((acc, ch) => {
    const base = normalizeChar(ch);
    if (vowelsOnly && !VOWELS.has(base)) return acc;
    return acc + (PYTHAGOREAN[base] ?? 0);
  }, 0);
}

/**
 * Soul Urge Number (Số linh hồn): sum of vowel letter values in full name.
 * Returns empty string if name is blank.
 */
export function getSoulUrgeNumber(name: string): string {
  if (!name.trim()) return "";
  const sum = letterValue(name, true);
  return sum === 0 ? "" : String(reduceNum(sum));
}

/**
 * Maturity Number (Số trưởng thành): Life Path + Expression (all letters), reduced.
 * Returns empty string if either input is missing.
 */
export function getMaturityNumber(dateStr: string, name: string): string {
  if (!dateStr || !name.trim()) return "";
  const lp = Number(getLifePathNumber(dateStr));
  const expr = reduceNum(letterValue(name, false));
  return String(reduceNum(lp + expr));
}

// ─── Moon Sign ────────────────────────────────────────────────────────────────

/** Calculate Moon's ecliptic longitude (degrees) from Julian Day */
function moonLongitude(jd: number): number {
  const T = (jd - 2451545.0) / 36525;

  // Fundamental arguments (degrees, then converted to radians for sin/cos)
  const Mp = 134.9633964 + 477198.8675055 * T; // Moon mean anomaly
  const M  = 357.5291092 + 35999.0502909  * T; // Sun mean anomaly
  const F  = 93.2720950  + 483202.0175233 * T; // Moon argument of latitude
  const D  = 297.8501921 + 445267.1114034 * T; // Moon mean elongation

  // Simplified series (largest terms from Meeus Ch.47)
  const lon =
    (218.3164477 + 481267.88123421 * T)
    + 6.288774 * Math.sin(Mp * DEG)
    + 1.274027 * Math.sin((2 * D - Mp) * DEG)
    + 0.658314 * Math.sin(2 * D * DEG)
    + 0.213618 * Math.sin(2 * Mp * DEG)
    - 0.185116 * Math.sin(M * DEG)
    - 0.114332 * Math.sin(2 * F * DEG)
    + 0.058793 * Math.sin((2 * D - 2 * Mp) * DEG)
    + 0.057066 * Math.sin((2 * D - M - Mp) * DEG)
    + 0.053322 * Math.sin((2 * D + Mp) * DEG)
    + 0.045758 * Math.sin((2 * D - M) * DEG)
    - 0.040923 * Math.sin((M - Mp) * DEG)
    - 0.034720 * Math.sin(D * DEG)
    - 0.030383 * Math.sin((M + Mp) * DEG);

  return norm360(lon);
}

/**
 * Returns Moon sign (cung Moon) from birth date + time.
 * @param dateStr   YYYY-MM-DD
 * @param timeStr   HH:MM (local time)
 * @param utcOffset UTC offset in hours (e.g. +7 for Vietnam)
 */
export function getMoonSign(dateStr: string, timeStr: string, utcOffset = 7): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const [h, m] = timeStr.split(":").map(Number);
  const utHour = h + m / 60 - utcOffset; // convert to UT
  const jd = toJD(year, month, day, utHour);
  return ZODIAC_VI[Math.floor(moonLongitude(jd) / 30)];
}

// ─── Ascendant (Cung Mọc) ─────────────────────────────────────────────────────

/**
 * Returns Ascendant sign (cung Mọc) from birth date, time and geographic coordinates.
 * @param dateStr   YYYY-MM-DD
 * @param timeStr   HH:MM (local time)
 * @param lat       Latitude in degrees (north positive)
 * @param lng       Longitude in degrees (east positive)
 * @param utcOffset UTC offset in hours
 */
export function getAscendantSign(
  dateStr: string,
  timeStr: string,
  lat: number,
  lng: number,
  utcOffset = 7,
): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const [h, m] = timeStr.split(":").map(Number);
  const utHour = h + m / 60 - utcOffset;
  const jd = toJD(year, month, day, utHour);

  const T = (jd - 2451545.0) / 36525;

  // Greenwich Mean Sidereal Time (degrees)
  const GMST = norm360(280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T);
  // Local Sidereal Time
  const LST = norm360(GMST + lng);
  // Obliquity of ecliptic
  const eps = 23.4392911 - 0.013004167 * T;

  // Standard ascendant formula
  const y = -Math.cos(LST * DEG);
  const x = Math.sin(LST * DEG) * Math.cos(eps * DEG) + Math.tan(lat * DEG) * Math.sin(eps * DEG);
  const asc = norm360(Math.atan2(y, x) / DEG);

  return ZODIAC_VI[Math.floor(asc / 30)];
}
