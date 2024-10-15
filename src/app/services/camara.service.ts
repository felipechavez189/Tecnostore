import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class CamaraService {
  constructor() {}

  // Función para tomar una foto
  async takePhoto(): Promise<string> {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri, // Puedes usar CameraResultType.Base64 si lo prefieres
        source: CameraSource.Camera, // Tomar foto con la cámara
        quality: 90, // Calidad de la imagen
      });

      return image.webPath || ''; // Devuelve la URL de la imagen
    } catch (error) {
      console.error('Error al tomar la foto:', error);
      throw error; // Lanza el error para manejarlo en el componente
    }
  }

  // Función para elegir una imagen de la galería
  async pickImage(): Promise<string> {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos, // Elegir de la galería
        quality: 90,
      });

      return image.webPath || ''; // Devuelve la URL de la imagen
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
      throw error; // Lanza el error para manejarlo en el componente
    }
  }
}
