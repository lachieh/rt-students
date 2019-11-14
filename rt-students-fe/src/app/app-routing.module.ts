import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentIndexComponent } from './student-index/student-index.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentNewComponent } from './student-new/student-new.component';

const routes: Routes = [
  { path: '', redirectTo: '/students', pathMatch: 'full' },
  { path: 'students', component: StudentIndexComponent },
  { path: 'students/edit/:id', component: StudentDetailComponent },
  { path: 'students/new', component: StudentNewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
