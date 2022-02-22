# ooFatFs Web Assembly Makefile
# Make sure you have EMScripten SDK (emsdk) installed in your path:
# https://emscripten.org/docs/getting_started/downloads.html#installation-instructions-using-the-emsdk-recommended

CC=emcc
LIBS=mbedtls/library/libmbedcrypto.a  mbedtls/library/libmbedtls.a  mbedtls/library/libmbedx509.a
EXPORTS=_malloc,_free,_mbedtls_ecdh_init,_mbedtls_ecdh_read_params,_mbedtls_ecdh_make_public,_mbedtls_ecdh_calc_secret,_mbedtls_ecdh_free
CFLAGS = -s MODULARIZE=1 -s 'EXPORT_NAME="mbedtls"' -O3 \
	-s 'EXPORTED_FUNCTIONS=$(EXPORTS)' \
	-s EXPORTED_RUNTIME_METHODS="['addFunction', 'cwrap']" -s ALLOW_TABLE_GROWTH=1 -s ASSERTIONS=0 \

all: dist/mbedtls.js dist/mbedtls-node.js

$(LIBS):
	cd mbedtls && emmake make lib -j4

dist/mbedtls.js: $(LIBS) | dist
	$(CC) -o $@ $(CFLAGS) -s EXPORT_ES6=1 -s ENVIRONMENT=web $^

dist/mbedtls-node.js: $(LIBS) | dist
	$(CC) -o $@ $(CFLAGS) -s ENVIRONMENT=node $^

dist: 
	mkdir $@
	cp mbedtls/LICENSE $@

clean:
	rm -rf dist
