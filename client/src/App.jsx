import React, { useState } from "react";
import "./styles/input.css";

function App() {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  // const [response, setResponse] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const gh = new GHClient();
    // setResponse(
    //   await gh.getCommitData({
    //     owner,
    //     repo,
    //     per_page: 100,
    //   })
    // );
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
      {/* <CommitItem response={response.data} /> */}
    </>
  );
}

export default App;
