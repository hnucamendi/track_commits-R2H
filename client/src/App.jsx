import React, { useState } from "react";
import CommitItem from "./components/CommitItem";
import "./styles/input.css";

function App() {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [data, setData] = useState([]);

  const url = `http://localhost:8000/api/${owner}/${repo}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(url);
    setData(await response.json());
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            />
          </label>
          <br />
          <label>
            Repository:
            <input
              type="text"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
      <CommitItem commits={data} />
    </>
  );
}

export default App;
