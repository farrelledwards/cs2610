CREATE TABLE recipes (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(50),
    ingredients VARCHAR(100) NOT NULL,
    instructions VARCHAR(100) NOT NULL,
    prep_time INT,
    cook_time INT,
    servings INT,
    user_id INT NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
