import Fuse from 'fuse.js';
import { Course } from './item';

export function createFuse(list: Course[]) {


  const options = {
    includeScore: true,
    keys: ['title_en'],
  }

  const index = Fuse.createIndex(options.keys, list);
  const fuse = new Fuse(list, options, index)

  return fuse;
}
