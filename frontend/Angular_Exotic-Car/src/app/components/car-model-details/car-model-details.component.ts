import { Component, OnInit } from '@angular/core';
import { CarModel } from 'src/app/common/car-model';
import { CarModelService } from 'src/app/services/car-model.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/common/post';

@Component({
  selector: 'app-car-model-details',
  templateUrl: './car-model-details.component.html',
  styleUrls: ['./car-model-details.component.css']
})
export class CarModelDetailsComponent implements OnInit {

  carModel: CarModel = new CarModel();
  posts: Post[];

  constructor(private carModelService: CarModelService, 
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( ()=> {
      this.handleCarModelDetails();
    } )
  }

  handleCarModelDetails() {
    const carModelId = +this.route.snapshot.paramMap.get('id');

    this.carModelService.getCarModel(carModelId).subscribe( 
      data => {
        this.carModel = data;
      }
    )

    this.carModelService.getPosts(carModelId).subscribe(
      data => {
        this.posts = data;
      }
    )
  }

  sendMessage(carModelId: number, postContent: string, posterName: string) {
    if(!posterName) {
      posterName = 'Anonymous';
    }

    this.carModelService.postMessage(carModelId, postContent, posterName)
      .subscribe( data => this.posts.push(data));
  }


}
