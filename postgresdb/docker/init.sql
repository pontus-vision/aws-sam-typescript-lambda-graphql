CREATE SCHEMA VEHICLES;
-- TRAINdomain
CREATE TABLE VEHICLES.TRAIN (_id varchar(15) PRIMARY KEY, search jsonb);
CREATE INDEX TRAIN_SEARCH on VEHICLES.TRAIN USING gin(search);

-- CAR
CREATE TABLE VEHICLES.CAR (_id varchar(15) PRIMARY KEY, search jsonb);
CREATE INDEX CAR_SEARCH on VEHICLES.CAR USING gin(search);
