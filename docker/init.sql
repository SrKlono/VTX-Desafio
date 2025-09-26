CREATE DATABASE IF NOT EXISTS oltsdb;
USE oltsdb;

-- slot,port,ont_id,sn,              status, olt
-- 3,   6,   0,     444753542140AF37,online, Huawei
-- 3,   6,   1,     444753542140B5B4,offline,Huawei

CREATE TABLE olts (
    sn CHAR(16) PRIMARY KEY,
    slot INT NOT NULL,
    port INT NOT NULL,
    ont_id INT NOT NULL,
    isonline BOOLEAN NOT NULL DEFAULT 0,
    olt_vendor VARCHAR(50)
);

LOAD DATA INFILE '/var/lib/mysql-files/olts.csv'
INTO TABLE olts
    FIELDS TERMINATED BY ','
    LINES TERMINATED BY '\r\n'
    IGNORE 1 ROWS;