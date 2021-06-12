import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoRegistroComponent } from './novo-registro.component';

describe('NovoRegistroComponent', () => {
  let component: NovoRegistroComponent;
  let fixture: ComponentFixture<NovoRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
