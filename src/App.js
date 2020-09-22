import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [repositories, setRespositories] = useState([]);

  useEffect(() => {
    fetchRepositories();
  }, [])
  
  async function fetchRepositories() {
    try {
      const { data } = await api.get('/repositories');

      setRespositories(data);
    } catch (error) {
      console.log(error)
    }
  }

  async function handleAddRepository() {
    try {
      const { data } = await api.post('/repositories', {
        url: "https://github.com/josepholiveira",
        title: `Desafio ReactJS ${new Date().getTime()}`,
        techs: ["React", "Node.js"],
      });

      setRespositories([...repositories, data]);
    } catch (error) {
      console.log(error)
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);
      
      const newRepositoriesList = repositories.filter(repository => repository.id !== id);

      setRespositories(newRepositoriesList);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
