import sanityClient from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config();

export default sanityClient({
  projectId: 'js9o06i3',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2022-06-06',
  token: process.env.SANITY_TOKEN,
});
