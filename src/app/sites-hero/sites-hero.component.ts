import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import changelogData from '../../../changelog.json';

@Component({
  selector: 'app-sites-hero',
  imports: [DatePipe],
  templateUrl: './sites-hero.component.html',
  styleUrl: './sites-hero.component.css'
})
export class SitesHeroComponent {
  status = changelogData[0]
}