import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostnameComponent } from './hostname.component';

describe('HostnameComponent', () => {
  let component: HostnameComponent;
  let fixture: ComponentFixture<HostnameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostnameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
