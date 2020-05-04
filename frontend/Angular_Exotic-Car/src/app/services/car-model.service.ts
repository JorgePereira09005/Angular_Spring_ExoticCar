import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { CarModel } from '../common/car-model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Brand } from '../common/brand';
import { Post } from '../common/post';
import { ɵNullViewportScroller } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CarModelService {

  private baseUrl= 'http://localhost:8080/api/carModels';
  private brandUrl = 'http://localhost:8080/api/brands';

  constructor(private httpClient: HttpClient) { }

  getCarModelList(brandId: number) {
    const searchUrl = `${this.baseUrl}/search/findByBrandId?id=${brandId}`;

    return this.getCarModels(searchUrl);
  }

  getCarModelListPaginate(page: number, pageSize: number, brandId: number): Observable<GetResponseCarModels> {
    const searchUrl = `${this.baseUrl}/search/findByBrandId?id=${brandId}&page=${page}&size=${pageSize}`

    return this.httpClient.get<GetResponseCarModels>(searchUrl);
  }

  getBrands(): Observable<Brand[]> {
    return this.httpClient.get<GetResponseBrand>(this.brandUrl)
      .pipe(map( response => response._embedded.brands ) );
  }

  searchCarModels(keyword: string) {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;
    
    return this.getCarModels(searchUrl);
  }

  searchCarModelsPaginate(page: number, pageSize: number, keyword: string) {
    //build url based on keyword, page number and pagesize
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}&page=${page}`
      +`&size=${pageSize}`;

      return this.httpClient.get<GetResponseCarModels>(searchUrl);
  }

  private getCarModels(searchUrl: string): Observable<CarModel[]> {
    return this.httpClient.get<GetResponseCarModels>(searchUrl)
      .pipe(map (response => response._embedded.carModels) );
  }

  getCarModel(carModelId: number): Observable<CarModel> {
    const searchUrl = `${this.baseUrl}/${carModelId}`;

    return this.httpClient.get<CarModel>(searchUrl);
  }

  getPosts(carModelId: number) : Observable<Post[]>{
    const searchUrl = `${this.baseUrl}/${carModelId}/posts`;

    return this.httpClient.get<GetCarModelPosts>(searchUrl)
      .pipe(map (response => response._embedded.posts) );
  }

  postMessage(carModelId: number, postContent: string, posterName: string): Observable<Post> {
    const postUrl = `http://localhost:8080/api/posts`;

    const dateTime = new Date();
    const date = dateTime;

    return this.httpClient.post<Post>(postUrl, 
      {
        "posterName": posterName, 
        "datePost": date,
        "content": postContent, 
        "carModel": `http://localhost:8080/api/carModels/${carModelId}`
      });
  }

}

//unwraps the json from spring data rest _embedded entry 
interface GetResponseCarModels {
  _embedded: {
    carModels: CarModel[];
  },
  page:{
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetCarModelPosts {
  _embedded: {
    posts: Post[];
  }
}

interface GetResponseBrand {
  _embedded: {
    brands: Brand[];
  }
}
