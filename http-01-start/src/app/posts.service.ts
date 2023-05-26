import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { map, catchError, tap } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({providedIn: 'root'})
export class PostsService {

    constructor(private http: HttpClient) {}
    
    createAndStorePost(title: string, content: string) {
        const postData: Post = {title: title, content: content};
        return this.http.post<{name: string}>(
            'https://http-01-backend-default-rtdb.firebaseio.com/posts.json', 
            postData, {
              observe: 'response'
            }
          );
    }

    fetchPosts() {
      let searchParams = new HttpParams();
      searchParams = searchParams.append('print', 'pretty');
      searchParams = searchParams.append('custom', 'key');
        return this.http.get<{[key: string]: Post}>(
            'https://http-01-backend-default-rtdb.firebaseio.com/posts.json', { 
              headers: new HttpHeaders({'Custom-Header': 'Hello'}),
              params: searchParams
            }
            ).pipe(map((responseData) => {
              const postsArray: Post[] = [];
              for(const key in responseData) {
                if(responseData.hasOwnProperty(key)) {
                  postsArray.push({ ...responseData[key], id: key })
                }
              }
              return postsArray;
            }), catchError(errorRes => {
              return throwError(errorRes);
            }));
    }

    clearPosts() {
        return this.http.delete('https://http-01-backend-default-rtdb.firebaseio.com/posts.json', {
          observe: 'events'
        }).pipe(tap(event => {
          console.log(event);
          if(event.type === HttpEventType.Sent) {
            // ...
          }
          if(event.type === HttpEventType.Response) {
            console.log(event.body)
          }
        }));
    }
}