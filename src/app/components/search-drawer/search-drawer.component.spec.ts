import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDrawerComponent } from './search-drawer.component';

describe('SearchDrawerComponent', () => {
  let component: SearchDrawerComponent;
  let fixture: ComponentFixture<SearchDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
