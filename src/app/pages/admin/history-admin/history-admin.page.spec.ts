import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistoryAdminPage } from './history-admin.page';

describe('HistoryAdminPage', () => {
  let component: HistoryAdminPage;
  let fixture: ComponentFixture<HistoryAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryAdminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
