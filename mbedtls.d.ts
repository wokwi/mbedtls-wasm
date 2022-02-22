/*
 mbedtls-wasm 3.1.0

 Copyright (C) 2022, Uri Shaked
*/

export default function createMbedTLS(options: {
  locateFile?: (string) => string;
}): Promise<any>;
