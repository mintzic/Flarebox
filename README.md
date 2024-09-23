
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

<h3>Config .env variables</h2>

Use the `.env.example` as reference to create your configuration file `.env` with your AWS Credentials

```yaml
NODE_AWS_REGION=us-east-1
NODE_AWS_KEY_ID={YOUR_AWS_KEY_ID}
NODE_AWS_SECRET={YOUR_AWS_SECRET}
```

<h3>Starting</h3>

How to start your project

```bash
cd project-name
npm some-command-to-run
```

<h2 id="routes">📍 API Endpoints</h2>

Here you can list the main routes of your API, and what are their expected request bodies.
​
| route               | description                                          
|----------------------|-----------------------------------------------------
| <kbd>GET /authenticate</kbd>     | retrieves user info see [response details](#get-auth-detail)
| <kbd>POST /authenticate</kbd>     | authenticate user into the api see [request details](#post-auth-detail)

<h3 id="get-auth-detail">GET /authenticate</h3>

**RESPONSE**
```json
{
  "name": "Fernanda Kipper",
  "age": 20,
  "email": "her-email@gmail.com"
}
```

<h3 id="post-auth-detail">POST /authenticate</h3>

**REQUEST**
```json
{
  "username": "fernandakipper",
  "password": "4444444"
}
```

**RESPONSE**
```json
{
  "token": "OwoMRHsaQwyAgVoc3OXmL1JhMVUYXGGBbCTK0GBgiYitwQwjf0gVoBmkbuyy0pSi"
}
```

<h2 id="contribute">📫 Contribute</h2>

Here you will explain how other developers can contribute to your project. For example, explaining how can create their branches, which patterns to follow and how to open an pull request

1. `git clone https://github.com/mintzic/Flarebox.git`
2. `git checkout -b feature/NAME`
3. Follow commit patterns
4. Open a Pull Request explaining the problem solved or feature made, if exists, append screenshot of visual modifications and wait for the review!
