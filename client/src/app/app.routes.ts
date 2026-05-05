import { Routes } from '@angular/router';
import { Home } from '../features/home/home';
import { MemberList } from '../features/members/member-list/member-list';
import { MemberDetailed } from '../features/members/member-detailed/member-detailed';
import { Messages } from '../features/messages/messages';
import { Lists } from '../features/lists/lists';
import { authGuard } from '../core/guards/auth-guard';

// Define the application routes
export const routes: Routes = [
  { path: '', component: Home },
  // Define a route for authenticated users with child routes for members, messages, and lists
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: 'members', component: MemberList }, 
      { path: 'members/:id', component: MemberDetailed },
      { path: 'messages', component: Messages },
      { path: 'lists', component: Lists },
    ],
  },
  { path: '**', component: Home },
];
