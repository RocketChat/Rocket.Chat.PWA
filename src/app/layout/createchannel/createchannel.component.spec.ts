import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatechannelComponent } from './createchannel.component';

describe('CreatechannelComponent', () => {
  let component: CreatechannelComponent;
  let fixture: ComponentFixture<CreatechannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatechannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatechannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
