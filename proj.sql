use EmployeeDB;
CREATE TABLE `employee`(
`EmpID` int(11) NOT NULL AUTO_INCREMENT,
`Name` VARCHAR(45) DEFAULT NULL,
`EmpCode` VARCHAR(45) DEFAULT NULL,
`Salary` int(11) DEFAULT NULL,
PRIMARY KEY(`EmpID`)
);
show tables;
drop table employee;
DESC employee;

LOCK TABLES `employee` WRITE;
INSERT INTO `employee` VALUES (1,'GAVIN','EMP90',265400),(2,'NAruto','EMP12',9900),(3,'Vegeta','EMP45',223400),(4,'LIGHT yagami','EMP56',24400),(5,'Gojo','EMP97',34400);
UNLOCK TABLES;