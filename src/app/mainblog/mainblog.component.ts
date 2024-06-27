import { Component, OnInit } from '@angular/core';
import { AuthorinfoComponent } from '../authorinfo/authorinfo.component';
import { NavlinkComponent } from '../navlink/navlink.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Comment, Post } from '../mainblogpage/mainblogpage.interface';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PostService } from '../post/post.service';
import { LoginService } from '../login/login.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-mainblog',
  standalone: true,
  imports: [
    AuthorinfoComponent,
    NavlinkComponent,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './mainblog.component.html',
  styleUrl: './mainblog.component.css',
})
export class MainblogComponent implements OnInit {
  postId!: number;
  post = {} as Post;
  comments: Comment[] = [];
  cyberPunkImg = 'assets/usersImages/cyberpunk.jpg';
  userName = this.loginService.getUsername();

  commentFormGroup: FormGroup | any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private postService: PostService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.postId = +params['id'];
    });
    this.commentFormGroup = new FormGroup({
      commentText: new FormControl(''),
    });
    try {
      this.getPosts();
    } catch (error) {
      console.log('network error', error);
    }
  }

  getPosts() {
    this.postService.getPost(this.postId).subscribe((data: any) => {
      this.post = data;
      this.comments = data.comments;
    });
  }

  onSubmit() {
    this.postService
      .createComment(
        this.commentFormGroup.get('commentText').value,
        this.post.id
      )
      .subscribe(() => this.getPosts());
  }
}
