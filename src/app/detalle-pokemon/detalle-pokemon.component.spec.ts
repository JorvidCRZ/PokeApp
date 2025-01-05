import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePokemonComponent } from './detalle-pokemon.component';

describe('DetallePokemonComponent', () => {
  let component: DetallePokemonComponent;
  let fixture: ComponentFixture<DetallePokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallePokemonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallePokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
