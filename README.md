# 📝 Task Traker

**Task Tracer** adalah aplikasi manajemen tugas harian berbasis **Electron** yang dikembangkan sebagai bagian dari proyek akhir mata kuliah **Pengembangan Sistem Operasi (PSO B)**. Aplikasi ini memudahkan pengguna, khususnya mahasiswa, untuk mencatat, mengelola, dan melacak progres tugas.

Repositori ini merupakan hasil *fork* dan pengembangan lanjutan dari [cassidoo/todometer](https://github.com/cassidoo/todometer), dengan penambahan pipeline CI/CD serta pengemasan dalam container Docker.

---

## Develop by Kelompok 13 – PSO B

- Viqi Alvianto - 5026221001
- Muhammad Fauzan – 5026221080
- Adithya Eka Pramudita – 5026221164
- Achmad Fahmi Ainur Ridho – 5026221167

---

## ⚙️ Tools & Teknologi

### 💻 Development
- Electron (Desktop App)
- HTML / CSS / JavaScript

### 🐳 Containerization & Pipeline
- Docker
- GitHub Actions (CI/CD)
- Vitest (Unit Testing)

### ☁️ Deployment & Infrastructure
- Terraform
- AWS EC2
- DockerHub

---

- Clone the repo:

```bash
$ git clone https://github.com/PSO-B-Kelompok-13/demo-repository.git
```

- Go to the project directory and install dependencies:

```bash
$ cd todometer && npm install
```

To show the Electron application window with your current build:

```bash
$ npm run dev
```

To build a production version:

```bash
$ npm install
$ npm run postinstall
$ npm run pre-electron-pack
$ npm run electron-pack
```
