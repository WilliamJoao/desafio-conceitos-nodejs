const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  // TODO

  const { title, url, techs } = request.body;

  const repository = {
      id: uuid(),
      title,
      url,
      likes: 0,
      techs
  }
  repositories.push(repository);

  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  // TODO

  const { url, title, techs } = request.body;
  const id = request.params.id;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository does not exist.' });
  }

  repositories[repositoryIndex].url = url;
  repositories[repositoryIndex].title = title;
  repositories[repositoryIndex].techs = techs;

  return response.json(repositories[repositoryIndex])
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const id = request.params.id;

  const repositoriesIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoriesIndex < 0) {
    return response.status(400).json({ error: 'Repository does not exist.' });
  }

  repositories.splice(repositoriesIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO

  const id = request.params.id;

  const repository = repositories.find(repository => repository.id === id);
  
  if (!repository) {
    return response.status(400).json({ error: 'Repository does not exist.' });
  }

  repository.likes += 1;

  console.log(repository)

  return response.json(repository)
});

module.exports = app;
