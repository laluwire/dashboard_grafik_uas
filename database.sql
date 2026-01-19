CREATE DATABASE dashboard_uas;
USE dashboard_uas;

CREATE TABLE prodi (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama_prodi VARCHAR(100)
);

CREATE TABLE mahasiswa (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100),
  semester INT,
  prodi_id INT,
  FOREIGN KEY (prodi_id) REFERENCES prodi(id)
);

INSERT INTO prodi (nama_prodi) VALUES
('Informatika'),
('Sistem Informasi'),
('Teknik Komputer');

INSERT INTO mahasiswa (nama, semester, prodi_id) VALUES
('Andi', 3, 1),
('Budi', 5, 1),
('Citra', 3, 2),
('Dina', 7, 3),
('Eka', 5, 2);
