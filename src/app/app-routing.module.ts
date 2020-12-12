import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from './services/auth-guard.service';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo} from '@angular/fire/auth-guard';
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./pages/home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "register",
    loadChildren: () =>
      import("./pages/register/register.module").then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: "history",
    loadChildren: () =>
      import("./history/history.module").then((m) => m.HistoryPageModule),
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: "lock-user",
    loadChildren: () =>
      import("./lock-user/lock-user.module").then((m) => m.LockUserPageModule),
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: "topup-user",
    loadChildren: () =>
      import("./topup-user/topup-user.module").then(
        (m) => m.TopupUserPageModule
      ),
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: "kategori",
    loadChildren: () =>
      import("./pages/kategori/kategori.module").then(
        (m) => m.KategoriPageModule
      ),
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: "index",
    loadChildren: () =>
      import("./pages/index-user/index-user.module").then(
        (m) => m.IndexUserPageModule
      ),
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: "payment",
    loadChildren: () =>
      import("./pages/payment/payment.module").then((m) => m.PaymentPageModule),
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: "about-us",
    loadChildren: () =>
      import("./pages/about-us/about-us.module").then(
        (m) => m.AboutUsPageModule
      ),
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: "topup-admin",
    loadChildren: () =>
      import("./pages/admin/topup-admin/topup-admin.module").then(
        (m) => m.TopupAdminPageModule
      ),
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: "tambah-kategori",
    loadChildren: () =>
      import("./pages/admin/tambah-kategori/tambah-kategori.module").then(
        (m) => m.TambahKategoriPageModule
      ),
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: "update-kategori",
    loadChildren: () =>
      import("./pages/admin/update-kategori/update-kategori.module").then(
        (m) => m.UpdateKategoriPageModule
      ),
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: "home-admin",
    loadChildren: () =>
      import("./pages/admin/home-admin/home-admin.module").then(
        (m) => m.HomeAdminPageModule
      ),
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: "log-lock-admin",
    loadChildren: () =>
      import("./pages/admin/log-lock-admin/log-lock-admin.module").then(
        (m) => m.LogLockAdminPageModule
      ),
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: "data-pengguna-admin",
    loadChildren: () =>
      import(
        "./pages/admin/data-pengguna-admin/data-pengguna-admin.module"
      ).then((m) => m.DataPenggunaAdminPageModule),
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: "unlock-admin",
    loadChildren: () =>
      import("./pages/admin/unlock-admin/unlock-admin.module").then(
        (m) => m.UnlockAdminPageModule
      ),
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./pages/profile/profile.module").then((m) => m.ProfilePageModule),
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path: "panduan-topup-admin",
    loadChildren: () =>
      import(
        "./pages/admin/panduan-topup-admin/panduan-topup-admin.module"
      ).then((m) => m.PanduanTopupAdminPageModule),
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin}
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
