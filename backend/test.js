import { Octokit } from "octokit";
import * as dotenv from "dotenv";
dotenv.config();
/** Class representing GitHubs Octokit API client */
export default class GHClient {
    // TODO: Add ability for user to set password
    // TODO: store hashed pass, use pass to hash ACCESSTOKEN
    ACCESS_TOKEN = process.env.ACCESSTOKEN;
    oktokit;
    async getCommitData(options) {
        try {
            this.oktokit = new Octokit({
                auth: this.ACCESS_TOKEN,
            });
        }
        catch (err) {
            throw new Error(`[error] failed to instantiate oktokit: \n${err}\n`);
        }
        try {
            return await this.callWithRetry(() => this.oktokit.request("GET /repos/{owner}/{repo}/commits{?sha,path,author,since,until,per_page,page}", options));
        }
        catch (err) {
            throw new Error(`[error] failed to make GET request to github API \n${err}\n`);
        }
    }
    sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    callWithRetry = async (fn, n = 0) => {
        try {
            return await fn();
        }
        catch (err) {
            if (n > 3) {
                throw new Error(`[error] failed to GET data from endpoint after ${n} tries ${err}`);
            }
            await this.sleep(Math.pow(n, 2) + Math.floor(Math.random() * 1000));
            return this.callWithRetry(fn, n + 1);
        }
    };
    transformData(data) {
        let transformedData = [];
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
// TODO:handle pagination
//TODO: generate file, csv? pdf? json? leave as console? render in browser?
