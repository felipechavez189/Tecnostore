import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class CamaraService {
  constructor() {}

  // Función para tomar una foto y devolverla como Blob
  async takePhoto(): Promise<Blob> {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri, // Utilizamos URI para obtener la URL temporal
        source: CameraSource.Camera, // Tomar la foto con la cámara
        quality: 90, // Calidad de la imagen
      });

      // Convertimos la URL de la imagen en un Blob
      const response = await fetch(image.webPath!);
      const blob = await response.blob(); // Convertir la imagen a Blob
      return blob; // Devolvemos el Blob
    } catch (error) {
      console.error('Error al tomar la foto:', error);
      throw error; // Lanza el error para manejarlo en el componente
    }
  }

  // Función para elegir una imagen de la galería y devolverla como Blob
  async pickImage(): Promise<Blob> {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri, // Utilizamos URI para obtener la URL temporal
        source: CameraSource.Photos, // Seleccionar desde la galería
        quality: 90, // Calidad de la imagen
      });

      // Convertimos la URL de la imagen en un Blob
      const response = await fetch(image.webPath!);
      const blob = await response.blob(); // Convertir la imagen a Blob
      return blob; // Devolvemos el Blob
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
      throw error; // Lanza el error para manejarlo en el componente
    }
  }
}
