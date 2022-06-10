import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  data = [
    'Airfoils – Moso bamboo – 60” diameter',
    'Airfoil Finishes – Caramel Bamboo or Cocoa Bamboo',
    'Hardware Finishes – Satin Nickel,Oil-Rubbed Bronze, Black or White',
    'Motor – EC motor with digital inverter drive',
    'Exceeds ENERGY STAR fan efficiency requirements by up to 1200%',
    'Controls – Remote control Remote control (included), Haiku Home mobile app, Haiku Wall Control (optional), or Amazon Alexa-enabled devices (optional)',
    'Onboard Sensors – Ambient and surface temperature, relative humidity, and passive infrared sensors enable SenseME technology. Technology lets you automate your fan’s operation to maximize convenience and energy savings',
    'Environment –  Indoor use only',
    'Accessories – Haiku Light Kit and Haiku Wall Control. See respective spec sheets for details. A Tall Ceiling Kit and Stabilizer Kit are available for ceilings 14 feet (4.3 meters) or taller',
    'Patented LED light module (optional) seamlessly integrates with the body of the fan',
    'Made in the U.S.A.'
  ];

  public product: Product;

  scrollContainer = document.getElementById('sc-container');

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    if (this.productService.product) {
      this.product = this.productService.product;
      sessionStorage.setItem('currentItem', JSON.stringify(this.product));
    }
    else {
      this.product = JSON.parse(<string>sessionStorage.getItem('currentItem'));
    }
  }

  clearSession() {
    sessionStorage.removeItem('currentItem');
  }

}
