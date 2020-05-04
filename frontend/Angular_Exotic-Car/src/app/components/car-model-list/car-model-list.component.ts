import { Component, OnInit } from '@angular/core';
import { CarModel } from 'src/app/common/car-model';
import { CarModelService } from 'src/app/services/car-model.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-model-list',
  templateUrl: './car-model-list.component.html',
  styleUrls: ['./car-model-list.component.css']
})
export class CarModelListComponent implements OnInit {

  carModels: CarModel[];
  currentBrandId: number = 1;
  previousBrandId: number = 1;
  currentBrandName: string;
  searchMode: boolean = false;

  pageNumber: number = 1;
  pageSize: number = 3;
  totalElements: number = 0;
  
  previousKeyword: string = null;

  constructor(private carModelService: CarModelService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( () => {
      this.listCarModels(); 
    } );
  }

  listCarModels() {

    //if the parameter 'keyword' exists, then a search caused the logic to be routed here,
    //and searching adds a 'keyword' to the route, which will be detected here
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode) {
      this.handleSearchCarModels();
    }
    else {
      this.handleListCarModels();
    }

  }

  handleListCarModels() {

    const hasBrandId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasBrandId) {
      this.currentBrandId = +this.route.snapshot.paramMap.get('id');
      this.currentBrandName = this.route.snapshot.paramMap.get('brandName');
    }
    else {
      this.currentBrandId = 1;
      this.currentBrandName = 'Lamborghini';
    }

    if (this.previousBrandId != this.currentBrandId) {
      this.pageNumber = 1;
    }

    this.previousBrandId = this.currentBrandId;

    this.carModelService.getCarModelListPaginate(this.pageNumber-1, this.pageSize, this.currentBrandId).subscribe(this.processResult());

  }

  handleSearchCarModels() {

    const keyword: string = this.route.snapshot.paramMap.get('keyword');

    //if the search word changes, reset page number to 1
    if (this.previousKeyword != keyword) {
      this.pageNumber = 1;
    }

    this.previousKeyword = keyword;

    //search for cars with the keyword
    // TODO: add searchCarModelsPaginate
    this.carModelService.searchCarModelsPaginate(this.pageNumber-1, this.pageSize, keyword).subscribe(this.processResult());
  }

  processResult() {
    return data=> {
      this.carModels = data._embedded.carModels;
      this.pageNumber = data.page.number + 1; // spring data rest pages are 0 based
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    }
  }

}
