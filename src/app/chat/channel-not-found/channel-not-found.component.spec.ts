import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelNotFoundComponent } from './channel-not-found.component';

describe('ChannelNotFoundComponent', () => {
  let component: ChannelNotFoundComponent;
  let fixture: ComponentFixture<ChannelNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
