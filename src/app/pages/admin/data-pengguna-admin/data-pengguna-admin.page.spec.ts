import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DataPenggunaAdminPage } from './data-pengguna-admin.page';

describe('DataPenggunaAdminPage', () => {
  let component: DataPenggunaAdminPage;
  let fixture: ComponentFixture<DataPenggunaAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataPenggunaAdminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DataPenggunaAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
