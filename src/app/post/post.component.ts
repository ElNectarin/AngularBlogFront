import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  AngularEditorModule,
  AngularEditorConfig,
} from '@kolkov/angular-editor';
import { PostService } from './post.service';
import { NavlinkComponent } from '../navlink/navlink.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    AngularEditorModule,
    ReactiveFormsModule,
    MatFormField,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    NavlinkComponent,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  blogTextGroup: FormGroup | any;

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.blogTextGroup = new FormGroup({
      title: new FormControl(''),
      text: new FormControl(''),
    });
  }

  console = console;

  config: AngularEditorConfig = {
    maxHeight: 'auto',
    width: 'auto',
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'yes',
    sanitize: true,
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [[]],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  onSubmit() {
    if (this.blogTextGroup.valid) {
      this.postService
        .createPost(
          this.blogTextGroup.get('title').value,
          this.blogTextGroup.get('text').value
        )
        .subscribe({
          next: (response) => {
            this.router.navigate([`blog/${response.id}`]);
            console.log('Post created:', response);
          },
          error: (error) => {
            console.error('Error creating post:', error);
          },
          complete: () => {
            console.log('Request complete');
          },
        });
    } else {
      console.log('Form is invalid');
    }
  }
}
