# User & Address Management

A small full-stack application for administrators to view user profiles and
manage the addresses attached to each user (one user → many addresses).

- **Backend:** Java 17, Spring Boot 3.3, in-memory data store (no DB required)
- **Frontend:** React 18 + Vite, Material UI (MUI) v6, React Router v6, Axios

---

## 1. Project layout

```
.
├── backend/     Spring Boot REST API
└── frontend/    React + MUI single-page app
```

## 2. Prerequisites

| Tool   | Version |
|--------|---------|
| Java   | 17+     |
| Maven  | 3.9+ (or use the wrapper if you add one)  |
| Node   | 18+     |
| npm    | 9+      |

## 3. Running the backend

```bash
cd backend
mvn spring-boot:run
```

The API starts on **http://localhost:8080**. There is no database to set up —
`InMemoryUserRepository` seeds four users (with a mix of 0, 1, 2 and 3
addresses each) when the application starts, so there's data to work with
immediately.

Data resets whenever the app restarts, since it's held in memory as
required by the assignment.

### API summary

| Method | Path                                          | Description                          |
|--------|------------------------------------------------|---------------------------------------|
| GET    | `/api/v1/users`                                | List users (id, name, email, address count) |
| GET    | `/api/v1/users/{userId}`                       | Get one user with all of their addresses |
| PUT    | `/api/v1/users/{userId}`                       | Update a user's basic profile info    |
| GET    | `/api/v1/users/{userId}/addresses`             | List a user's addresses               |
| POST   | `/api/v1/users/{userId}/addresses`             | Add a new address for a user          |
| PUT    | `/api/v1/users/{userId}/addresses/{addressId}` | Update one address                    |
| DELETE | `/api/v1/users/{userId}/addresses/{addressId}` | Delete one address                    |

All endpoints return JSON. Validation errors come back as `400` with a list
of field messages; unknown users/addresses come back as `404`. Both cases use
the same `ApiError` shape so the frontend has one error format to handle.

### Running backend tests

```bash
cd backend
mvn test
```

## 4. Running the frontend

```bash
cd frontend
npm install
npm run dev
```

The app starts on **http://localhost:5173** and talks to the API at
`http://localhost:8080/api/v1` by default. To point it somewhere else, copy
`.env.example` to `.env` and change `VITE_API_BASE_URL`.

## 5. Using the app

1. The landing page lists every user with their name, email, and how many
   addresses they have.
2. Clicking a row opens that user's profile page, which has two sections:
   - **Profile** — edit first name, last name, email.
   - **Addresses** — add, edit, or delete any of that user's addresses from
     one screen, each backed by its own dialog and its own validation.
3. Navigating back to the list re-fetches the data, so changes are always
   reflected.

---

## Design notes / trade-offs

**Why addresses are a sub-resource, not a separate top-level entity.**
The assignment describes a strict one-to-many relationship, so addresses are
routed under `/users/{userId}/addresses` rather than exposed as their own
`/addresses` collection. This keeps the API contract honest about the
relationship and means an address can never be fetched or mutated without
its owning user being known — no need for extra ownership checks in the
service layer.

**Why an interface-backed in-memory repository instead of a static list in
the service.** `UserRepository` is an interface with a single
`InMemoryUserRepository` implementation. The service layer only depends on
the interface. This was worth the extra indirection here because it means
swapping in a real JPA repository later is a one-class change — nothing in
`UserService`, the controllers, or the DTOs would need to move.

**Why DTOs instead of returning the entity directly.** `User`/`Address` are
the internal model; `UserSummaryResponse`, `UserDetailResponse`,
`AddressResponse`, `AddressRequest`, and `UserUpdateRequest` are the wire
contracts. Separating them means the list endpoint can stay cheap (it
returns an address *count*, not the full address list) without that
decision leaking into how the domain model is shaped.

**Why the frontend fetches full detail per page instead of a single global
store.** There's no Redux/Zustand here on purpose — the app has exactly two
screens and two matching data shapes (`useUsers`, `useUserDetail`), so a
couple of small hooks around `useState`/`useEffect` is enough state
management. Mutations (`saveProfile`, `createAddress`, `editAddress`,
`removeAddress`) live on the `useUserDetail` hook and re-sync from the
server after every write, trading a bit of extra network chatter for
guaranteed consistency with the backend instead of hand-maintained optimistic
state.

**Why one shared `AddressFormDialog` for both add and edit.** Add and edit
collect the exact same fields with the exact same validation; the only
difference is whether `initialValue` is populated. Keeping them as one
component avoids two near-identical forms drifting out of sync over time.

**What was intentionally left out.** No authentication/authorization, no
pagination on the user list, and no persistent storage — none of these were
called for, and adding them would have added surface area the assignment
wasn't asking to see.
