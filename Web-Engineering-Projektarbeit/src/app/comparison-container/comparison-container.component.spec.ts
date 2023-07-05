import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComparisonContainerComponent } from './comparison-container.component';

describe('ComparisonContainerComponent', () => {
  let component: ComparisonContainerComponent;
  let fixture: ComponentFixture<ComparisonContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparisonContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComparisonContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
