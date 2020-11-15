import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TambahKategoriPage } from './tambah-kategori.page';

describe('TambahKategoriPage', () => {
  let component: TambahKategoriPage;
  let fixture: ComponentFixture<TambahKategoriPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TambahKategoriPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TambahKategoriPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
