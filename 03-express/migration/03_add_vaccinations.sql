-- 03_add_vaccinations.sql
-- Update script: track vaccinations for each pet.

BEGIN;

CREATE TABLE vaccinations (
    id            SERIAL PRIMARY KEY,
    pet_id        INTEGER      NOT NULL REFERENCES pets (id) ON DELETE CASCADE,
    vaccine_name  VARCHAR(100) NOT NULL,
    administered_on DATE       NOT NULL,
    next_due_on   DATE
);

CREATE INDEX idx_vaccinations_pet_id ON vaccinations (pet_id);

COMMIT;
