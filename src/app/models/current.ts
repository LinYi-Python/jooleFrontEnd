import {Project} from './project';
import {Product} from './product';

export interface Current {
  id: number;
  project: Project;
  product: Product;
}
