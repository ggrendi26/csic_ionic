import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateKategoriPage } from './update-kategori.page';

describe('UpdateKategoriPage', () => {
  let component: UpdateKategoriPage;
  let fixture: ComponentFixture<UpdateKategoriPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateKategoriPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateKategoriPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
