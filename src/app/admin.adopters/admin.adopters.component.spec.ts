import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdoptersComponent } from './admin.adopters.component';

describe('AdminAdoptersComponent', () => {
  let component: AdminAdoptersComponent;
  let fixture: ComponentFixture<AdminAdoptersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAdoptersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAdoptersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
