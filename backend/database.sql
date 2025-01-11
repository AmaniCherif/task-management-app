-- Create database
CREATE DATABASE IF NOT EXISTS task_management;
USE task_management;

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    due_date DATE,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add some sample tasks
INSERT INTO tasks (title, description, priority, due_date) VALUES
    ('Complete project documentation', 'Write comprehensive documentation for the task management system', 'high', DATE_ADD(CURRENT_DATE, INTERVAL 7 DAY)),
    ('Review code', 'Perform code review for recent changes', 'medium', DATE_ADD(CURRENT_DATE, INTERVAL 3 DAY)),
    ('Setup testing environment', 'Configure and setup testing environment for the application', 'low', DATE_ADD(CURRENT_DATE, INTERVAL 5 DAY));
