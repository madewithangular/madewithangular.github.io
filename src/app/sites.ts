const fs = require('fs');
const yaml = require('js-yaml');

export interface Site {
  name: string;
  description: string;
  url: string;
  image: string;
  submitter: string;
  created_at: string;
  updated_at: string;
}

const fileContents = fs.readFileSync('./sites.yaml', 'utf8');
export const sites = yaml.load(fileContents);