import { Component, Renderer2, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-ad',
  standalone: true,
  imports: [],
  templateUrl: './ad.component.html',
  styleUrl: './ad.component.css'
})
export class AdComponent {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit() {
    this.addScript();
  }

  addScript() {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = '//cdn.carbonads.com/carbon.js?serve=CKYIE2JN&placement=madewithangularcom&format=cover';
    script.text = '';
    script.id = '_carbonads_js';
    script.async = true;
    script.defer = false;
    this.renderer.appendChild(this.el.nativeElement, script);
  }
}