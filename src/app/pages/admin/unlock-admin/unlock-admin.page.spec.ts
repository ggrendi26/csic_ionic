import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UnlockAdminPage } from './unlock-admin.page';

describe('UnlockAdminPage', () => {
  let component: UnlockAdminPage;
  let fixture: ComponentFixture<UnlockAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnlockAdminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UnlockAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
