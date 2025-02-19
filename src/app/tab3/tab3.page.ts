import { Component,signal } from '@angular/core';
import { LocationService } from '../services/location.service';
import { Position } from '@capacitor/geolocation';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {

  constructor(public locationService : LocationService) {}
  lat= signal(0)
  long = signal(0)
  async getLocationCoordinates()
  { 
    let pos : Position = await this.locationService.printCurrentPosition();
    this.lat.set(pos.coords.latitude)
    this.long.set(pos.coords.longitude)
  }
}
