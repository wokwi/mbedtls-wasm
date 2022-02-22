const mbed = require('./dist/mbedtls-node');
mbed().then((c) => {
  const bparams = new Uint8Array([
    3, 0, 23, 65, 4, 212, 229, 216, 9, 24, 14, 72, 155, 112, 27, 57, 69, 54, 100, 247, 15, 154, 159,
    76, 249, 37, 178, 118, 55, 62, 179, 160, 31, 188, 231, 12, 133, 35, 255, 138, 135, 183, 78, 244,
    139, 243, 206, 223, 167, 137, 77, 160, 140, 129, 191, 73, 101, 148, 97, 19, 23, 89, 55, 232,
    233, 232, 84, 174, 7, 4, 3, 0, 70, 48, 68, 2, 32, 15, 2, 243, 155, 166, 131, 68, 35, 41, 100,
    86, 39, 15, 114, 74, 184, 75, 137, 208, 77, 246, 104, 14, 13, 33, 34, 166, 78, 173, 181, 151,
    67, 2, 32, 31, 254, 241, 106, 34, 190, 92, 64, 147, 12, 255, 70, 161, 162, 93, 91, 214, 229,
    155, 191, 136, 203, 92, 100, 81, 223, 254, 145, 212, 237, 2, 69,
  ]);
  const ctx = c._malloc(256);
  const buf = c._malloc(128);
  const bptr = c._malloc(bparams.length);
  const bptrptr = c._malloc(4);
  const olen = c._malloc(4);
  const insecure_random = c.addFunction((ctx, buf, len) => {
    for (let i = 0; i < len; i++) {
      c.HEAPU8[buf + i] = i;
    }
    return 0;
  }, 'iiii');
  c.HEAPU8.set(bparams, bptr);
  c.HEAPU32[bptrptr >> 2] = bptr;
  c._mbedtls_ecdh_init(ctx);
  console.log('rp', c._mbedtls_ecdh_read_params(ctx, bptrptr, bptr + bparams.length));
  console.log('pb', c._mbedtls_ecdh_make_public(ctx, olen, buf, 128, insecure_random, null));
  console.log('olen', c.HEAPU32[olen >> 2]);
  console.log('pb', c._mbedtls_ecdh_calc_secret(ctx, olen, buf, 128, insecure_random, null));
  console.log('olen', c.HEAPU32[olen >> 2]);
});
