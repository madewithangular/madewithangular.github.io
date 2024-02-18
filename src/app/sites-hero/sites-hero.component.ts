import { Component } from '@angular/core';
import { NgIf, DatePipe } from '@angular/common';
const fs = require('fs');
const yaml = require('js-yaml');

const fileContents = fs.readFileSync('./changelog.yaml', 'utf8');
const changelog = yaml.load(fileContents);

@Component({
  selector: 'app-sites-hero',
  standalone: true,
  imports: [NgIf, DatePipe],
  templateUrl: './sites-hero.component.html',
  styleUrl: './sites-hero.component.css'
})
export class SitesHeroComponent {
  status = changelog[0]
}