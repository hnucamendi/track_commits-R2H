import express from "express";
import cors from "cors";
import GHClient from "./test.js";
const app = express();
app.use(cors());
app.get("/api/:owner/:repo", async (req, res) => {
    const { owner, repo } = req.params;
    const gh = new GHClient();
    const response = await gh.getCommitData({
        owner,
        repo,
        per_page: 100,
    });
    res.status(200).send(gh.transformData(response.data));
});
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
