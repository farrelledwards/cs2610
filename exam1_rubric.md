# SQL and PostgreSQL Test Rubric (80 pts total)

Every question is worth 10 pts. Each question gets a rubric built from four common criteria, then specific things to look for.

## Common scoring scale (applies to all questions)

| Criterion | Points | Full credit looks like |
|---|---|---|
| Accuracy | 4 | Concepts and syntax are correct, with no significant misconceptions |
| Completeness | 3 | Addresses every part the prompt asks for, including the required number of items |
| Examples | 2 | Examples are relevant, syntactically valid, and explained |
| Clarity | 1 | Organized, uses correct terminology, easy to follow |

**Partial credit:** Award roughly half of a criterion for an answer that is partly correct or missing detail. Don't deduct twice for the same mistake. A minor syntax slip in an otherwise correct query costs no more than 1 pt.

---

## Question-specific checklists

### 1. Database Fundamentals (10 pts)

| Element | Points |
|---|---|
| Defines a database as an organized collection of structured data managed by a DBMS | 2 |
| Explains its role in software development (persistence, shared access, backing applications) | 2 |
| Names at least 3 benefits over flat files | 3 |
| Gives a realistic application example showing what data is stored and why | 3 |

Acceptable benefits over flat files: data integrity and constraints, concurrent multi-user access, efficient querying and indexing, security and permissions, transactions/ACID, backup and recovery, reduced redundancy, scalability. Award 1 pt per benefit named and explained.

Acceptable application examples: e-commerce, banking, social media, or similar.

### 2. SELECT and WHERE (10 pts)

| Element | Points |
|---|---|
| Describes SELECT as retrieving data and explains its structure (column list, FROM, optional clauses) | 2 |
| Explains that WHERE filters rows before results are returned | 2 |
| Gives at least 3 different WHERE operators with an example of each | 3 (1 each) |
| Explains when to use each operator | 3 |

Acceptable operators: `=`, `<>`, `>`, `<`, `BETWEEN`, `IN`, `LIKE`/`ILIKE`, `IS NULL`, `AND`/`OR`/`NOT`.

Bonus, not required: notes that `= NULL` doesn't work and `IS NULL` is needed.

### 3. JOIN Types and Usage (10 pts)

| Element | Points |
|---|---|
| INNER JOIN: only matching rows from both tables | 1 |
| LEFT JOIN: all left rows plus matches, with NULLs for non-matches | 1 |
| RIGHT JOIN: all right rows plus matches | 1 |
| FULL OUTER JOIN: all rows from both sides | 1 |
| A realistic scenario for each type | 4 |
| An example or explanation of choosing one JOIN over another (e.g., LEFT JOIN to find customers with no orders) | 2 |

### 4. GROUP BY and Aggregate Functions (10 pts)

| Element | Points |
|---|---|
| Explains GROUP BY as collapsing rows into groups, with aggregates computed per group | 3 |
| Describes at least 3 aggregate functions correctly (COUNT, SUM, AVG, MIN, MAX) | 3 |
| Provides a valid GROUP BY query with an aggregate | 2 |
| Correctly explains what the query returns | 2 |

Bonus, not required: mentions that non-aggregated selected columns must appear in GROUP BY, or mentions HAVING.

### 5. Sub-Queries in WHERE Clauses (10 pts)

| Element | Points |
|---|---|
| Defines a sub-query as a query nested inside another query | 2 |
| Describes at least 2 usage patterns (scalar comparison with `=`/`>`, `IN`, `EXISTS`, `ANY`/`ALL`) | 2 |
| Gives a valid example of each pattern | 4 (2 each) |
| Explains when to use each approach | 2 |

Examples of "when to use": a scalar sub-query needs a single-value result; `IN` for membership in a list; `EXISTS` for existence checks and often better performance on large sets.

### 6. Common Table Expressions (10 pts)

| Element | Points |
|---|---|
| Defines a CTE as a named temporary result set defined with `WITH` | 3 |
| Explains how it differs from a sub-query (named, reusable within the query, defined up front) | 2 |
| States at least one valid advantage (readability, reuse, breaking up complex logic, recursion) | 2 |
| Gives a scenario where a CTE is preferable, with reasoning (e.g., sub-query needed multiple times, multi-step logic) | 3 |

### 7. Table Constraints (10 pts)

| Element | Points |
|---|---|
| Explains the general purpose of constraints as enforcing data integrity at the database level | 4 |
| NOT NULL: prevents missing values, with an example use | 2 |
| PRIMARY KEY: unique, non-null row identifier, with an example use | 2 |
| FOREIGN KEY: enforces referential integrity between tables, with an example use | 2 |

Scoring may be rounded to the nearest 0.5.

### 8. INSERT, UPDATE, and DELETE Statements (10 pts)

| Element | Points |
|---|---|
| INSERT adds new rows | 2 |
| UPDATE modifies existing rows | 2 |
| DELETE removes rows | 2 |
| Describes a valid safety practice, explained clearly | 4 |

Acceptable safety practices:
- Run a `SELECT` with the same `WHERE` clause first
- Use transactions (`BEGIN`, then `COMMIT` or `ROLLBACK`)
- Back up the data first
- Test on a dev or copy environment
- Always include a `WHERE` clause and double-check it
- Use `RETURNING` in Postgres to verify affected rows

---

## Suggested grade bands (out of 80)

| Range | Meaning |
|---|---|
| 72-80 (90%+) | Strong command; minor gaps only |
| 64-71 (80-89%) | Solid understanding; some missing details |
| 56-63 (70-79%) | Basic understanding; several gaps or errors |
| Below 56 | Significant misconceptions or missing content |

