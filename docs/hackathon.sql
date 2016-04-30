CREATE TABLE queue (
    id INT NOT NULL AUTO_INCREMENT,
    user VARCHAR(30) NOT NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMP,
    PRIMARY KEY ( id )
);

CREATE TABLE processed (
    id int not null auto_increment,
    user varchar(30) not null,
    timestamp timestamp,
    primary key ( id )
);

CREATE USER 'pi'@'localhost' IDENTIFIED BY 'RaspberryPi123';
GRANT ALL PRIVILEGES ON *.* TO 'pi'@'localhost';


INSERT INTO queue (user, message)VALUES ('#alex', 'this is a test message');
INSERT INTO queue (user, message)VALUES ('#chris', 'this is another test message');
INSERT INTO queue (user, message)VALUES ('#doug', 'Tweeting is awesome #GRMMarketing');
INSERT INTO queue (user, message)VALUES ('#joe', 'I love this thing #Love');
INSERT INTO queue (user, message)VALUES ('#mike', 'I cant believe what I am seeign #Incredible');
