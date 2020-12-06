import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistoryLockPage } from './history-lock.page';

describe('HistoryLockPage', () => {
  let component: HistoryLockPage;
  let fixture: ComponentFixture<HistoryLockPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryLockPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryLockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
