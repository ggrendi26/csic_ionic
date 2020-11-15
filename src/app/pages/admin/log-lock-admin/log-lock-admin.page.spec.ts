import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LogLockAdminPage } from './log-lock-admin.page';

describe('LogLockAdminPage', () => {
  let component: LogLockAdminPage;
  let fixture: ComponentFixture<LogLockAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogLockAdminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LogLockAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
