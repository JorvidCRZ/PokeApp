import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTodoComponent } from './lista-todo.component';

describe('ListaTodoComponent', () => {
  let component: ListaTodoComponent;
  let fixture: ComponentFixture<ListaTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaTodoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
