import { Component } from '@angular/core';
import { NgIf, DatePipe } from '@angular/common';
import changelogData from '../../../changelog.json';

@Component({
  selector: 'app-sites-hero',
  standalone: true,
  imports: [NgIf, DatePipe],
  templateUrl: './sites-hero.component.html',
  styleUrl: './sites-hero.component.css'
})
export class SitesHeroComponent {
  status = changelogData[0]
}