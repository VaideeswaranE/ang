import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowersListComponent } from './borrowers-list.component';

describe('BorrowersListComponent', () => {
  let component: BorrowersListComponent;
  let fixture: ComponentFixture<BorrowersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowersListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrowersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
