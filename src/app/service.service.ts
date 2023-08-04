import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './Model/user';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/users');
  }

  AddUser(data: any): Observable<User[]> {
    return this.http.post<User[]>('http://localhost:3000/users', data);
  }
  UpdateUser(userId: any, data: any): Observable<User> {
    return this.http.put<User>(`http://localhost:3000/users/${userId}`, data);
  }
  deleteUser(userId: any): Observable<User[]> {
    return this.http.delete<User[]>(`http://localhost:3000/users/${userId}`);
  }

  getUserById(userId: any): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:3000/users/${userId}`);
  }
}
