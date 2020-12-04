import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PanduanTopupAdminPage } from './panduan-topup-admin.page';

describe('PanduanTopupAdminPage', () => {
  let component: PanduanTopupAdminPage;
  let fixture: ComponentFixture<PanduanTopupAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanduanTopupAdminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PanduanTopupAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
