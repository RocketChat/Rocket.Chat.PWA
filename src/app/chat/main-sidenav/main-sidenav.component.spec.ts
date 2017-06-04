import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSidenavComponent } from './main-sidenav.component';

describe('MainSidenavComponent', () => {
  let component: MainSidenavComponent;
  let fixture: ComponentFixture<MainSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
