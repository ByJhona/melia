import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMediumComponent } from './card-medium-component';

describe('CardMediumComponent', () => {
  let component: CardMediumComponent;
  let fixture: ComponentFixture<CardMediumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardMediumComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardMediumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
