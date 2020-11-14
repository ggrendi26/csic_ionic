import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TopupUserPage } from './topup-user.page';

describe('TopupUserPage', () => {
  let component: TopupUserPage;
  let fixture: ComponentFixture<TopupUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopupUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TopupUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
