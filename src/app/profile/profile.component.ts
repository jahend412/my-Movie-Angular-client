import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; // Close dialog on success
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any = {};

  @Input() loggedUser = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Fetch user data via API
   * @returns object with user information
   * @function getUserInfo
   */

  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      this.loggedUser.Username = this.user.Username
      this.loggedUser.Password = this.user.Password
      this.loggedUser.Email = this.user.Email
      this.loggedUser.Birthday = this.user.Birthday
      console.log(this.loggedUser)
      return this.user;
    });
  }

  /**
  * Update user data, such as username, password, email, or birthday
  * @function updateUser
  */

  updateUser(): void {
    this.fetchApiData.editUser(this.loggedUser).subscribe((result) => {
      this.snackBar.open('Your profile was updated successfully!', 'OK', {
        duration: 2000,
      });
      if (this.user.Username !== result.Username) {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open(
          'Profile updated, please login again with your new credentials.',
          'OK',
          {
            duration: 2000,
          }
        );
      }
    });
  }

  /**
  * Delete user data for the user that is logged in
  * @function deleteAccount
  */

  deleteAccount(): void {
    if (confirm('All your data will be lost - this cannnot be undone!')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open(
          'You have successfully deleted your account - we are sorry to see you go!',
          'OK',
          {
            duration: 2000,
          }
        );
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }
}