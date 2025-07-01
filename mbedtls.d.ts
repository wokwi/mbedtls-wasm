/*
 mbedtls-wasm 3.2.0

 Copyright (C) 2022-2025, Uri Shaked
*/

export default function createMbedTLS(options: {
  wasmBinary?: ArrayLike<Number> | ArrayBufferLike;
  locateFile?: (string) => string;
}): Promise<any>;
