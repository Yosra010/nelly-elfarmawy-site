// تحميل سورة (API)
async function loadSurah() {
  let id = document.getElementById("surahSelect").value;

  // الآيات
  let res1 = await fetch(`https://api.alquran.cloud/v1/surah/${id}`);
  let data1 = await res1.json();

  // التفسير (السعدي)
  let res2 = await fetch(`https://api.alquran.cloud/v1/surah/${id}/ar.muyassar`);
  let data2 = await res2.json();

  let ayat = data1.data.ayahs;
  let tafsir = data2.data.ayahs;

  let html = ayat.map((a, i) => `
    <div class="ayah">
      <p>${a.text}</p>

      <button onclick="playAyah('${a.audio}')">▶️</button>

      <div class="tafsir">
        📖 ${tafsir[i].text}
      </div>
    </div>
  `).join("");

  document.getElementById("quranText").innerHTML = html;
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
