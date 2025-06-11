# Base image untuk tahap build
FROM node:20-alpine3.18 as builder

# Atur working directory di dalam kontainer
WORKDIR /app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Instal dependensi (hanya untuk build)
RUN npm install --legacy-peer-deps

# Salin sisa kode aplikasi
COPY . .

# Jalankan proses build aplikasi
RUN npm run build

# --- Tahap Produksi ---
# Base image yang lebih ringan untuk aplikasi yang sudah dibangun
FROM node:20-alpine3.18

# Atur working directory di dalam kontainer
WORKDIR /app

# Hanya salin hasil build dari tahap 'builder'
COPY --from=builder /app/dist ./dist

# Instal server statik 'serve' secara global
RUN npm install -g serve

# Beri tahu Docker bahwa kontainer akan mendengarkan di port 3000
EXPOSE 3000

# Perintah untuk menjalankan aplikasi ketika kontainer dimulai
CMD ["serve", "-s", "dist", "-l", "3000"]