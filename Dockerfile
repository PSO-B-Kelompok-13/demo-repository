FROM node:22

# Instal dependensi yang dibutuhkan untuk Electron
RUN apt-get update && apt-get install \
    git libx11-xcb1 libxcb-dri3-0 libxtst6 libnss3 libatk-bridge2.0-0 libgtk-3-0 libxss1 libasound2 libdrm2 libgbm1 \
    -yq --no-install-suggests --no-install-recommends \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Tambahkan pengguna non-root
RUN useradd -m -d /custom-app custom-app
WORKDIR /custom-app
COPY . .

# Konfigurasi lokasi cache npm
RUN npm config set cache /tmp/npm-cache

# Atur direktori global npm untuk menghindari masalah izin
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

# Hapus cache npm sebagai root
USER root
RUN npm cache clean --force

# Atur kepemilikan direktori kerja dan node_modules
RUN mkdir -p /custom-app/node_modules && chown -R custom-app:custom-app /custom-app

# Instal dependensi npm sebagai pengguna non-root
USER custom-app
RUN npm install

# Atur izin khusus untuk Electron
USER root
RUN chown root /custom-app/node_modules/electron/dist/chrome-sandbox
RUN chmod 4755 /custom-app/node_modules/electron/dist/chrome-sandbox

# Kembali menggunakan pengguna non-root
USER custom-app

# Jalankan aplikasi
CMD npm run start
