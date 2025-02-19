import { Component, signal } from '@angular/core';
import { RecordingService } from '../services/recording.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  // micFunction = signal(this.askForPermission())

  icon = signal("mic")
  constructor(public recordingService : RecordingService) {}

  askForPermission()
  {

    if(this.icon() === "mic")
    {
      this.icon.set('stop')
      this.recordingService.startRecording(); 
    }

    else
    {
      this.icon.set('mic')
      this.recordingService.stopRecording()
    }
    // this.micFunction.set(this.stopRecording());
  }

}
