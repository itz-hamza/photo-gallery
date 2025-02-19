import { Injectable } from '@angular/core';
import { VoiceRecorder, GenericResponse, RecordingOptions } from 'capacitor-voice-recorder';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class RecordingService {
  constructor() { }

  public async askForPermission(): Promise<void> {
    const requestResult: GenericResponse = await VoiceRecorder.requestAudioRecordingPermission();
    console.log('Permission requested:', requestResult.value);

    const hasPermission: GenericResponse = await VoiceRecorder.hasAudioRecordingPermission();
    console.log('Has permission:', hasPermission.value);
  }

  public async startRecording(): Promise<void> {

    const requestResult: GenericResponse = await VoiceRecorder.requestAudioRecordingPermission();

    // Define options for recording
    const options: RecordingOptions = {
      directory: Directory.Data, // or choose another appropriate directory
      // Optionally add: subDirectory: 'voice-recordings'
    };

    try {
      const result: GenericResponse = await VoiceRecorder.startRecording();
      console.log('Recording started:', result.value);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  }

  public async stopRecording(): Promise<void> {
    try {
      const recordingData = await VoiceRecorder.stopRecording();
      console.log('Recording stopped:', recordingData);

      // Optionally, save the recording if base64 data is provided
      if (recordingData && recordingData.value.recordDataBase64) {
        await Filesystem.writeFile({
          path: 'recording.m4a',
          data: recordingData.value.recordDataBase64,
        });
        console.log('Recording saved to filesystem.');
      }
      const base64Sound = recordingData.value.recordDataBase64 // from plugin
      const mimeType = recordingData.value.mimeType  // from plugin
      const audioRef = new Audio(`data:${mimeType};base64,${base64Sound}`)
      audioRef.oncanplaythrough = () => audioRef.play()
      audioRef.load()
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  }
}
