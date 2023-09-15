# Kanban Board API

## Setup

-   Clone the repository:
    ```bash
    git clone https://github.com/Gurkankaradag0/kanban-board-api.git
    cd kanban-board-api
    ```
-   Install dependencies:

    ```python
    npm install or yarn install or pnpm install
    ```

-   Create your own .env file based on the .env.example file.

## Run Project

```python
npm dev or yarn dev or pnpm dev
```

## Routes

| Route                           | Method | Authenticate | Description       |
| ------------------------------- | ------ | ------------ | ----------------- |
| /users                          | get    | True         | Get user data.    |
| /users                          | post   | False        | Create new user.  |
| /users/login                    | post   | False        | Login             |
| /users/sessions                 | get    | True         | Get user boards.  |
| /users/delete                   | delete | True         | Delete user.      |
| /sessions                       | post   | True         | Create new board. |
| /sessions/:id                   | patch  | True         | Update board.     |
| /sessions/:id                   | delete | True         | Delete board.     |
| /sessions/:id/add-task          | post   | True         | Create new task.  |
| /sessions/:id/:taskId           | patch  | True         | Update task.      |
| /sessions/:id/:taskId           | delete | True         | Delete task.      |
| /sessions/:id/:taskId/move-task | post   | True         | Move task.        |

## Developed By

**_Gürkan Karadağ_**

## Social

[![Linkedin](https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gurkankaradag/)
