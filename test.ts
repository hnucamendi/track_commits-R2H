import { Octokit } from "octokit";
import { OctokitResponse } from "@octokit/types";
import promptSync from "prompt-sync";
const prompt = promptSync();
import * as dotenv from "dotenv";
dotenv.config();

//TODO: create interface for class
//TODO: add better comments
class GHClient {
  // get access token
  // TODO: Add ability for user to set password
  // TODO: store hashed pass, use pass to hash ACCESSTOKEN
  static ACCESS_TOKEN = process.env.ACCESSTOKEN;
  oktokit: Octokit;

  async getCommitData(options: {
    owner: string;
    repo: string;
    per_page: number;
  }): Promise<any> {
    try {
      this.oktokit = new Octokit({
        auth: GHClient.ACCESS_TOKEN,
      });
    } catch (err) {
      throw new Error(`[error] failed to instantiate oktokit: \n${err}\n`);
    }

    try {
      return await this.callWithRetry(() =>
        this.oktokit.request(
          "GET /repos/{owner}/{repo}/commits{?sha,path,author,since,until,per_page,page}",
          options
        )
      );
    } catch (err) {
      throw new Error(
        `[error] failed to make GET request to github API \n${err}\n`
      );
    }
  }

  sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  callWithRetry = async (
    fn: () => Promise<OctokitResponse<any, number>>,
    n: number = 0
  ) => {
    try {
      return await fn();
    } catch (err) {
      if (n > 7) {
        throw new Error(
          `[error] failed to GET data from endpoint after ${n} tries ${err}`
        );
      }
      await this.sleep(Math.pow(n, 2) + Math.floor(Math.random() * 1000));

      return this.callWithRetry(fn, n + 1);
    }
  };

  transformData(data: any[]): any[] {
    let transformedData: {
      name: string;
      email: string;
      date: string;
      message: string;
      sha: string;
      url: string;
    }[] = [
      {
        name: "",
        email: "",
        date: "",
        message: "",
        sha: "",
        url: "",
      },
    ];

    for (const item of data) {
      transformedData.push({
        name: item.commit.committer.name,
        email: item.commit.committer.email,
        date: item.commit.committer.date,
        message: item.commit.message,
        sha: item.commit.tree.sha,
        url: item.commit.tree.url,
      });
    }
    return transformedData;
  }
}

// const owner = prompt("Enter the username of the repository owner: ");
// const repo = prompt("Enter the name of the repository: ");
const owner = "hnucamendi";
const repo = "finance-tracker";

// TODO:handle pagination
const gh: GHClient = new GHClient();
const response = await gh.getCommitData({
  owner,
  repo,
  per_page: 100,
});

//TODO: generate file, csv? pdf? json? leave as console? render in browser?
console.log(gh.transformData(response.data));
