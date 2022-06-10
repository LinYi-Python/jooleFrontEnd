import { Injectable } from '@angular/core';
import {Product} from '../models/product';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Project} from '../models/project';
import {Current} from '../models/current';

const BACKEND_URL = environment.apiUrl + '/projectController/';
@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public products: Product[];
  public searchItem: string;
  public projects: Project[];

  public currentItems: Current[];
  constructor(private http: HttpClient) { }

  productsListener = new Subject<any>();

  projectsListener = new Subject<any>();

  currentListener = new Subject<any>();

  private getProductsListener() {
    return this.productsListener.asObservable();
  }

  private send() {
    this.productsListener.next(this.products);
  }

  private sendProject() {
    this.projectsListener.next(this.projects);
  }

  private getProjectListener() {
    return this.projectsListener.asObservable();
  }

  private sendCurrent() {
    this.currentListener.next(this.currentItems);
  }

  private getCurrent() {
    return this.currentListener.asObservable();
  }

  getProject(id: number): Project[] {
    this.http.get<Project[]>(BACKEND_URL + `findProjectsFromUser?id=${id}`).subscribe(
      response => {
        console.log(response);
        if (response) {
          this.projects = response;
        }
        else {
          this.projects = [];
        }
      }
    );
    return this.projects;
  }


  addProject(project_id: number, user_id: number) {
    this.http.get<Project>(BACKEND_URL + `addProjectToUser?project_id=${project_id}&user_id=${user_id}`).subscribe(
      response => {
        if (!this.projects) {
          console.log('nice job');
          this.projects = [];
        }
        this.projects.push(response);
        console.log('success to add ');
      },
      () => {
        console.log('fail to add');
      });
    this.sendProject();
  }

  deleteProject(project_id: number, user_id: number) {
    this.http.get(BACKEND_URL + `deleteProjectFromUser?project_id=${project_id}&user_id=${user_id}`).subscribe(
      () => {
        console.log('success to delete ');
      },
      () => {
        console.log('fail to delete');
      }
    );
    this.sendProject();
  }

  getProductFromProject(id: number){
    this.http.get<Current[]>(BACKEND_URL + `findProductsFromProject?id=${id}`).subscribe(
      response => {
        console.log('success');
        this.currentItems = response;
        console.log(this.currentItems);
        this.sendCurrent();
      },
      () => {
        console.log('fail');
      }
    );
    this.sendCurrent();
  }

  addProductToProject(product_id: number, project_id: number) {
    this.http.get(BACKEND_URL + `/addProductToProject?product_id=${product_id}&projectId=${project_id}`).subscribe(
      () => {
        console.log('success');
      }
    );
  }

  deleteProductFromProject(product_id: number, project_id: number) {
    this.http.get<Current[]>(BACKEND_URL + `deleteProductFromProject?product_id=${product_id}&project_id=${project_id}`).subscribe(
      () => {
        console.log('success');
      },
      () => {
        console.log('fail');
      }
    );
    this.sendCurrent();
  }

}


