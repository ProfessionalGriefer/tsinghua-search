'use server'
import { Course } from './item';

export async function queryData() {
  const url = "http://127.0.0.1:8000/example";
  const options = {};
  console.log(url);
  const response = await fetch(url, options);
  console.log(response);
  return response.json() as Promise<Course[]>;
}
