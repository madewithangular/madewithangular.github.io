import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitesHeroComponent } from './sites-hero.component';

describe('SitesHeroComponent', () => {
  let component: SitesHeroComponent;
  let fixture: ComponentFixture<SitesHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SitesHeroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SitesHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
