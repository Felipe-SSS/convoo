CREATE SCHEMA IF NOT EXISTS convoo DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE convoo;

CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(45) NOT NULL UNIQUE,
  description VARCHAR(255) NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  
INSERT INTO roles(name,description) VALUES
("Admin", "Admin do sistema"),
("User", "Usuario comum");

CREATE TABLE IF NOT EXISTS users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(45) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  verification_token VARCHAR(100) NULL,
  verification_sent_at DATETIME NULL,
  reset_password_token VARCHAR(100) NULL,
  reset_password_sent_at DATETIME NULL,
  role_id INT NOT NULL DEFAULT 2,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  last_login DATETIME NULL,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE RESTRICT
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS user_profiles (
  user_id BIGINT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NULL,
  birthdate DATE NOT NULL,
  address VARCHAR(255) NULL,
  bio TEXT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  
  CREATE TABLE IF NOT EXISTS user_stats (
  user_id BIGINT PRIMARY KEY,
  min_talked INT DEFAULT 0,
  practice_sequence INT DEFAULT 0,
  calls_made INT DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS video_calls (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  started_at TIMESTAMP NOT NULL,
  ended_at TIMESTAMP NULL,
  duration_seconds INT NULL,
  recording_url TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS video_call_participants (
  user_id BIGINT NOT NULL,
  call_id BIGINT NOT NULL,
  joined_at TIMESTAMP,
  left_at TIMESTAMP,
  PRIMARY KEY (user_id, call_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (call_id) REFERENCES video_calls (id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

  CREATE TABLE IF NOT EXISTS user_onboarding (
  user_id BIGINT PRIMARY KEY,
  country VARCHAR(100) NOT NULL,
  languages JSON NOT NULL,
  interests JSON NOT NULL,
  intent VARCHAR(255) NOT NULL,
  nickname VARCHAR(50) NOT NULL,
  birthdate DATE NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  
DELIMITER //
CREATE TRIGGER set_duration_before_insert
BEFORE INSERT ON video_calls
FOR EACH ROW
BEGIN
  IF NEW.ended_at IS NOT NULL THEN
    SET NEW.duration_seconds = TIMESTAMPDIFF(SECOND, NEW.started_at, NEW.ended_at);
  END IF;
END;

CREATE TRIGGER trg_add_minutes_to_user_stats
AFTER UPDATE ON video_call_participants
FOR EACH ROW
BEGIN
  -- Só atualiza se o usuário acabou de sair da call
  IF OLD.left_at IS NULL AND NEW.left_at IS NOT NULL THEN
    UPDATE user_stats
    SET min_talked = min_talked + TIMESTAMPDIFF(MINUTE, NEW.joined_at, NEW.left_at)
    WHERE user_id = NEW.user_id;
  END IF;
END;
//
DELIMITER ;