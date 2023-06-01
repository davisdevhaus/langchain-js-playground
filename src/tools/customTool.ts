//generate a custom langchain tool

import { Tool } from "langchain/tools";

export default class MakeWebhookTool extends Tool {
  name: string;
  description: string;
  url: string;
  token: string;
  constructor(
    makeWebhookURL: string,
    makeWebhookToken: string,
    makeWebhookName: string,
    makeWebhookDescription: string
  ) {
    super();
    this.name = makeWebhookName;
    this.description = makeWebhookDescription;
    this.url = makeWebhookURL;
    this.token = makeWebhookToken;
  }
  async call(input: string): Promise<string> {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.token}`,
    };
    const body = {
      input,
    };
    const response = await fetch(this.url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    const json = await response.json();
    return json.output;
  }
}
