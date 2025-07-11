-- Utilisateurs
CREATE TABLE
  IF NOT EXISTS users (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    hashedPassword VARCHAR(100) NOT NULL,
    role ENUM (
      'administrateur',
      'moderateur',
      'redacteur',
      'lecteur'
    ) DEFAULT 'lecteur' NOT NULL
  );

-- Catégories
CREATE TABLE
  IF NOT EXISTS categories (
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    titre varchar(100) NOT NULL
  );

-- Articles
CREATE TABLE
  IF NOT EXISTS articles (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    image_url VARCHAR(255) DEFAULT NULL,
    content TEXT NOT NULL,
    category_id INT NOT NULL,
    user_id INT DEFAULT NULL,
    verified TINYINT (1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE RESTRICT ON UPDATE RESTRICT,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL ON UPDATE RESTRICT
  );

-- Associations
CREATE TABLE
  IF NOT EXISTS associations (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
  );

-- Messages (contact)
CREATE TABLE
  IF NOT EXISTS contactMessages (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    association_id INT NOT NULL,
    sent_at TIMESTAMP NOT NULL,
    FOREIGN KEY (association_id) REFERENCES associations (id) ON DELETE CASCADE ON UPDATE RESTRICT
  );