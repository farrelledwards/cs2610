-- 02_fix_pet_owner.sql
-- Update script: replace the owner_name text column with a real foreign key
-- to users. (No data migration; existing pets will have a NULL user_id.)
-- Also stops duplicate emails while we're at it.

BEGIN;

ALTER TABLE pets
    ADD COLUMN user_id INTEGER,
    ADD CONSTRAINT fk_pets_user
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE;

ALTER TABLE pets DROP COLUMN owner_name;

ALTER TABLE users
    ADD CONSTRAINT uq_users_email UNIQUE (email);

COMMIT;
