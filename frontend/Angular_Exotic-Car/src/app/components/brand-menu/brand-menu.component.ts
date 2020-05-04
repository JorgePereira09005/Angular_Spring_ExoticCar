import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/common/brand';
import { CarModelService } from 'src/app/services/car-model.service';

@Component({
  selector: 'app-brand-menu',
  templateUrl: './brand-menu.component.html',
  styleUrls: ['./brand-menu.component.css']
})
export class BrandMenuComponent implements OnInit {

  brands: Brand[];

  constructor(private carModelService: CarModelService) { }

  ngOnInit(): void {
    this.listBrands();
  }

  listBrands() {
    this.carModelService.getBrands().subscribe(
      data => {
        console.log('Car brands =' + JSON.stringify(data));
        this.brands = data;
      }
    )
  }

}
