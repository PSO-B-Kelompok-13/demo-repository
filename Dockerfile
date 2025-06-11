# ---------- Build Stage ----------
FROM node:20-alpine3.18 AS builder

WORKDIR /app

# Salin package.json dan lock file
COPY package*.json ./

# Install dependensi proyek
RUN npm install --legacy-peer-deps

# Salin semua source code
COPY . .

# Build aplikasi (output ke folder dist/)
RUN npm run build



# ---------- Test Stage ----------
FROM node:20-alpine3.18 AS test

WORKDIR /app

# Salin seluruh source untuk keperluan testing
COPY . .

# Install dependensi
RUN npm install --legacy-peer-deps

# Jalankan unit test
CMD ["npm", "test"]



# ---------- Production Stage ----------
FROM node:20-alpine3.18 AS production

WORKDIR /app

# Salin hasil build dari stage builder
COPY --from=builder /app/dist ./dist

# Install server statis untuk serve dist/
RUN npm install -g serve

EXPOSE 3000

# Jalankan aplikasi
CMD ["serve", "-s", "dist", "-l", "3000"]
