import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {

  // private userCredential = environment.loginCredentials
 
  private baseUrl = 'http://localhost:8080/users';
  private todoUrl ='http://localhost:8080/todos';
 
  constructor(private http: HttpClient) {
    
  }
 
  login(user:any): Observable<any> {
    return this.http.post<any>(this.baseUrl+'/login', user).pipe(
      map(response => {
        const token = response.token;
        const username = response.username;
        localStorage.setItem('token', token);
        localStorage.setItem('username',username);
        return token;
      })
    );
  }

  register(user: { username: string, password: string, role: string }): Observable<any> {
    return this.http.post<{ username: string }>(`${this.baseUrl}/create`, user).pipe(
      map(response => {
        const username = response.username;
        localStorage.setItem('username', username);
        return response;
      })
    );
  }

  checkUsernameAvailability(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/register?username=${username}`);
  }
  

  tasks():Observable<any[]> {
    return this.http.get<any[]>(`${this.todoUrl}`)
  }

  addTodo(title:string,description:string): Observable<any> {
   const tasks = {title,description}
    return this.http.post<any>(`${this.todoUrl}/create`,tasks)
  }

  updateTodo(id:number,title:string,description:string): Observable<any> {
    const tasks = {title,description}
     return this.http.put<any>(`${this.todoUrl}/${id}`,tasks)
   }

   deleteTodo(id:number): Observable<any> {
    console.log(id);
     return this.http.delete<any>(`${this.todoUrl}/${id}`)
   }

  

}
