// تحميل سورة (API)
async function loadSurah() {
  let id = document.getElementById("surahSelect").value;

  let res = await fetch(`https://api.alquran.cloud/v1/surah/${id}`);
  let data = await res.json();

  let text = data.data.ayahs.map(a => a.text).join("<br>");

  document.getElementById("quranText").innerHTML = text;

  // صوت السورة (Mishary)
  document.getElementById("audioPlayer").src =
    `https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/${id.padStart(3,'0')}.mp3`;
}

// أوقات الصلاة
fetch("https://api.aladhan.com/v1/timingsByCity?city=Alexandria&country=EG")
.then(res => res.json())
.then(data => {
  let t = data.data.timings;
  document.getElementById("prayerTimes").innerHTML =
    `الفجر: ${t.Fajr} <br> الظهر: ${t.Dhuhr} <br> العصر: ${t.Asr} <br> المغرب: ${t.Maghrib} <br> العشاء: ${t.Isha}`;
});

// بحث بسيط (تجريبي)
function searchQuran() {
  let word = document.getElementById("searchBox").value;
  document.getElementById("searchResult").innerText =
    "سيتم تطوير البحث الحقيقي قريبًا: " + word;
}

// تشغيل أولي
loadSurah();