import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showMenu: boolean = false;
  public appPages = [
    { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  constructor(
    private router: Router,
    public authService: AuthService
    ) {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hideMenuOnLogin();
      }
    });

  }

  deleteKey(){
    this.authService.clearAcceso();
  }

  hideMenuOnLogin() {
    const currentRoute = this.router.url;
    const loginRoute = '/login';

    this.showMenu = currentRoute !== loginRoute;
  }

}
