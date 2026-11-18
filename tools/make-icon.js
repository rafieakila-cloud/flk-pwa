'use strict';
/* Generator ikon FLK — segel fakultas: lingkaran oxblood, bintang emas, huruf FLK */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const OUT = path.join(__dirname, '..', 'icons');
fs.mkdirSync(OUT, { recursive: true });

function render(size, maskable) {
  const S = 4, W = size * S;
  const buf = new Float64Array(W * W * 4);
  const px = (x, y, r, g, b, a) => {
    const ix = Math.floor(x), iy = Math.floor(y);
    if (ix < 0 || iy < 0 || ix >= W || iy >= W) return;
    const o = (iy * W + ix) * 4;
    const na = a + buf[o + 3] * (1 - a);
    buf[o] = (r * a + buf[o] * buf[o + 3] * (1 - a)) / na;
    buf[o + 1] = (g * a + buf[o + 1] * buf[o + 3] * (1 - a)) / na;
    buf[o + 2] = (b * a + buf[o + 2] * buf[o + 3] * (1 - a)) / na;
    buf[o + 3] = na;
  };
  const k = W / 100;
  const OXBLOOD = [53, 16, 26, 1];
  const OXBLOOD_2 = [74, 21, 32, 1];
  const GOLD = [201, 162, 39, 1];
  const GOLD_MUDA = [229, 198, 90, 1];

  const circle = (cx, cy, r, col) => {
    const [cr, cg, cb, ca] = col;
    const R = r * k;
    for (let y = Math.floor((cy - r) * k); y <= Math.ceil((cy + r) * k); y++) for (let x = Math.floor((cx - r) * k); x <= Math.ceil((cx + r) * k); x++) {
      const d = Math.hypot((x + 0.5) / k - cx, (y + 0.5) / k - cy);
      const aa = Math.min(1, Math.max(0, (r - d) * 2 + 0.5));
      if (aa > 0) px(x, y, cr, cg, cb, ca * aa);
    }
  };
  const ring = (cx, cy, r, w, col) => {
    const [cr, cg, cb, ca] = col;
    const half = w / 2;
    for (let y = Math.floor((cy - r - half) * k); y <= Math.ceil((cy + r + half) * k); y++) for (let x = Math.floor((cx - r - half) * k); x <= Math.ceil((cx + r + half) * k); x++) {
      const d = Math.hypot((x + 0.5) / k - cx, (y + 0.5) / k - cy);
      const aa = Math.min(1, Math.max(0, (half - Math.abs(d - r)) * 2 + 0.5));
      if (aa > 0) px(x, y, cr, cg, cb, ca * aa);
    }
  };
  const poly = (pts, col) => {
    const [cr, cg, cb, ca] = col;
    const minY = Math.min(...pts.map(p => p[1])) * k, maxY = Math.max(...pts.map(p => p[1])) * k;
    for (let y = Math.floor(minY); y <= Math.ceil(maxY); y++) {
      const xs = [];
      for (let i = 0; i < pts.length; i++) {
        const [x1, y1] = pts[i], [x2, y2] = pts[(i + 1) % pts.length];
        const yy = y / k;
        if ((y1 <= yy && y2 > yy) || (y2 <= yy && y1 > yy)) xs.push(x1 + (x2 - x1) * (yy - y1) / (y2 - y1));
      }
      xs.sort((a, b) => a - b);
      for (let i = 0; i + 1 < xs.length; i += 2) {
        for (let x = Math.floor(xs[i] * k); x <= Math.ceil(xs[i + 1] * k); x++) {
          const aa = Math.min(1, Math.max(0, Math.min(xs[i + 1] - (x + 0.5) / k + 0.5, (x + 0.5) / k - xs[i] + 0.5) * 2));
          if (aa > 0) px(x, y, cr, cg, cb, ca * aa);
        }
      }
    }
  };
  const seg = (x0, y0, x1, y1, w, col) => {
    const [cr, cg, cb, ca] = col;
    const len = Math.hypot(x1 - x0, y1 - y0), steps = Math.ceil(len * k * 2.5);
    for (let i = 0; i <= steps; i++) {
      const t = i / steps, x = (x0 + (x1 - x0) * t) * k, y = (y0 + (y1 - y0) * t) * k, rad = (w / 2) * k;
      for (let dy = Math.floor(y - rad - 1); dy <= Math.ceil(y + rad + 1); dy++) for (let dx = Math.floor(x - rad - 1); dx <= Math.ceil(x + rad + 1); dx++) {
        const d = Math.hypot(dx + 0.5 - x, dy + 0.5 - y);
        const aa = Math.min(1, Math.max(0, (rad - d) * 2 + 0.5));
        if (aa > 0) px(dx, dy, cr, cg, cb, ca * aa);
      }
    }
  };

  // latar maskable = oxblood penuh; biasa = transparan
  if (maskable) { for (let y = 0; y < W; y++) for (let x = 0; x < W; x++) px(x, y, OXBLOOD[0], OXBLOOD[1], OXBLOOD[2], 1); }

  const inset = maskable ? 14 : 2;           // zona aman maskable
  const c = 50, R = 50 - inset;
  circle(c, c, R, OXBLOOD_2);
  ring(c, c, R - 1.6, 4.6, GOLD);
  ring(c, c, R - 8.5, 1.6, GOLD);

  // bintang 5 sudut di atas
  const star = (cx, cy, rO, rI, col) => {
    const pts = [];
    for (let i = 0; i < 10; i++) {
      const r = i % 2 === 0 ? rO : rI;
      const a = (Math.PI / 5) * i - Math.PI / 2;
      pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
    }
    poly(pts, col);
  };
  star(50, 27, 6.4, 2.7, GOLD);

  // huruf F L K (tebal, geometrik)
  const ty = 66, h = 15, w = 2.6;
  // F
  seg(25, ty - h, 25, ty, w, GOLD); seg(25, ty - h, 34.5, ty - h, w, GOLD); seg(25, ty - h / 2, 32.5, ty - h / 2, w, GOLD);
  // L
  seg(43, ty - h, 43, ty, w, GOLD); seg(43, ty, 52.5, ty, w, GOLD);
  // K
  seg(61, ty - h, 61, ty, w, GOLD); seg(61, ty - h * 0.42, 68.5, ty - h, w, GOLD); seg(61, ty - h * 0.58, 68.5, ty, w, GOLD);

  const out = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    let r = 0, g = 0, b = 0, a = 0;
    for (let dy = 0; dy < S; dy++) for (let dx = 0; dx < S; dx++) {
      const o = ((y * S + dy) * W + (x * S + dx)) * 4;
      r += buf[o]; g += buf[o + 1]; b += buf[o + 2]; a += buf[o + 3];
    }
    const n = S * S, o = (y * size + x) * 4;
    out[o] = Math.round(r / n); out[o + 1] = Math.round(g / n); out[o + 2] = Math.round(b / n); out[o + 3] = Math.round((a / n) * 255);
  }
  return out;
}

const crcTable = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
const crc32 = (buf) => { let c = 0xffffffff; for (let i = 0; i < buf.length; i++) c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
const chunk = (type, data) => { const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const body = Buffer.concat([Buffer.from(type), data]); const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(body)); return Buffer.concat([len, body, crc]); };
function encodePng(rgba, size) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0); ihdr.writeUInt32BE(size, 4); ihdr[8] = 8; ihdr[9] = 6;
  const raw = Buffer.alloc(size * (size * 4 + 1));
  for (let y = 0; y < size; y++) { raw[y * (size * 4 + 1)] = 0; Buffer.from(rgba.buffer, y * size * 4, size * 4).copy(raw, y * (size * 4 + 1) + 1); }
  return Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
}

for (const size of [192, 512]) {
  fs.writeFileSync(path.join(OUT, `icon-${size}.png`), encodePng(Buffer.from(render(size, false).buffer), size));
}
fs.writeFileSync(path.join(OUT, 'icon-maskable-512.png'), encodePng(Buffer.from(render(512, true).buffer), 512));
console.log('ikon FLK selesai ditulis ke', OUT);
