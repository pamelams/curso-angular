import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({providedIn: 'root'})
export class PostsService {

    constructor(private http: HttpClient) {}
    
    createAndStorePost(title: string, content: string) {
        const postData: Post = {title: title, content: content};
        return this.http.post<{name: string}>(
            'https://http-01-backend-default-rtdb.firebaseio.com/posts.json', 
            postData
            );
    }

    fetchPosts() {
        return this.http.get<{[key: string]: Post}>(
            'https://http-01-backend-default-rtdb.firebaseio.com/posts.json', 
            { headers: new HttpHeaders({'Custom-Header': 'Hello'}) }
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
        return this.http.delete('https://http-01-backend-default-rtdb.firebaseio.com/posts.json');
    }
}