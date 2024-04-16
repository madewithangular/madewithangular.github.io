import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-site',
  standalone: true,
  imports: [NgIf],
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
