import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

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
  },
  {
    path: "lock-user",
    loadChildren: () =>
      import("./lock-user/lock-user.module").then((m) => m.LockUserPageModule),
  },
  {
    path: "topup-user",
    loadChildren: () =>
      import("./topup-user/topup-user.module").then(
        (m) => m.TopupUserPageModule
      ),
  },
  {
    path: "kategori",
    loadChildren: () =>
      import("./pages/kategori/kategori.module").then(
        (m) => m.KategoriPageModule
      ),
  },
  {
    path: "index",
    loadChildren: () =>
      import("./pages/index-user/index-user.module").then(
        (m) => m.IndexUserPageModule
      ),
  },
  {
    path: "payment",
    loadChildren: () =>
      import("./pages/payment/payment.module").then((m) => m.PaymentPageModule),
  },
  {
    path: "about-us",
    loadChildren: () =>
      import("./pages/about-us/about-us.module").then(
        (m) => m.AboutUsPageModule
      ),
  },
  {
    path: "topup-admin",
    loadChildren: () =>
      import("./pages/admin/topup-admin/topup-admin.module").then(
        (m) => m.TopupAdminPageModule
      ),
  },
  {
    path: "tambah-kategori",
    loadChildren: () =>
      import("./pages/admin/tambah-kategori/tambah-kategori.module").then(
        (m) => m.TambahKategoriPageModule
      ),
  },
  {
    path: "update-kategori",
    loadChildren: () =>
      import("./pages/admin/update-kategori/update-kategori.module").then(
        (m) => m.UpdateKategoriPageModule
      ),
  },
  {
    path: "home-admin",
    loadChildren: () =>
      import("./pages/admin/home-admin/home-admin.module").then(
        (m) => m.HomeAdminPageModule
      ),
  },  {
    path: 'history-admin',
    loadChildren: () => import('./pages/admin/history-admin/history-admin.module').then( m => m.HistoryAdminPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
