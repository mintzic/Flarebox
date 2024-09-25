<h1 align="center" style="font-weight: bold;">FlareBox</h1>

<p align="center">
<a href="#tech">Technologies</a>
<a href="#started">Getting Started</a>
<a href="#routes">API Endpoints</a>
<a href="#contribute">Contribute</a> 
</p>

<p align="center">FlareBox is a cloud-ready object storage solution built using MinIO and an Express API. It provides a scalable and efficient platform for managing file uploads, downloads, and storage operations in the cloud.</p>

<h2 id="tech">💻 Technologies</h2>

- **[MinIO](https://min.io/)**: Object storage.
- **[Express.js](https://expressjs.com/)**: Web framework for the API.
- **[Node.js](https://nodejs.org/)**: JavaScript runtime.
- **[Docker](https://www.docker.com/)**: Containerization platform.
- **[Nginx](https://www.nginx.com/)**: Web server for serving static files.
- **[Git](https://git-scm.com/)**: Version control.

<h2 id="started">🚀 Getting started</h2>

Here you describe how to run your project locally

<h3>Prerequisites</h3>

**[Docker](https://www.docker.com/)**: Required for building and running the application using the Dockerfile.

<h3>Cloning</h3>

How to clone your project

```bash
git clone https://github.com/mintzic/Flarebox.git
```

<h3>Starting</h3>

How to start your project

```bash
cd Flarebox
docker-compose up -d
```

<h2 id="routes">📍 API Endpoints</h2>

Here you can list the main routes of your API, and what are their expected request bodies.
​
| route | description  
|----------------------|-----------------------------------------------------
| <kbd>POST /admin</kbd> | create user and data bucket [response details](#post-auth-detail)
| <kbd>DELETE /admin/:username</kbd> | delete user and data bucket
| <kbd>GET /admin</kbd> | list all users
| <kbd>POST /upl</kbd> | upload file to user's data bucket [request details](#post-file-detail)
| <kbd>GET /</kbd> | list all files in user's data bucket
| <kbd>GET /dwn/:file</kbd> | download file from user's data bucket
| <kbd>DELETE /:file</kbd> | delete file from user's data bucket

<h3>Basic Auth for admin routes</h3>

```json
{
  "Username": "minioadmin",
  "Password": "minioadmin"
}
```

> Note: for file routes, use the created user's credentials

<h3 id="post-auth-detail">POST /admin</h3>

**REQUEST**

```json
{
  "username": "fernandakipper",
  "password": "44444444"
}
```

<h3 id="post-file-detail">POST /upl</h3>

**REQUEST**

```json
{
  "file": "file.jpg"
}
```

<h2 id="contribute">📫 Contribute</h2>

Here you will explain how other developers can contribute to your project. For example, explaining how can create their branches, which patterns to follow and how to open an pull request

1. `git clone https://github.com/mintzic/Flarebox.git`
2. `git checkout -b feature/NAME`
3. Follow commit patterns
4. Open a Pull Request explaining the problem solved or feature made, if exists, append screenshot of visual modifications and wait for the review!
