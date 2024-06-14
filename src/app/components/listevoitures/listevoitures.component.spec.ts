import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListevoituresComponent } from './listevoitures.component';

describe('ListevoituresComponent', () => {
  let component: ListevoituresComponent;
  let fixture: ComponentFixture<ListevoituresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListevoituresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListevoituresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
