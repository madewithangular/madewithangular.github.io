import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-site',
  standalone: true,
  imports: [],
  templateUrl: './site.component.html',
  styleUrl: './site.component.css'
})
export class SiteComponent {
  @Input() site!: { 
    name: string; 
    description: string;
    url: string;
    image: string;
  };
}
