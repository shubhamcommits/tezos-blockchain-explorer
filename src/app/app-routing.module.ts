import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [

  // Redirect the main route of the application to /home
  { path: '', redirectTo: '/home', pathMatch: 'full' },


  // Adding table module and lazy loading the same on the home route
  {
    path: 'home',
    loadChildren: () => import('src/modules/table/table.module')
      .then((module) => module.TableModule)
  },

  // Default Route - if the route is not found in app scope
  {
    path: '**',
    component: PageNotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
