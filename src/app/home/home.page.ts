import { Component } from '@angular/core';
import { ServiceBDService } from '../services/service-bd.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private bd: ServiceBDService) {
    
  }

}
