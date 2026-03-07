-- Curriculum Tables Setup
CREATE TABLE IF NOT EXISTS curriculum_iot (
    id VARCHAR(50) NOT NULL,
    curriculum_year VARCHAR(10) NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    `col` INT NOT NULL,
    `row` INT NOT NULL,
    `row_span` INT,
    class_name VARCHAR(100),
    `mobile_col` INT,
    `mobile_row` INT,
    `mobile_col_span` INT,
    `mobile_row_span` INT,
    plan_group TINYINT NULL,
    plan_label VARCHAR(50) NULL,
    PRIMARY KEY (id, curriculum_year)
);

CREATE TABLE IF NOT EXISTS curriculum_physiot (
    id VARCHAR(50) NOT NULL,
    curriculum_year VARCHAR(10) NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    `col` INT NOT NULL,
    `row` INT NOT NULL,
    `row_span` INT,
    class_name VARCHAR(100),
    `mobile_col` INT,
    `mobile_row` INT,
    `mobile_col_span` INT,
    `mobile_row_span` INT,
    plan_group TINYINT NULL,
    plan_label VARCHAR(50) NULL,
    PRIMARY KEY (id, curriculum_year)
);

CREATE TABLE IF NOT EXISTS curriculum_continue (
    id VARCHAR(50) NOT NULL,
    curriculum_year VARCHAR(10) NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    `col` INT NOT NULL,
    `row` INT NOT NULL,
    `row_span` INT,
    class_name VARCHAR(100),
    `mobile_col` INT,
    `mobile_row` INT,
    `mobile_col_span` INT,
    `mobile_row_span` INT,
    plan_group TINYINT NULL,
    plan_label VARCHAR(50) NULL,
    PRIMARY KEY (id, curriculum_year)
);

CREATE TABLE IF NOT EXISTS curriculum_metadata (
    program VARCHAR(50) NOT NULL,
    curriculum_year VARCHAR(10) NOT NULL,
    pdf_url TEXT,
    pdf_label TEXT,
    PRIMARY KEY (program, curriculum_year)
);

-- Seed metadata with initial links
INSERT IGNORE INTO curriculum_metadata (program, curriculum_year, pdf_url, pdf_label) VALUES 
('iot', '2565', 'https://drive.google.com/file/d/1U8mm7DxtNpFDbuWFgt22wRNEKulB_OU3/view', 'เล่มหลักสูตรวิศวกรรมระบบไอโอทีและสารสนเทศ 2565'),
('iot', '2568', 'https://drive.google.com/file/d/1U8mm7DxtNpFDbuWFgt22wRNEKulB_OU3/view', 'เล่มหลักสูตรวิศวกรรมระบบไอโอทีและสารสนเทศ 2568'),
('physiot', '2569', 'https://drive.google.com/file/d/1cHSWjO3A03lcGqgbT9PR51d335LfaVVo/view', 'เล่มหลักสูตรฟิสิกส์อุตสาหกรรม วิศวกรรมระบบไอโอที 2569'),
('continue', '2569', 'https://drive.google.com/file/d/1U8mm7DxtNpFDbuWFgt22wRNEKulB_OU3/view', 'เล่มหลักสูตรวิศวกรรมคอมพิวเตอร์และไอโอที (ต่อเนื่อง) 2569');

-- ==========================================
-- IoT Data (2565 & 2568)
-- ==========================================
DELETE FROM curriculum_iot;

INSERT INTO curriculum_iot (id, curriculum_year, name, description, `col`, `row`, `mobile_col`, `mobile_row`) VALUES
('appsoft', '2565', 'App Software for Business', 'Learn fundamental application software used in modern business environments, including spreadsheets, databases, and presentation tools.', 1, 1, 1, 1),
('circuit', '2565', 'Circuit and Electronics', 'Introduction to basic circuit theory, components, and electronic devices. Includes DC/AC analysis and laboratory experiments.', 1, 2, 2, 1),
('eng1', '2565', 'Foundation English 1', 'Focuses on developing essential English language skills for academic and professional communication.', 1, 3, 5, 1),
('intro_iot', '2565', 'Introduction to IoT', 'A comprehensive overview of the Internet of Things (IoT) ecosystem, from sensors and connectivity to cloud data processing and applications.', 1, 4, 6, 1),
('cal1', '2565', 'Calculus 1', NULL, 1, 5, 1, 2),
('comprog', '2565', 'Computer Program', NULL, 1, 6, 2, 2),
('gen1', '2565', 'Gen Physics 1', NULL, 1, 7, 5, 2),
('gplab1', '2565', 'Gen Physics Lab 1', NULL, 1, 8, 6, 2),
('cal2', '2565', 'Calculus 2', NULL, 2, 1, 1, 1),
('oop', '2565', 'Object-Oriented Data Structure', NULL, 2, 2, 2, 1),
('digi', '2565', 'Fundamental Digital System', NULL, 2, 3, 3, 1),
('eng2', '2565', 'Foundation English 2', NULL, 2, 4, 4, 1),
('gen2', '2565', 'Gen Physics 2', NULL, 2, 5, 5, 1),
('gplab2', '2565', 'General Physics Lab 2', NULL, 2, 6, 6, 1),
('preact', '2565', 'Pre-Activities For Engineers', NULL, 2, 7, 2, 2),
('charm', '2565', 'Charm School', NULL, 2, 8, 4, 2),
('team1', '2565', 'Team Project 1', NULL, 2, 9, 6, 2),
('ode', '2565', 'ODE and Linear Algebra', NULL, 3, 1, 1, 1),
('stat', '2565', 'Engineering Statistics', NULL, 3, 2, 2, 1),
('micro', '2565', 'MCU and Embedded', NULL, 3, 3, 3, 1),
('cyber', '2565', 'CPS & Sensors', NULL, 3, 4, 3, 2),
('digicit', '2565', 'Digital Citizen', NULL, 3, 5, 4, 2),
('em', '2565', 'Electromagnetic Fields', NULL, 3, 6, 5, 1),
('comm', '2565', 'Principles of Communicate', NULL, 3, 7, 6, 1),
('disc', '2565', 'Discrete Mathematics', NULL, 4, 1, 1, 1),
('inter', '2565', 'Interaction Design', NULL, 4, 2, 2, 1),
('web', '2565', 'Web and Mobile App Development', NULL, 4, 3, 3, 1),
('team2', '2565', 'Team Project 2', NULL, 4, 4, 4, 1),
('sec', '2565', 'Cyber Security', NULL, 4, 5, 5, 1),
('iotcomm', '2565', 'IoT and Data Communicate', NULL, 4, 6, 6, 1),
('gened1', '2565', 'Gen-Ed', NULL, 4, 7, 2, 2),
('genedlang1', '2565', 'Gen-Ed (LANG)', NULL, 4, 8, 3, 2),
('mathds', '2565', 'Math Data Science', NULL, 5, 1, 1, 1),
('ai', '2565', 'Artificial Intelligence', NULL, 5, 2, 2, 1),
('major1', '2565', 'MAJOR ELECTIVE 1', NULL, 5, 3, 3, 1),
('major2', '2565', 'MAJOR ELECTIVE 2', NULL, 5, 4, 4, 1),
('sem', '2565', 'SEMINAR', NULL, 5, 5, 5, 1),
('iotlab1', '2565', 'IoT & Info Lab 1', NULL, 5, 6, 6, 1),
('gened2', '2565', 'Gen-Ed', NULL, 5, 7, 1, 2),
('iiot', '2565', 'Industrial Internet of Things', NULL, 6, 1, 1, 1),
('major3', '2565', 'MAJOR ELECTIVE 3', NULL, 6, 2, 2, 1),
('iotlab2', '2565', 'IoT & Info Lab 2', NULL, 6, 3, 3, 1),
('team3', '2565', 'Team Project 3', NULL, 6, 4, 4, 1),
('gened3', '2565', 'Gen-Ed', NULL, 6, 5, 5, 1);

-- IoT 2565 Year 4 with Plans
INSERT INTO curriculum_iot (id, curriculum_year, name, `col`, `row`, `mobile_col`, `mobile_row`, `mobile_col_span`, class_name, plan_group, plan_label) VALUES
('proj1', '2565', 'Project 1', 7, 1, 1, 1, 2, 'course-pill-outline', 1, 'PLAN 1\nproject'),
('iotele1', '2565', 'IoT Elective 1', 7, 2, 3, 1, 2, 'course-pill-outline', 1, 'PLAN 1\nproject'),
('free1', '2565', 'Free Elective 1', 7, 3, 1, 2, 2, 'course-pill-outline', 1, 'PLAN 1\nproject'),
('iotele2', '2565', 'IoT Elective 2', 7, 4, 3, 2, 2, 'course-pill-outline', 1, 'PLAN 1\nproject'),
('proj2_1', '2565', 'Project 2', 8, 1, 1, 1, NULL, NULL, 1, 'PLAN 1\nproject'),
('iotele3', '2565', 'IoT Elective 3', 8, 2, 2, 1, NULL, NULL, 1, 'PLAN 1\nproject'),
('free2', '2565', 'Free Elective 2', 8, 3, 3, 1, NULL, NULL, 1, 'PLAN 1\nproject');

INSERT INTO curriculum_iot (id, curriculum_year, name, `col`, `row`, `row_span`, `mobile_col`, `mobile_row`, `mobile_col_span`, `mobile_row_span`, class_name, plan_group, plan_label) VALUES
('coop', '2565', 'Co-Operative / Study Abroad', 7, 6, 3, 5, 1, 2, 2, 'course-pill-coop', 2, 'PLAN 2\nCo-op');

INSERT INTO curriculum_iot (id, curriculum_year, name, `col`, `row`, `mobile_col`, `mobile_row`, plan_group, plan_label) VALUES
('proj2_2', '2565', 'Project 2', 8, 6, 1, 1, 2, 'PLAN 2\nCo-op'),
('proj2_3', '2565', 'Project 2', 8, 7, 2, 1, 2, 'PLAN 2\nCo-op'),
('proj2_4', '2565', 'Project 2', 8, 8, 3, 1, 2, 'PLAN 2\nCo-op'),
('proj2_5', '2565', 'Project 2', 8, 9, 4, 1, 2, 'PLAN 2\nCo-op'),
('proj2_6', '2565', 'Project 2', 8, 10, 5, 1, 2, 'PLAN 2\nCo-op');

-- IoT 2568
INSERT INTO curriculum_iot (id, curriculum_year, name, `col`, `row`, `mobile_col`, `mobile_row`) VALUES
('appsoft-68', '2568', 'App Software for Business (2568)', 1, 1, 1, 1),
('cal1-68', '2568', 'Calculus 1 (2568)', 1, 2, 2, 1),
('digi-68', '2568', 'Fundamental Digital System (2568)', 2, 1, 1, 1);

-- ==========================================
-- PhysIoT Data (2569)
-- ==========================================
DELETE FROM curriculum_physiot;

INSERT INTO curriculum_physiot (id, curriculum_year, name, `col`, `row`, mobile_col, mobile_row) VALUES 
('01006030', '2569', 'Calculus 1', 1, 1, 1, 1),
('05106030', '2569', 'General Chemistry', 1, 2, 1, 2),
('05106042', '2569', 'General Chemistry Laboratory', 1, 3, 1, 3),
('01006020', '2569', 'General Physics 1', 1, 4, 1, 4),
('01006021', '2569', 'General Physics Laboratory 1', 1, 5, 1, 5),
('01006012', '2569', 'Computer Programming', 1, 6, 1, 6),
('01236610', '2569', 'Engineering 3D Drawing in Practice', 1, 7, 1, 7),
('01236605', '2569', 'Circuit and Electronics Laboratory', 1, 8, 1, 8),
('01236604', '2569', 'Circuits and Electronics', 1, 9, 1, 9),
('90642036', '2569', 'Pre-Activities for Engineers', 1, 10, 1, 10),
('90641008', '2569', 'KMITL Identity Skills', 1, 11, 1, 11),
('ENG_INTRO', '2569', 'Introduction to English Communication Skills', 1, 12, 1, 12),
('01236611', '2569', 'Introduction to Internet of Things', 1, 13, 1, 13),
('01006031', '2569', 'Calculus 2', 2, 1, 2, 1),
('01006022', '2569', 'General Physics 2', 2, 2, 2, 2),
('01006023', '2569', 'General Physics Laboratory 2', 2, 3, 2, 3),
('01236601', '2569', 'Probability and Statistics', 2, 4, 2, 4),
('90642118', '2569', 'Application Software for Business', 2, 5, 2, 5),
('90641004', '2569', 'Team-Project 1', 2, 6, 2, 6),
('90641007', '2569', 'Digital Citizen', 2, 7, 2, 7),
('01236613', '2569', 'Object-Oriented Programming', 2, 8, 2, 8),
('01236602', '2569', 'Discrete Mathematics', 2, 9, 2, 9),
('01236619', '2569', 'Interaction Design', 2, 10, 2, 10),
('01236600', '2569', 'Elementary Differential Equation and Linear Algebra', 3, 1, 3, 1),
('01236603', '2569', 'Fundamental of Digital System Design', 3, 2, 3, 2),
('01236609', '2569', 'Digital System Design Laboratory', 3, 3, 3, 3),
('05366028', '2569', 'Mechanics', 3, 4, 3, 4),
('05366039', '2569', 'Intermediate Physics Laboratory 1', 3, 5, 3, 5),
('05366123', '2569', 'Electronic Circuits', 3, 6, 3, 6),
('90641009', '2569', 'Intercultural Communication Skills in English 1', 3, 7, 3, 7),
('01236615', '2569', 'Principle of Communications Systems', 3, 8, 3, 8),
('01236614', '2569', 'Data Structure and Algorithm', 3, 9, 3, 9),
('01236626', '2569', 'System Analysis and Design', 3, 10, 3, 10),
('05366030', '2569', 'Modern Physics', 4, 1, 4, 1),
('05366033', '2569', 'Waves and Optics', 4, 2, 4, 2),
('01236617', '2569', 'Sensors and Cyber Physical System', 4, 3, 4, 3),
('05366040', '2569', 'Intermediate Physics Laboratory 2', 4, 4, 4, 4),
('05366032', '2569', 'Electromagnetic Field', 4, 5, 4, 5),
('90641005', '2569', 'Team-Project 2', 4, 6, 4, 6),
('01236616', '2569', 'Data Communications and IoT Networks', 4, 7, 4, 7),
('01236618', '2569', 'Web and Mobile Application Development', 4, 8, 4, 8),
('01236627', '2569', 'Computer Architecture and Operating Systems', 4, 9, 4, 9),
('01236630', '2569', 'Database Systems', 4, 10, 4, 10),
('01236628', '2569', 'Cloud Operations in Practices', 4, 11, 4, 11),
('01236612', '2569', 'Microcontroller and Embedded Systems', 5, 1, 5, 1),
('01236623', '2569', 'IoT and Information Laboratory 1', 5, 2, 5, 2),
('05366044', '2569', 'Semiconductor Devices', 5, 3, 5, 3),
('05366031', '2569', 'Thermal and Statistics Physics', 5, 4, 5, 4),
('05366045', '2569', 'Materials Engineering and Industrial Applications', 5, 5, 5, 5),
('9064_LANG1', '2569', 'General Education (Language and Communication)', 5, 6, 5, 6),
('01236621', '2569', 'Artificial Intelligence of Things', 5, 7, 5, 7),
('01236622', '2569', 'Cyber Security Systems', 5, 8, 5, 8),
('01236625', '2569', 'Seminar with Professionals', 5, 9, 5, 9),
('01236629', '2569', 'Wireless Communication Systems for IoT', 5, 10, 5, 10),
('05366029', '2569', 'Quantum Mechanics and Quantum Technology', 6, 1, 6, 1),
('05366037', '2569', 'Measurement and Instrumentation', 6, 2, 6, 2),
('01236624', '2569', 'IoT and Information Engineering Laboratory 2', 6, 3, 6, 3),
('ELEC_01', '2569', 'Elective 1', 6, 4, 6, 4),
('ELEC_02', '2569', 'Elective 2', 6, 5, 6, 5),
('90641006', '2569', 'Team-Project 3', 6, 6, 6, 6),
('90641010', '2569', 'Intercultural Communication Skills in English 2', 6, 7, 6, 7),
('01236620', '2569', 'PLC and Industrial Internet of Things', 6, 8, 6, 8),
('MAJOR_01', '2569', 'IoT Major Elective 1', 6, 9, 6, 9),
('MAJOR_02', '2569', 'IoT Major Elective 2', 6, 10, 6, 10);

-- PhysIoT 2569 Year 4 with Plans
INSERT INTO curriculum_physiot (id, curriculum_year, name, `col`, `row`, mobile_col, mobile_row, plan_group, plan_label) VALUES 
('01236606', '2569', 'IoT and Information Engineering Project 1', 7, 1, 7, 1, 1, 'PLAN 1\nProject'),
('FREE_01', '2569', 'Free Elective 1', 7, 2, 7, 2, 1, 'PLAN 1\nProject'),
('GEN_ELEC1', '2569', 'General Education Elective 1', 7, 3, 7, 3, 1, 'PLAN 1\nProject'),
('GEN_ELEC2', '2569', 'General Education Elective 2', 7, 4, 7, 4, 1, 'PLAN 1\nProject'),
('ELEC_03', '2569', 'Elective 3', 7, 5, 7, 5, 1, 'PLAN 1\nProject'),
('01236607', '2569', 'IoT and Information Engineering Project 2', 8, 1, 8, 1, 1, 'PLAN 1\nProject'),
('FREE_02', '2569', 'Free Elective 2', 8, 2, 8, 2, 1, 'PLAN 1\nProject'),
('05366080', '2569', 'Seminar', 8, 3, 8, 3, 1, 'PLAN 1\nProject'),
('01236608', '2569', 'IoT Engineering Capstone Design', 8, 4, 8, 4, 1, 'PLAN 1\nProject');

INSERT INTO curriculum_physiot (id, curriculum_year, name, `col`, `row`, row_span, mobile_col, mobile_row, mobile_col_span, mobile_row_span, class_name, plan_group, plan_label) VALUES 
('01006029', '2569', 'Co-operative Education / Oversea Training', 7, 6, 3, 7, 6, 2, 2, 'course-pill-coop', 2, 'PLAN 2\nCo-op');

INSERT INTO curriculum_physiot (id, curriculum_year, name, `col`, `row`, mobile_col, mobile_row, plan_group, plan_label) VALUES 
('FREE_01_P2', '2569', 'Free Elective 1', 8, 6, 8, 6, 2, 'PLAN 2\nCo-op'),
('FREE_02_P2', '2569', 'Free Elective 2', 8, 7, 8, 7, 2, 'PLAN 2\nCo-op');

-- ==========================================
-- Continuing Data (2569 only)
-- ==========================================
DELETE FROM curriculum_continue;

INSERT INTO curriculum_continue (id, curriculum_year, name, `col`, `row`, mobile_col, mobile_row) VALUES 
('01446001', '2569', 'Calculus for Computer Engineering', 1, 1, 1, 1),
('01446007', '2569', 'Introduction to Internet of Things', 1, 2, 1, 2),
('01006012', '2569', 'Computer Programming', 1, 3, 1, 3),
('01446005', '2569', 'Circuit and Electronics', 1, 4, 1, 4),
('01446004', '2569', 'Digital System Design', 1, 5, 1, 5),
('01446006', '2569', 'Electronics and Digital System Laboratory', 1, 6, 1, 6),
('90642118', '2569', 'Application Software for Business', 1, 7, 1, 7),
('90641008', '2569', 'Introduction to English Communication Skills', 1, 8, 1, 8),
('90641007', '2569', 'Digital Citizen', 1, 9, 1, 9),
('01446002', '2569', 'Computer Engineering Mathematics', 2, 1, 2, 1),
('01446009', '2569', 'Object-Oriented Programming', 2, 2, 2, 2),
('01446025', '2569', 'Principle of Communication Systems', 2, 3, 2, 3),
('01446003', '2569', 'Probability and Statistics', 2, 4, 2, 4),
('01446022', '2569', 'Computer Architecture and Operating Systems', 2, 5, 2, 5),
('90642036', '2569', 'Pre-Activities For Engineers', 2, 6, 2, 6),
('01446015', '2569', 'Interaction Design', 2, 7, 2, 7),
('90641004', '2569', 'Team-Project 1', 2, 8, 2, 8),
('90641009', '2569', 'Intercultural Communication Skills in English 1', 3, 1, 3, 1),
('01446024', '2569', 'System Analysis and Design', 3, 2, 3, 2),
('01446010', '2569', 'Data Structure and Algorithm', 3, 3, 3, 3),
('01446012', '2569', 'Data Communications and Computer Networks', 3, 4, 3, 4),
('01446008', '2569', 'Microcontroller and Embedded Systems', 3, 5, 3, 5),
('01446020', '2569', 'Computer and IoT Engineering Laboratory 1', 3, 6, 3, 6),
('01446023', '2569', 'Cloud Operations in Practices', 3, 7, 3, 7),
('01446019', '2569', 'Sensor and Cyber-Physical System', 3, 8, 3, 8),
('90641010', '2569', 'Intercultural Communication Skills in English 2', 4, 1, 4, 1),
('01446011', '2569', 'Database System', 4, 2, 4, 2),
('01446018', '2569', 'Cyber Security Systems', 4, 3, 4, 3),
('01446016', '2569', 'PLC and Industrial Internet of Things', 4, 4, 4, 3),
('01446014', '2569', 'Web and Mobile Application Development', 4, 5, 4, 5),
('01446021', '2569', 'Computer and IoT Engineering Laboratory 2', 4, 6, 4, 6),
('90641005', '2569', 'Team Project 2', 4, 7, 4, 7),
('GEN_ELEC_1', '2569', 'General Education Elective', 4, 8, 4, 8),
('01446076', '2569', 'Project 1', 5, 1, 5, 1),
('01446017', '2569', 'Artificial Intelligence of Things', 5, 2, 5, 2),
('01446013', '2569', 'Internetworking Design and Practice', 5, 3, 5, 3),
('ELEC_01', '2569', 'Elective 1', 5, 4, 5, 4),
('FREE_01', '2569', 'Free Elective 1', 5, 5, 5, 5),
('ELEC_02', '2569', 'Elective 2', 5, 6, 5, 6),
('GEN_LANG', '2569', 'General Education Elective (Language)', 5, 7, 5, 7),
('90641006', '2569', 'Team-Project 3', 6, 1, 6, 1),
('01446077', '2569', 'Project 2', 6, 2, 6, 2),
('ELEC_03', '2569', 'Elective 3', 6, 3, 6, 3),
('GEN_ED_1', '2569', 'General Education', 6, 4, 6, 4),
('FREE_02', '2569', 'Free Elective 2', 6, 5, 6, 5),
('ELEC_04', '2569', 'Elective 4', 6, 6, 6, 6);
