import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { SiteComponent } from '../site/site.component';
import { AdComponent } from '../ad/ad.component';
import { sites } from '../sites';

@Component({
  selector: 'app-site-list',
  standalone: true,
  imports: [
    SiteComponent,
    AdComponent,
    NgFor,
    NgIf,
  ],
  templateUrl: './site-list.component.html',
  styleUrl: './site-list.component.css'
})
export class SiteListComponent {
  sites: Array<any> = sites;
}
