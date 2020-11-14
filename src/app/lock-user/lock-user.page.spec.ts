import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LockUserPage } from './lock-user.page';

describe('LockUserPage', () => {
  let component: LockUserPage;
  let fixture: ComponentFixture<LockUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LockUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
