import sitesData from '../../sites.json';

export interface Site {
  name: string;
  description: string;
  url: string;
  image: string;
  submitter: string;
  created_at: string;
  updated_at: string;
}

export const sites = sitesData;