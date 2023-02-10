import { Component, OnInit, Input } from '@angular/core';

// This is used to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This brings in the API calls we created in fetch-api-data.service.ts
import { FetchApiDataService } from '../fetch-api-data.service';

//  This is used to diesplay notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }

  /**
    * Send the form inputs to the backend via API call
    * @function registerUser
    */

  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // Logic for a successful registration --> to be implemented!
      // Close modal on success
      this.dialogRef.close(); // This will close the modal on success!
      console.log(result)
      this.snackBar.open('User successfully registered!', 'OK', {
        duration: 2000
      });
    }, (result) => {
      console.log(result)
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}
