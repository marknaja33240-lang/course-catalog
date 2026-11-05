CREATE DATABASE IF NOT EXISTS `6703952_mydb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `6703952_mydb`;

CREATE TABLE IF NOT EXISTS `instructor` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `courses` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `course_code` VARCHAR(20) NOT NULL,
  `course_name` VARCHAR(255) NOT NULL,
  `credits` INT NOT NULL DEFAULT 3,
  `instructor_id` INT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`instructor_id`) REFERENCES `instructor`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `instructor` (`name`, `email`) VALUES
('Dr. Alan Turing', 'alan@example.com'),
('Ada Lovelace', 'ada@example.com');

INSERT INTO `courses` (`course_code`, `course_name`, `credits`, `instructor_id`) VALUES
('CS101', 'Introduction to Computer Science', 3, 1),
('CS102', 'Data Structures and Algorithms', 3, 2);