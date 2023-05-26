import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching = false;
  error = null;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    this.postsService.createAndStorePost(postData.title, postData.content).
    subscribe(responseData => {
      console.log(responseData);
      this.onFetchPosts();
  }, error => {
    this.error = 'Error ' + error.status + ' ' + error.statusText;
  });    
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.error = 'Error ' + error.status + ' ' + error.statusText;
      this.isFetching = false;
    });
  }

  onClearPosts() {
    this.postsService.clearPosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  onHandleError() {
    console.log(this.error, !!this.error);
    this.error = null;
    console.log(this.error, !!this.error);
  }
}
