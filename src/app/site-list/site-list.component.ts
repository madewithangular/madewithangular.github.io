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
  filteredSites: Array<any> = sites;

  filterSites(searchText: string) {
    if (!searchText) {
      this.filteredSites = this.sites;
    } else {
      const lowerCaseSearchText = searchText.toLowerCase();
      this.filteredSites = this.sites.filter(site => 
        site.name.toLowerCase().includes(lowerCaseSearchText) || 
        site.category.toLowerCase().includes(lowerCaseSearchText)
      );
    }
  }

  onSearch(event: Event) {
    const searchText = (event.target as HTMLInputElement).value;
    this.filterSites(searchText);
  }
}