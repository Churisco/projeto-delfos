// Background removal that keeps interior highlights:
// - Only removes near-white pixels that are CONNECTED to borders (flood-fill mask)
// - Prevents "rombos" no meio da imagem
// Input: public/images/fundo/delfos_templo.png
// Output: public/images/fundo/delfos_templo_transparent.png

const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const inputPath = path.resolve(__dirname, '..', 'public', 'images', 'fundo', 'delfos_templo.png');
const outputPath = path.resolve(__dirname, '..', 'public', 'images', 'fundo', 'delfos_templo_transparent.png');
const DEBUG = process.argv.includes('--debug') || process.env.DEBUG_IMG === '1';

(async () => {
  try {
    if (!fs.existsSync(inputPath)) {
      console.error('Input image not found at', inputPath);
      process.exit(1);
    }

    const img = sharp(inputPath);
    const { width, height } = await img.metadata();
    const channels = 4;

    // Thresholds
    const bgThr = 242;   // strict background threshold
    const edgeThr = 235; // cleanup threshold near edges

    const raw = await img.ensureAlpha().raw().toBuffer(); // RGBA

    const pxIndex = (x, y) => (y * width + x) * channels;
    const isNearWhite = (r, g, b, thr) => r >= thr && g >= thr && b >= thr;

    // Flood-fill mask starting from borders for near-white pixels
    const mask = new Uint8Array(width * height); // 1 = background to remove
    const queue = [];

    function tryPush(x, y) {
      if (x < 0 || y < 0 || x >= width || y >= height) return;
      const idx = pxIndex(x, y);
      const r = raw[idx], g = raw[idx + 1], b = raw[idx + 2];
      if (!mask[y * width + x] && isNearWhite(r, g, b, bgThr)) {
        mask[y * width + x] = 1;
        queue.push(x, y);
      }
    }

    // Define uma faixa de "barreira" onde o flood-fill não entra (protege as escadas/colunas)
    const barrierRect = {
      x0: Math.floor(width * 0.25),
      x1: Math.ceil(width * 0.75),
      y0: Math.floor(height * 0.76),
      y1: Math.floor(height * 0.88)
    };

    function isInBarrier(x, y) {
      return x >= barrierRect.x0 && x <= barrierRect.x1 && y >= barrierRect.y0 && y <= barrierRect.y1;
    }

    // Semeia bordas (topo + laterais + rodapé) para capturar fundo conectado
    for (let x = 0; x < width; x++) {
      tryPush(x, 0);
      tryPush(x, height - 1);
    }
    for (let y = 0; y < height; y++) {
      tryPush(0, y);
      tryPush(width - 1, y);
    }

    // BFS (4-neighbors is usually enough; 8-neighbors if background has thin gaps)
    while (queue.length) {
      const y = queue.pop();
      const x = queue.pop();
  // Expand 4-neigh, but don't pass through the protected central area
        // Expand 4-neigh, but avoid entering the barrier band
        if (!isInBarrier(x - 1, y)) tryPush(x - 1, y);
        if (!isInBarrier(x + 1, y)) tryPush(x + 1, y);
        if (!isInBarrier(x, y - 1)) tryPush(x, y - 1);
        if (!isInBarrier(x, y + 1)) tryPush(x, y + 1);
    }

    // Apply transparency to masked background
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (mask[y * width + x]) {
          raw[pxIndex(x, y) + 3] = 0; // alpha 0
        }
      }
    }

    // Light edge cleanup: if pixel is near-white and touches a removed pixel, also remove
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = pxIndex(x, y);
        const r = raw[idx], g = raw[idx + 1], b = raw[idx + 2];
        if (!isNearWhite(r, g, b, edgeThr)) continue;
        // Check 8-neighbors for mask or transparent alpha
        let touchBg = false;
        for (let dy = -1; dy <= 1 && !touchBg; dy++) {
          for (let dx = -1; dx <= 1 && !touchBg; dx++) {
            if (dx === 0 && dy === 0) continue;
            const m = mask[(y + dy) * width + (x + dx)];
            const a = raw[pxIndex(x + dx, y + dy) + 3];
            if (m || a === 0) touchBg = true;
          }
        }
        if (touchBg) raw[idx + 3] = 0;
      }
    }

    // Manual cleanup: small elliptical patch below the stairs center to remove leftover piece
  const cx = Math.floor(width * 0.5);
  const cy = Math.floor(height * 0.945); // slightly lower (more near bottom)
  const rx = Math.floor(width * 0.20);   // a bit wider to catch the full arc
  const ry = Math.floor(height * 0.045); // a bit taller
  const thrPatch = 247; // slightly stricter threshold
    for (let y = Math.max(0, cy - ry); y <= Math.min(height - 1, cy + ry); y++) {
      for (let x = Math.max(0, cx - rx); x <= Math.min(width - 1, cx + rx); x++) {
        const nx = (x - cx) / rx;
        const ny = (y - cy) / ry;
        if (nx * nx + ny * ny <= 1) {
          const idx = pxIndex(x, y);
          const r = raw[idx], g = raw[idx + 1], b = raw[idx + 2];
          if (isNearWhite(r, g, b, thrPatch)) {
            raw[idx + 3] = 0;
          }
        }
      }
    }

  // Bottom strip cleanup: expande levemente para cima para remover listras abaixo do último degrau
  const stripY0 = Math.floor(height * 0.895);
  const stripThr = 246;
    for (let y = stripY0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = pxIndex(x, y);
        const r = raw[idx], g = raw[idx + 1], b = raw[idx + 2];
        if (isNearWhite(r, g, b, stripThr)) raw[idx + 3] = 0;
      }
    }

    // Restore stairs (fill small gaps): bring back opacity in three thin central ellipses
    function restoreEllipse(cx, cy, rx, ry) {
      for (let y = Math.max(0, cy - ry); y <= Math.min(height - 1, cy + ry); y++) {
        for (let x = Math.max(0, cx - rx); x <= Math.min(width - 1, cx + rx); x++) {
          const nx = (x - cx) / rx;
          const ny = (y - cy) / ry;
          if (nx * nx + ny * ny <= 1) {
            const idx = pxIndex(x, y);
            // Only restore where currently transparent to avoid changing valid edges
            if (raw[idx + 3] === 0) raw[idx + 3] = 255;
          }
        }
      }
    }

    const cxR = Math.floor(width * 0.5);
  // Extra: complete the uppermost step just below the platform (moved slightly upward)
  restoreEllipse(cxR, Math.floor(height * 0.780), Math.floor(width * 0.172), Math.floor(height * 0.010));
  restoreEllipse(cxR, Math.floor(height * 0.794), Math.floor(width * 0.182), Math.floor(height * 0.012));
    restoreEllipse(cxR, Math.floor(height * 0.835), Math.floor(width * 0.20), Math.floor(height * 0.013));
    restoreEllipse(cxR, Math.floor(height * 0.865), Math.floor(width * 0.22), Math.floor(height * 0.014));

    // Remove small white chunk below the last step (targeted removal ellipse)
    (function removeEllipse(cx, cy, rx, ry, thr = 246) {
      for (let y = Math.max(0, cy - ry); y <= Math.min(height - 1, cy + ry); y++) {
        for (let x = Math.max(0, cx - rx); x <= Math.min(width - 1, cx + rx); x++) {
          const nx = (x - cx) / rx;
          const ny = (y - cy) / ry;
          if (nx * nx + ny * ny <= 1) {
            const idx = pxIndex(x, y);
            const r = raw[idx], g = raw[idx + 1], b = raw[idx + 2];
            if (isNearWhite(r, g, b, thr)) raw[idx + 3] = 0;
          }
        }
      }
    })(cxR, Math.floor(height * 0.920), Math.floor(width * 0.21), Math.floor(height * 0.018), 245);

    // Scanline fill across the stairs band: for each row, fill between first and last opaque pixel
  const stairsY0 = Math.floor(height * 0.770);
  const stairsY1 = Math.floor(height * 0.90);
    for (let y = stairsY0; y <= stairsY1; y++) {
      let left = -1;
      let right = -1;
      const rowBase = y * width * channels;
      // find first opaque
      for (let x = 0; x < width; x++) {
        const a = raw[rowBase + x * channels + 3];
        if (a > 128) { left = x; break; }
      }
      if (left === -1) continue; // nothing on this row
      // find last opaque
      for (let x = width - 1; x >= 0; x--) {
        const a = raw[rowBase + x * channels + 3];
        if (a > 128) { right = x; break; }
      }
      if (right > left) {
        for (let x = left; x <= right; x++) {
          raw[rowBase + x * channels + 3] = 255;
        }
      }
    }

    // Feather no topo das escadas para uma borda mais suave
    function featherBand(y0, y1, passes = 1) {
      const buf = Buffer.alloc((y1 - y0 + 1) * width);
      for (let p = 0; p < passes; p++) {
        // copy band alphas to buf
        for (let y = y0; y <= y1; y++) {
          const row = (y - y0) * width;
          for (let x = 0; x < width; x++) {
            buf[row + x] = raw[pxIndex(x, y) + 3];
          }
        }
        for (let y = y0 + 1; y <= y1 - 1; y++) {
          for (let x = 1; x < width - 1; x++) {
            const idx = pxIndex(x, y) + 3;
            const a = raw[idx];
            const row = (y - y0) * width;
            const minN = Math.min(
              buf[row + x], buf[row + x - 1], buf[row + x + 1],
              buf[row - width + x], buf[row - width + x - 1], buf[row - width + x + 1],
              buf[row + width + x], buf[row + width + x - 1], buf[row + width + x + 1]
            );
            const maxN = Math.max(
              buf[row + x], buf[row + x - 1], buf[row + x + 1],
              buf[row - width + x], buf[row - width + x - 1], buf[row - width + x + 1],
              buf[row + width + x], buf[row + width + x - 1], buf[row + width + x + 1]
            );
            // Only smooth near boundaries (both transparent and opaque neighbors present)
            if (minN < 30 && maxN > 220) {
              const avg = (
                buf[row + x] + buf[row + x - 1] + buf[row + x + 1] +
                buf[row - width + x] + buf[row - width + x - 1] + buf[row - width + x + 1] +
                buf[row + width + x] + buf[row + width + x - 1] + buf[row + width + x + 1]
              ) / 9;
              raw[idx] = Math.round((a * 2 + avg) / 3);
            }
          }
        }
      }
    }

    const topFeatherY0 = Math.max(1, Math.floor(height * 0.770));
    const topFeatherY1 = Math.min(height - 2, Math.floor(height * 0.805));
    featherBand(topFeatherY0, topFeatherY1, 1);

    // Corte dinâmico abaixo do último degrau: encontra a última linha opaca central e remove abaixo com pequena margem
    (function dynamicBottomCut() {
      const x0 = Math.floor(width * 0.35);
      const x1 = Math.floor(width * 0.65);
      let lastOpaqueRow = -1;
      for (let y = height - 1; y >= 0; y--) {
        let opaqueCount = 0;
        for (let x = x0; x <= x1; x++) {
          const a = raw[pxIndex(x, y) + 3];
          if (a > 160) opaqueCount++;
        }
        if (opaqueCount > Math.floor((x1 - x0 + 1) * 0.02)) { // pelo menos ~2% de pixels opacos na faixa central
          lastOpaqueRow = y;
          break;
        }
      }
      if (lastOpaqueRow !== -1) {
        const margin = Math.max(2, Math.floor(height * 0.006));
        const cutY = Math.min(height - 1, lastOpaqueRow + margin);
        for (let y = cutY; y < height; y++) {
          for (let x = 0; x < width; x++) raw[pxIndex(x, y) + 3] = 0;
        }
      }
    })();

    // Em modo DEBUG, gera um PNG extra com faixa magenta e corte visível para garantir que as mudanças estão sendo vistas
    if (DEBUG) {
      const debugPath = path.resolve(__dirname, '..', 'public', 'images', 'fundo', 'delfos_templo_debug.png');
      const debug = Buffer.from(raw);
      const bandY0 = Math.floor(height * 0.70);
      const bandY1 = Math.min(height - 1, Math.floor(height * 0.72));
      for (let y = bandY0; y <= bandY1; y++) {
        for (let x = 0; x < width; x++) {
          const idx = pxIndex(x, y);
          debug[idx] = 255;       // R
          debug[idx + 1] = 0;     // G
          debug[idx + 2] = 255;   // B
          debug[idx + 3] = 255;   // A
        }
      }
      const clearY0 = Math.floor(height * 0.80);
      for (let y = clearY0; y < height; y++) {
        for (let x = 0; x < width; x++) debug[pxIndex(x, y) + 3] = 0;
      }
      await sharp(debug, { raw: { width, height, channels } }).png().toFile(debugPath);
    }

    await sharp(raw, { raw: { width, height, channels } })
      .png()
      .toFile(outputPath);

    console.log('Saved transparent image to', outputPath);
  } catch (err) {
    console.error('Failed to remove background:', err);
    process.exit(1);
  }
})();
