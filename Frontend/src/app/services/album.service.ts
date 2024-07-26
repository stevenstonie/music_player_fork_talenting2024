import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from '../models/album';
 
@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private apiUrl = "";
 
  constructor(private http: HttpClient) {}
 
  getAlbumDetails(albumId: string): Observable<Album> {
    return this.http.get<Album>(`${this.apiUrl}/albums/${albumId}`);
  }
 
  getAllAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.apiUrl}/albums`);
  }
 
}