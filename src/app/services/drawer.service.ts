import {Injectable} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  private notificationsDrawer!: MatDrawer;
  private notificationsOpenSubject = new BehaviorSubject<boolean>(false);

  private searchDrawer!: MatDrawer;
  private searchOpenSubject = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  // Register the Notifications Drawer
  setNotificationsDrawer(drawer: MatDrawer) {
    this.notificationsDrawer = drawer;
  }

  // Register the Search Drawer
  setSearchDrawer(drawer: MatDrawer) {
    this.searchDrawer = drawer;
  }

  // Toggle Notifications Drawer & Close Search Drawer
  toggleNotifications() {
    if (this.notificationsDrawer) {
      if (this.notificationsDrawer.opened) {
        this.notificationsDrawer.close();
        this.notificationsOpenSubject.next(false);
      } else {
        if (this.searchDrawer?.opened) {
          this.searchDrawer.close(); // Close Search Drawer
          this.searchOpenSubject.next(false);
        }
        this.notificationsDrawer.open();
        this.notificationsOpenSubject.next(true);
      }
    }
  }

  // Toggle Search Drawer & Close Notifications Drawer
  toggleSearch() {
    if (this.searchDrawer) {
      if (this.searchDrawer.opened) {
        this.searchDrawer.close();
        this.searchOpenSubject.next(false);
      } else {
        if (this.notificationsDrawer?.opened) {
          this.notificationsDrawer.close(); // Close Notifications Drawer
          this.notificationsOpenSubject.next(false);
        }
        this.searchDrawer.open();
        this.searchOpenSubject.next(true);
      }
    }
  }

  // Get Drawer States as Observables (for UI changes if needed)
  getNotificationsState() {
    return this.notificationsOpenSubject.asObservable();
  }

  getSearchState() {
    return this.searchOpenSubject.asObservable();
  }
}
