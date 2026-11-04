import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-site',
  imports: [],
  templateUrl: './site.component.html',
  styleUrl: './site.component.css'
})
export class SiteComponent {
  @Input() site!: { 
    name: string; 
    category: string;
    url: string;
    image: string;
    version: string;
  };
}
