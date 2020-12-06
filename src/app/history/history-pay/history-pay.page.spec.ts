import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistoryPayPage } from './history-pay.page';

describe('HistoryPayPage', () => {
  let component: HistoryPayPage;
  let fixture: ComponentFixture<HistoryPayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryPayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryPayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
