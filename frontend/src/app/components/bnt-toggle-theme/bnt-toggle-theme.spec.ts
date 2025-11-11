import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BntToggleTheme } from './bnt-toggle-theme';

describe('BntToggleTheme', () => {
  let component: BntToggleTheme;
  let fixture: ComponentFixture<BntToggleTheme>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BntToggleTheme]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BntToggleTheme);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
