-- Hayvon turlari
CREATE TABLE AnimalTypes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type_name VARCHAR(100) NOT NULL -- Hayvon turi
);

-- Zotlar
CREATE TABLE Breeds (
    id INT PRIMARY KEY AUTO_INCREMENT,
    breed_name VARCHAR(100) NOT NULL, -- Zot nomi
    animal_type_id INT, -- Hayvon turi ID
    FOREIGN KEY (animal_type_id) REFERENCES AnimalTypes(id) -- Tashqi kalit
);

-- Hayvonlar
CREATE TABLE Animals (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL, -- Hayvon nomi
    breed_id INT, -- Zot ID
    birth_date DATE, -- Tug'ilgan sana
    gender ENUM('Male', 'Female'), -- Jins
    caretaker_id INT, -- Boquvchi ID
    FOREIGN KEY (breed_id) REFERENCES Breeds(id), -- Tashqi kalit
    FOREIGN KEY (caretaker_id) REFERENCES Caretakers(id) -- Tashqi kalit
);

-- Nasl
CREATE TABLE Lineage (
    id INT PRIMARY KEY AUTO_INCREMENT,
    animal_id INT, -- Hayvon ID
    father_id INT, -- Ota ID
    mother_id INT, -- Ona ID
    FOREIGN KEY (animal_id) REFERENCES Animals(id), -- Tashqi kalit
    FOREIGN KEY (father_id) REFERENCES Animals(id), -- Tashqi kalit
    FOREIGN KEY (mother_id) REFERENCES Animals(id) -- Tashqi kalit
);

-- Emlash
CREATE TABLE Vaccinations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    animal_id INT, -- Hayvon ID
    vaccination_date DATE, -- Emlash sanasi
    vaccine_name VARCHAR(100), -- Emlash nomi
    next_due_date DATE, -- Keyingi emlash sanasi
    FOREIGN KEY (animal_id) REFERENCES Animals(id) -- Tashqi kalit
);

-- Tibbiy holatlar
CREATE TABLE MedicalRecords (
    id INT PRIMARY KEY AUTO_INCREMENT,
    animal_id INT, -- Hayvon ID
    record_date DATE, -- Qayd sanasi
    description TEXT, -- Tavsif
    treatment TEXT, -- Davolash
    FOREIGN KEY (animal_id) REFERENCES Animals(id) -- Tashqi kalit
);

-- Ovqatlanish grafigi
CREATE TABLE FeedingSchedules (
    id INT PRIMARY KEY AUTO_INCREMENT,
    animal_id INT, -- Hayvon ID
    feeding_time TIME, -- Ovqatlanish vaqti
    food_type VARCHAR(100), -- Ovqat turi
    FOREIGN KEY (animal_id) REFERENCES Animals(id) -- Tashqi kalit
);

-- Boquvchilar
CREATE TABLE Caretakers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL, -- Boquvchi nomi
    contact_number VARCHAR(15) NOT NULL -- Aloqa raqami
);

-- Sut so'guvchilar
CREATE TABLE Milkers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL, -- Sut so'guvchi nomi
    contact_number VARCHAR(15) NOT NULL -- Aloqa raqami
);

-- Sut ishlab chiqarish
CREATE TABLE MilkProduction (
    id INT PRIMARY KEY AUTO_INCREMENT,
    animal_id INT, -- Hayvon ID
    production_date DATE, -- Ishlab chiqarish sanasi
    amount DECIMAL(10, 2), -- Sut miqdori
    FOREIGN KEY (animal_id) REFERENCES Animals(id) -- Tashqi kalit
);

-- Ovqatlar
CREATE TABLE Foods (
    id INT PRIMARY KEY AUTO_INCREMENT,
    food_name VARCHAR(100) NOT NULL -- Ovqat nomi
);

-- Ovqatlar hayvonlar bilan bog'lanishi
CREATE TABLE AnimalFoods (
    id INT PRIMARY KEY AUTO_INCREMENT,
    animal_id INT, -- Hayvon ID
    food_id INT, -- Ovqat ID
    FOREIGN KEY (animal_id) REFERENCES Animals(id), -- Tashqi kalit
    FOREIGN KEY (food_id) REFERENCES Foods(id) -- Tashqi kalit
);

-- Tibbiy tekshiruvlar
CREATE TABLE HealthChecks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    animal_id INT, -- Hayvon ID
    check_date DATE, -- Tekshirish sanasi
    results TEXT, -- Natijalar
    FOREIGN KEY (animal_id) REFERENCES Animals(id) -- Tashqi kalit
);

-- Nasl berish yozuvlari
CREATE TABLE BreedingRecords (
    id INT PRIMARY KEY AUTO_INCREMENT,
    animal_id INT, -- Hayvon ID
    breeding_date DATE, -- Nasl berish sanasi
    offspring_count INT, -- Nasl soni
    FOREIGN KEY (animal_id) REFERENCES Animals(id) -- Tashqi kalit
);
