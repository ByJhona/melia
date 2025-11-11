import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFormAnalizeComponent } from './card-form-analize-component';

describe('CardFormAnalizeComponent', () => {
  let component: CardFormAnalizeComponent;
  let fixture: ComponentFixture<CardFormAnalizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardFormAnalizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardFormAnalizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
