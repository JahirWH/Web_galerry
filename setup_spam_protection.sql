-- Agregar columna IP a la tabla de comentarios existente
ALTER TABLE comentarios ADD COLUMN ip VARCHAR(45) AFTER mensaje;

-- Crear tabla para tracking de rate limiting
CREATE TABLE IF NOT EXISTS comment_rate_limit (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip VARCHAR(45) NOT NULL,
    attempts INT DEFAULT 1,
    last_attempt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_ip_time (ip, last_attempt)
);