import { Component, OnInit } from '@angular/core';

import { Project } from '../project';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})

export class ProjectCreateComponent implements OnInit {

  constructor() { }

  project : Project = new Project();

  text:string;

  ngOnInit() {
  }

}
