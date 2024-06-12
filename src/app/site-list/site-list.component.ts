import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
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
    HttpClientModule,
    CommonModule,
  ],
  templateUrl: './site-list.component.html',
  styleUrl: './site-list.component.css'
})
export class SiteListComponent {
  sites: Array<any> = sites;
  filteredSites: Array<any> = sites;
  latestVersion: string = '';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.fetchLatestVersion();
  }

  fetchLatestVersion() {
    this.http
      .get('https://registry.npmjs.org/@angular/core/latest')
      .subscribe((data: any) => {
        this.latestVersion = data.version;
        this.updateSiteVersions();
      });
  }

  updateSiteVersions() {
    this.filteredSites = this.sites.map((site) => {
      if (site.version === '0.0.0-PLACEHOLDER') {
        site.version = `${this.latestVersion}`;
      } else {
        site.version = `${site.version}`;
      }
      return site;
    });
  }  

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