import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SitesHeroComponent } from '../sites-hero/sites-hero.component';
import { SiteListComponent } from '../site-list/site-list.component';

@Component({
  selector: 'app-sites',
  standalone: true,
  imports: [ 
    HeaderComponent,
    SitesHeroComponent,
    SiteListComponent,
    FooterComponent, 
  ],
  templateUrl: './sites.component.html',
  styleUrl: './sites.component.css'
})
export class SitesComponent {

}
