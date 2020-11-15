import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TopupAdminPage } from './topup-admin.page';

describe('TopupAdminPage', () => {
  let component: TopupAdminPage;
  let fixture: ComponentFixture<TopupAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopupAdminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TopupAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
