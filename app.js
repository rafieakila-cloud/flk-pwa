'use strict';

/* =====================================================================
   FLK — Fakultas Lisensi Kreatif
   ===================================================================== */

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const escapeHtml = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* ============ SEAL (lambang fakultas, digambar SVG) ============ */
function sealSvg(size, initials, warna) {
  const w = warna || '#c9a227';
  const label = (initials || 'FLK').slice(0, 3).toUpperCase();
  return `<svg width="${size}" height="${size}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Segel FLK">
    <circle cx="50" cy="50" r="47" fill="#35101a" stroke="${w}" stroke-width="3.5"/>
    <circle cx="50" cy="50" r="38.5" fill="none" stroke="${w}" stroke-width="1.4" stroke-dasharray="2.6 3.1"/>
    <path d="M50 15l3.1 6.4 7.1.9-5.3 4.9 1.4 7-6.3-3.6-6.3 3.6 1.4-7-5.3-4.9 7.1-.9L50 15z" fill="${w}"/>
    <text x="50" y="66" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="23" font-weight="700" letter-spacing="3" fill="${w}">${escapeHtml(label)}</text>
    <text x="50" y="79.5" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="5.4" letter-spacing="2.1" fill="${w}">FAKULTAS</text>
  </svg>`;
}
const sealHTML = (size, initials, warna) => sealSvg(size, initials, warna);

/* ============ KARAKTER KANON ============ */
const KARAKTER = [
  {
    id: 'rajawali-revisi', nama: 'Rajawali Revisi', fakultas: 'Fakultas Sastra & Koding',
    warna: '#c9a227', sifat: 'Copyleft',
    arti: 'Elang pembelajar: karyamu boleh diambil, diubah, dan ditulis ulang — asal yang terbitan terbuka juga.',
    aturan: [
      'Karya ini dirilis di bawah Lisensi FLK — Rajawali Revisi (v1.0).',
      'Siapa pun bebas menggunakan, mempelajari, mengubah, dan menyebarkan karya ini, termasuk untuk tujuan komersial.',
      'Setiap turunan WAJIB didistribusikan di bawah lisensi ini juga, dengan menyertakan kode/sumber lengkap yang mudah dibaca.',
      'Pemberitahuan hak cipta asli dan nama pembuat wajib dilestarikan dan tidak boleh dihapus.',
      'Dilarang menambahkan batasan yang mengurangi kebebasan lisensi ini.',
    ],
    syarat: [
      'Saya bersedia karya ini — dan seluruh turunannya — tetap terbuka dan open source.',
      'Saya akan menyertakan teks lisensi ini apa adanya di dalam karya saya.',
      'Saya tidak akan mengklaim seluruh karya sebagai milik saya tanpa menyebut pembuat asli.',
      'Saya mengizinkan siapa pun, termasuk pihak komersial, memakai karya ini selama syarat di atas terpenuhi.',
    ],
  },
  {
    id: 'kijang-karya', nama: 'Kijang Karya', fakultas: 'Fakultas Karya Bebas',
    warna: '#7fb069', sifat: 'Permisif',
    arti: 'Kijang yang ringan kaki: lisensi paling sederhana — pakai untuk apa pun, cukup sebut namanya.',
    aturan: [
      'Karya ini dirilis di bawah Lisensi FLK — Kijang Karya (v1.0).',
      'Siapa pun bebas menggunakan, menyalin, mengubah, dan menyebarkan karya ini untuk tujuan apa pun.',
      'Satu-satunya kewajiban: cantumkan nama "Kijang Karya FLK" atau nama pembuat asli pada karya.',
      'Karya disediakan apa adanya, tanpa jaminan dalam bentuk apa pun.',
    ],
    syarat: [
      'Saya akan menyebut nama Kijang Karya / pembuat asli di karya saya.',
      'Saya memahami lisensi ini tidak memberikan jaminan hukum apa pun.',
      'Saya tidak keberatan karya ini dipakai secara komersial oleh siapa pun.',
    ],
  },
  {
    id: 'kura-kura-komunal', nama: 'Kura-Kura Komunal', fakultas: 'Fakultas Komunitas',
    warna: '#5b8c5a', sifat: 'Copyleft',
    arti: 'Kura-kura komunal: karya untuk semua orang, tidak boleh jadi komoditas.',
    aturan: [
      'Karya ini dirilis di bawah Lisensi FLK — Kura-Kura Komunal (v1.0).',
      'Kamu bebas memakai, mempelajari, dan menyebarkan karya ini untuk tujuan non-komersial.',
      'Karya ini DILARANG dijual atau dijadikan produk berbayar.',
      'Biaya sukarela (donasi) diperbolehkan sepanjang tidak bersifat wajib.',
      'Turunan wajib dibagikan dengan lisensi yang sama.',
    ],
    syarat: [
      'Saya tidak akan menjual karya ini atau turunannya.',
      'Saya akan membagikan turunan di bawah lisensi ini juga.',
      'Saya rela karya ini menjadi milik bersama komunitas.',
    ],
  },
  {
    id: 'burung-beo', nama: 'Burung Beo', fakultas: 'Fakultas Parodi & Adaptasi',
    warna: '#4ea8de', sifat: 'Permisif',
    arti: 'Beo peniru: boleh meniru, memparodi, dan mengadaptasi — asalkan selalu menyebut suara aslinya.',
    aturan: [
      'Karya ini dirilis di bawah Lisensi FLK — Burung Beo (v1.0).',
      'Karya ini boleh ditiru, diparodi, diadaptasi, dan dijadikan bahan turunan apa pun.',
      'Setiap penggunaan WAJIB menyebut nama karya asli dan pembuat aslinya.',
      'Dilarang mengklaim tiruan/parodi sebagai karya yang sepenuhnya orisinal tanpa atribusi.',
    ],
    syarat: [
      'Saya akan selalu menyebut nama karya asli dan pembuatnya saat menirunya.',
      'Saya tidak akan menjual hasil tiruan tanpa atribusi yang jelas.',
      'Saya mengerti parodi saya bukan karya asli saya.',
    ],
  },
  {
    id: 'merak-mahakarya', nama: 'Merak Mahakarya', fakultas: 'Fakultas Karya Agung',
    warna: '#b76e79', sifat: 'Komersial Terbatas',
    arti: 'Merak yang indah: mengagumi boleh gratis, memonetisasi butuh izin tertulis.',
    aturan: [
      'Karya ini dirilis di bawah Lisensi FLK — Merak Mahakarya (v1.0).',
      'Karya ini bebas dikagumi, dipelajari, dan dibagikan untuk tujuan non-komersial dengan atribusi.',
      'Penggunaan komersial WAJIB mendapat izin tertulis dari pemegang hak cipta.',
      'Atribusi wajib dicantumkan dalam segala bentuk penggunaan.',
    ],
    syarat: [
      'Saya paham karya ini TIDAK boleh saya pakai untuk menghasilkan uang tanpa izin tertulis.',
      'Saya akan selalu mencantumkan atribusi.',
      'Saya bersedia mengajukan izin tertulis bila suatu hari ingin memakainya secara komersial.',
    ],
  },
  {
    id: 'elang-estetika', nama: 'Elang Estetika', fakultas: 'Fakultas Seni Rupa',
    warna: '#e07a5f', sifat: 'Copyleft',
    arti: 'Elang penjaga makna: karya seni boleh dihayati dan dibagikan, tapi pesannya tidak boleh diputar balik.',
    aturan: [
      'Karya ini dirilis di bawah Lisensi FLK — Elang Estetika (v1.0).',
      'Karya ini bebas dibagikan dan ditampilkan untuk tujuan non-komersial dengan atribusi.',
      'Makna, pesan, dan konteks asli karya DILARANG diubah atau diputarbalikkan.',
      'Atribusi pembuat asli wajib dicantumkan dalam segala bentuk pameran atau publikasi.',
    ],
    syarat: [
      'Saya tidak akan memutarbalikkan makna atau pesan karya ini.',
      'Saya akan mencantumkan nama pembuat asli saat menampilkan karya ini.',
      'Saya tidak akan menjual karya ini tanpa izin.',
    ],
  },
];

/* ============ STATE & STORAGE ============ */
const state = {
  karakterTerpilih: null,
  sheetChecklist: [],
  arsip: [],
  custom: [],
};
const loadStore = () => {
  try { state.arsip = JSON.parse(localStorage.getItem('flk_arsip') || '[]'); } catch { state.arsip = []; }
  try { state.custom = JSON.parse(localStorage.getItem('flk_custom') || '[]'); } catch { state.custom = []; }
};
const saveArsip = () => localStorage.setItem('flk_arsip', JSON.stringify(state.arsip));
const saveCustom = () => localStorage.setItem('flk_custom', JSON.stringify(state.custom));
const semuaKarakter = () => [...KARAKTER, ...state.custom];

/* ============ ROUTER ============ */
const VIEWS = { home: 'view-home', galeri: 'view-galeri', terbit: 'view-terbit', arsip: 'view-arsip', buat: 'view-buat' };
function pindah(route) {
  const r = VIEWS[route] ? route : 'home';
  Object.entries(VIEWS).forEach(([k, id]) => $('#' + id).classList.toggle('hidden', k !== r));
  $$('.nav a').forEach(a => a.classList.toggle('aktif', a.dataset.nav === r));
  window.scrollTo(0, 0);
  if (r === 'galeri') renderGaleri();
  if (r === 'terbit') renderWs1();
  if (r === 'arsip') renderArsip();
}
window.addEventListener('hashchange', () => pindah((location.hash || '#/').slice(2)));

/* ============ GALERI ============ */
function renderGaleri() {
  $('#galeri-grid').innerHTML = semuaKarakter().map(k => `
    <button class="kartu-karakter${k.custom ? ' custom' : ''}" data-id="${escapeHtml(k.id)}">
      <div class="kk-top">
        <span class="kk-emblem">${sealHTML(72, k.nama.split(' ').map(w => w[0]).slice(0, 3).join(''), k.warna)}</span>
        <span><div class="kk-nama">${escapeHtml(k.nama)}</div><div class="kk-fakultas">${escapeHtml(k.fakultas)}</div></span>
      </div>
      <div class="kk-arti">&ldquo;${escapeHtml(k.arti)}&rdquo;</div>
      <span class="kk-sifat">${escapeHtml(k.sifat)}</span>
    </button>`).join('');
}
$('#galeri-grid').addEventListener('click', (e) => {
  const btn = e.target.closest('.kartu-karakter');
  if (btn) {
    state.karakterTerpilih = btn.dataset.id;
    location.hash = '#/terbit';
  }
});

/* ============ WIZARD ============ */
function wsKarakter() { return semuaKarakter().find(k => k.id === state.karakterTerpilih) || null; }
function renderWs1() {
  $('#ws-1').classList.remove('hidden');
  $('#ws-2').classList.add('hidden');
  $('#ws-3').classList.add('hidden');
  $('#ws-result').classList.add('hidden');
  $('#ws-karakter').innerHTML = semuaKarakter().map(k => `
    <button class="ws-kartu${k.id === state.karakterTerpilih ? ' terpilih' : ''}" data-id="${escapeHtml(k.id)}">
      ${sealHTML(56, k.nama.split(' ').map(w => w[0]).slice(0, 3).join(''), k.warna)}
      <span><div class="ws-kartu-nama">${escapeHtml(k.nama)}</div><div class="ws-kartu-sifat">${escapeHtml(k.sifat)} · ${escapeHtml(k.fakultas)}</div></span>
    </button>`).join('');
}
$('#ws-karakter').addEventListener('click', (e) => {
  const btn = e.target.closest('.ws-kartu');
  if (!btn) return;
  state.karakterTerpilih = btn.dataset.id;
  renderWs1();
  bukaWs2();
});
function bukaWs2() {
  const k = wsKarakter();
  if (!k) return;
  $('#ws-1').classList.add('hidden');
  $('#ws-2').classList.remove('hidden');
  $('#ws-3').classList.add('hidden');
  $('#ws-result').classList.add('hidden');
  $('#ws-2-nama').textContent = k.nama;
  state.sheetChecklist = k.syarat.map(() => false);
  renderSyarat();
}
function renderSyarat() {
  const k = wsKarakter();
  $('#ws-syarat').innerHTML = k.syarat.map((s, i) => `
    <label class="syarat-item${state.sheetChecklist[i] ? ' tercentang' : ''}">
      <input type="checkbox" data-i="${i}" ${state.sheetChecklist[i] ? 'checked' : ''}>
      <span>${escapeHtml(s)}</span>
    </label>`).join('');
  $('#ws-next-2').disabled = !state.sheetChecklist.every(Boolean);
}
$('#ws-syarat').addEventListener('change', (e) => {
  const cb = e.target.closest('input[type="checkbox"]');
  if (!cb) return;
  state.sheetChecklist[Number(cb.dataset.i)] = cb.checked;
  renderSyarat();
});
$('#ws-back-1').addEventListener('click', renderWs1);
$('#ws-next-2').addEventListener('click', () => {
  $('#ws-2').classList.add('hidden');
  $('#ws-3').classList.remove('hidden');
  $('#f-pendaftar').focus();
});
$('#ws-back-2').addEventListener('click', bukaWs2);

/* ============ PENERBITAN ============ */
function nomorRegistrasi() {
  const n = (parseInt(localStorage.getItem('flk_counter') || '0', 10) || 0) + 1;
  localStorage.setItem('flk_counter', String(n));
  return 'FLK-2026-' + String(n).padStart(4, '0');
}
function teksLisensi(k, pendaftar, judul, tahun, no) {
  return [
    `${no}`,
    `"${judul}" — ${pendaftar}, ${tahun}`,
    `Diterbitkan oleh FLK — Fakultas Lisensi Kreatif, di bawah Lisensi FLK — ${k.nama} (v1.0).`,
    ``,
    ...k.aturan,
    ``,
    `Atribusi: ${pendaftar} · ${tahun} · Lisensi FLK — ${k.nama}`,
    `Fakultas Lisensi Kreatif — lisensi sebagai penghormatan, bukan belenggu.`,
  ].join('\n');
}
function badgeSvgDataUri(k, no) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="340" height="96" viewBox="0 0 340 96"><rect x="2" y="2" width="336" height="92" rx="6" fill="#35101a" stroke="#c9a227" stroke-width="3"/><circle cx="46" cy="48" r="30" fill="#c9a227"/><path d="M46 27l4.7 9.6 10.6 1.3-7.8 7.3 2 10.5L46 53.3l-9.5 5.4 2-10.5-7.8-7.3 10.6-1.3L46 27z" fill="#35101a"/><text x="96" y="40" font-family="Georgia, serif" font-size="11" fill="#c9a227" letter-spacing="2">LISENSI FLK TERBIT</text><text x="96" y="60" font-family="Georgia, serif" font-size="17" font-weight="bold" fill="#f4ecdd">${escapeHtml(k.nama.toUpperCase())}</text><text x="96" y="76" font-family="'Courier New', monospace" font-size="9" fill="#c9a227">${escapeHtml(no)}</text></svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}
$('#ws-terbit').addEventListener('click', () => {
  const k = wsKarakter();
  const pendaftar = $('#f-pendaftar').value.trim();
  const judul = $('#f-judul').value.trim();
  const tahun = $('#f-tahun').value.trim() || '2026';
  if (!pendaftar) { showToast('Nama pendaftar wajib diisi.'); return; }
  if (!judul) { showToast('Judul karya wajib diisi.'); return; }

  const no = nomorRegistrasi();
  const teks = teksLisensi(k, pendaftar, judul, tahun, no);
  const item = { no, karakterId: k.id, karakterNama: k.nama, pendaftar, judul, tahun, teks, tanggal: new Date().toISOString() };
  state.arsip.unshift(item);
  saveArsip();

  $('#ws-3').classList.add('hidden');
  $('#ws-result').classList.remove('hidden');
  $('#result-no').textContent = no;
  $('#result-text').textContent = teks;
  $('#result-seal').innerHTML = sealHTML(84, k.nama.split(' ').map(w => w[0]).slice(0, 3).join(''), k.warna);
  $('#result-badge').innerHTML = `<img alt="Badge lisensi ${escapeHtml(no)}" src="${badgeSvgDataUri(k, no)}">`;
  $('#ws-result').scrollIntoView({ behavior: 'smooth' });
});
$('#btn-copy-text').addEventListener('click', () => salin($('#result-text').textContent, 'Teks lisensi tersalin. Tempel di karyamu.'));
$('#btn-copy-md').addEventListener('click', () => {
  const img = $('#result-badge img');
  const md = `[![Lisensi FLK](${img ? img.src : ''})]()\n\n${$('#result-text').textContent}`;
  salin(md, 'Badge + teks lisensi (Markdown) tersalin.');
});
$('#btn-download').addEventListener('click', () => {
  const blob = new Blob([$('#result-text').textContent], { type: 'text/plain;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'lisensi-flk.txt';
  a.click();
  URL.revokeObjectURL(a.href);
});
$('#ws-lagi').addEventListener('click', () => { state.karakterTerpilih = null; renderWs1(); });

function salin(teks, pesan) {
  const done = () => showToast(pesan);
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(teks).then(done, done);
  else {
    const ta = document.createElement('textarea');
    ta.value = teks; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch {}
    document.body.removeChild(ta); done();
  }
}

/* ============ ARSIP ============ */
function renderArsip() {
  const list = $('#arsip-list');
  $('#arsip-empty').classList.toggle('hidden', state.arsip.length !== 0);
  if (!state.arsip.length) { list.innerHTML = ''; return; }
  list.innerHTML = state.arsip.map(item => `
    <article class="arsip-item">
      <div class="arsip-kode">${escapeHtml(item.no)} · ${new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
      <div class="arsip-judul">${escapeHtml(item.judul)}</div>
      <div class="arsip-meta">Lisensi FLK — ${escapeHtml(item.karakterNama)} · Pendaftar: ${escapeHtml(item.pendaftar)} · ${escapeHtml(item.tahun)}</div>
      <div class="arsip-aksi">
        <button class="klik" data-act="copy" data-no="${escapeHtml(item.no)}">Salin Teks</button>
        <button class="klik bahaya" data-act="hapus" data-no="${escapeHtml(item.no)}">Hapus</button>
      </div>
    </article>`).join('');
}
$('#arsip-list').addEventListener('click', (e) => {
  const btn = e.target.closest('.klik');
  if (!btn) return;
  const item = state.arsip.find(a => a.no === btn.dataset.no);
  if (!item) return;
  if (btn.dataset.act === 'copy') salin(item.teks, 'Teks lisensi tersalin.');
  else if (btn.dataset.act === 'hapus') {
    state.arsip = state.arsip.filter(a => a.no !== item.no);
    saveArsip(); renderArsip(); showToast('Lisensi dihapus dari arsip.');
  }
});

/* ============ BUAT KARAKTER ============ */
$('#c-simpan').addEventListener('click', () => {
  const nama = $('#c-nama').value.trim();
  const fakultas = $('#c-fakultas').value.trim() || 'Fakultas Usulan Warga';
  const sifat = { permisif: 'Permisif', copyleft: 'Copyleft', 'komersial-terbatas': 'Komersial Terbatas' }[$('#c-sifat').value];
  const arti = $('#c-arti').value.trim();
  const aturan = $('#c-aturan').value.split('\n').map(s => s.trim()).filter(Boolean);
  if (!nama) { showToast('Nama karakter wajib diisi.'); return; }
  if (!arti) { showToast('Isi arti & filosofi karakternya.'); return; }
  if (aturan.length < 2) { showToast('Tulis minimal 2 aturan lisensi (satu baris satu aturan).'); return; }

  const id = 'custom-' + Date.now();
  state.custom.push({
    id, nama, fakultas, sifat, arti, aturan,
    syarat: ['Saya telah membaca dan menyetujui seluruh aturan lisensi ini.', 'Saya bersedia teks lisensi ini ditempel di karya saya.', 'Saya paham karya yang terbit tetap milik saya, lisensinya milik publik.'],
    warna: $('#c-warna').value,
    custom: true,
  });
  saveCustom();
  $('#c-nama').value = ''; $('#c-fakultas').value = ''; $('#c-arti').value = ''; $('#c-aturan').value = '';
  showToast('Karakter usulanmu tersimpan & muncul di Galeri.');
  location.hash = '#/galeri';
});

/* ============ TOAST ============ */
function showToast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.add('hidden'), 3400);
}

/* ============ INIT ============ */
$('#seal-top').innerHTML = sealHTML(44, 'FLK', '#c9a227');
$('#seal-hero').innerHTML = sealHTML(190, 'FLK', '#c9a227');
$('#arsip-empty-seal').innerHTML = sealHTML(90, 'FLK', '#a87f1a');
loadStore();
window.addEventListener('hashchange', () => {});
pindah((location.hash || '#/').slice(2));
