CREATE TABLE ratings (
       id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
       recipe_id INT NOT NULL, 
       user_id INT NOT NULL, 
       CONSTRAINT fk_recipe FOREIGN KEY (recipe_id) REFERENCES recipes (id) ON DELETE CASCADE,
       CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
       rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       CONSTRAINT unique_user_recipe_rating UNIQUE (recipe_id, user_id)
);
