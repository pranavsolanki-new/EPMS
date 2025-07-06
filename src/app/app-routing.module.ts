import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './auth/role.guard';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './core/layout/layout.component';

const routes: Routes = [{ path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  {path:'',
  component:LayoutComponent,
  children:
  [
  { path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule),canActivate:[RoleGuard],data:{roles:['Admin','Project Manager'] }},
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),canActivate:[RoleGuard],data:{roles:['Admin','Project Manager','Developer'] }},
  { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule),canActivate:[RoleGuard],data:{roles:['Admin']} },
  { path: 'projects/:projectId/tasks', loadChildren: () => import('./tasks/task.module').then(m => m.TaskModule)},
    { path: 'notification', loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule) },
]
},
  {path:'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},

  {path:'**', redirectTo:'/dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
