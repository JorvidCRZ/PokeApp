import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaFavoritoComponent } from './lista-favorito.component';

describe('ListaFavoritoComponent', () => {
  let component: ListaFavoritoComponent;
  let fixture: ComponentFixture<ListaFavoritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaFavoritoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaFavoritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
