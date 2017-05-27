import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {
  login(username: string, password: string): boolean {
    if (username.length > 3 && password.length > 3) {
      localStorage.setItem('currentUser', JSON.stringify({ username, password }));
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }


}
