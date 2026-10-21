# Lecture 22: Representational State Transfer (REST)

**Class:** CS 2610
**Date:** Oct. 21, 2026
**Modules:** 3.4

---

Introduced in 2000. Not enforced. Principles and conventions.

### Concepts

- Actions
- HTTP methods
- Routes

### Principles

- Everything is a resource
- Use HTTP methods correctly
- Stateless
- Uniform interface
- Representation: different formats for different needs

### CRUD

Create, Read, Update, Delete

### Actions

| Action | Route | Renders a page? |
|-------|-------|-----|
| Index | GET /recipes | Yes: recipes/index.html |
| Show | GET /recipes/:id | Yes: recipes/show.html |
| New | GET /recipes/new | Yes: recipes/new.html (an empty form) |
| Edit | GET /recipes/:id/edit | Yes: recipes/edit.html (a pre-filled form) |
| Create | POST /recipes | No: saves, then redirects |
| Update | PUT/PATCH /recipes/:id | No: saves, then redirects |
| Destroy | DELETE /recipes/:id | No: deletes, then redirects |


### Template file organization

```
<resource>/show.html
```

### HTTP methods in REST

| Method | Purpose                                              | Safe | Idempotent            |
| ------ | ---------------------------------------------------- | ---- | --------------------- |
| GET    | Retrieve a resource                                  | Yes  | Yes                   |
| POST   | Create a resource, or trigger a non-idempotent action | No   | No (not guaranteed)   |
| PUT    | Replace a resource entirely                          | No   | Yes                   |
| PATCH  | Partially modify a resource                          | No   | Not guaranteed        |
| DELETE | Remove a resource                                    | No   | Yes                   |

#### RESTful
 
| Goal | Request | Notes |
|---|---|---|
| List books | `GET /books` | Safe, cacheable |
| Filter, sort, page | `GET /books?genre=scifi&sort=title&page=2` | Filtering belongs in the query string |
| Read one | `GET /books/42` | 404 if missing |
| Create | `POST /books` → `201 Created` + `Location: /books/43` | Server assigns the ID |
| Replace | `PUT /books/42` | Idempotent |
| Partial update | `PATCH /books/42` | Send only changed fields |
| Delete | `DELETE /books/42` → `204 No Content` | Idempotent |
| Sub-resource | `GET /authors/7/books` | Nest only one level or so |
 
#### Not RESTful (and why)
 
| Anti-pattern | Problem | Fix |
|---|---|---|
| `GET /getBook?id=42` | Verb in the URI, and the method duplicates it | `GET /books/42` |
| `POST /deleteBook` | Action in the URI, wrong method | `DELETE /books/42` |
| `GET /books/42/delete` | A GET with side effects. Crawlers and prefetchers can delete data | `DELETE /books/42` |
| `POST /api` with `{"action":"createBook"}` | A single endpoint tunneling RPC. Nothing is a resource | `POST /books` |
| `200 OK` with `{"error":"not found"}` | Ignores HTTP status semantics | `404 Not Found` |
| `GET /books/next` (server remembers your page) | Server-side session state | `GET /books?page=3` or a `next` link |
| `/Book/42`, `/book_list`, `/books/42/` | Inconsistent naming | Lowercase, plural, no trailing slash |


## TEST

- `GET /getAllPets`
- `GET /getPetById?id=5`
- `POST /createPet`
- `POST /updatePet?id=5`
- `GET /deletePet?id=5`
- `GET /searchPets?species=dog&maxAge=3`
- `POST /adoptPet?petId=5&userId=9`
- `GET /getPetsForShelter?shelterId=2`

## Test

- Get all currently borrowed library books for a user with the name "Farrell"

What's wrong with these?

```text
GET    /getAllPets
GET    /getPetById?id=5
POST   /createPet
POST   /updatePet?id=5
GET    /deletePet?id=5
GET    /searchPets?species=dog&maxAge=3
POST   /adoptPet?petId=5&userId=9
GET    /getPetsForShelter?shelterId=2
```