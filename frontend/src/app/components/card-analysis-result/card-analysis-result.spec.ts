import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAnalysisResult } from './card-analysis-result';

describe('CardAnalysisResult', () => {
  let component: CardAnalysisResult;
  let fixture: ComponentFixture<CardAnalysisResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAnalysisResult]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardAnalysisResult);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
