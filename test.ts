import { Octokit } from "octokit";
import * as dotenv from "dotenv";
import { OctokitResponse } from "@octokit/types";
dotenv.config();

class GHClient {
  // create access token
  ACCESS_TOKEN = process.env.ACCESSTOKEN;

  // create instance of oktokit.js
  oktokit: Octokit = new Octokit({
    auth: this.ACCESS_TOKEN,
  });

  getCommitsRequest = async (options: { owner: string; repo: string }) => {
    return this.oktokit.request(
      "GET /repos/{owner}/{repo}/commits{?sha,path,author,since,until,per_page,page}",
      options
    );
  };

  async getCommits(): Promise<any> {
    try {
      return await this.callWithRetry(() =>
        this.getCommitsRequest({ owner: "hnucamendi", repo: "finance-tracker" })
      );
    } catch (err) {
      throw new Error(`[err] ${err}`);
    }
  }

  sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  callWithRetry = async (
    fn: () => Promise<OctokitResponse<any, number>>,
    n: number = 0
  ) => {
    try {
      return await fn();
    } catch (e) {
      if (n > 7) {
        console.log(`tried ${n} times`);
        throw e;
      }
      await this.sleep(Math.pow(n, 2) + Math.floor(Math.random() * 1000));

      return this.callWithRetry(fn, n + 1);
    }
  };
}

const gh: GHClient = new GHClient();
const response = await gh.getCommits();

const headers = response.headers;
const data = response.data;

console.log({ data, headers });
