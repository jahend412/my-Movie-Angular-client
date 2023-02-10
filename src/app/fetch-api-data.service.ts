import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://my-movie-api.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  /**
   * @service POST to the respective endpoint of apiUrl to register a new user
   * @param {any} userDetails
   * @returns a new user object in json format
   * @function userRegistration
   */

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Allows user to login
  /**
 * @service POST to the respective endpoint of apiUrl to login a user
 * @param {any} userDetails
 * @returns a user object in json format
 * @function userLogin
 */

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  //  Get all movies
  /**
 * @service GET to the respective endpoint of apiUrl to get all movies
 * @returns an array of all movies in json format
 * @function getAllMovies
 */

  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get one movie by title
  /**
 * @service GET to the respective endpoint of apiUrl to get a movie by title
 * @param {string} Title
 * @returns an array of movie objects in json format
 * @function getMovie
 */

  public getMovie(Title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/${Title}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Director by name
  /**
  * @service GET to the respective endpoint of apiUrl to get director info
  * @param {string} directorName
  * @returns an array of movie objects in json format
  * @function getDirector
  */

  public getDirector(directorName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/director/${directorName}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Genre by name
  /**
 * @service GET to the respective endpoint of apiUrl to get genre info
 * @param {string} genreName
 * @returns an array of movie objects in json format
 * @function getGenre
 */

  public getGenre(genreName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/genre/${genreName}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get User by username
  /**
   * @service GET to the respective endpoint of apiUrl to get a specific user
   * @returns a user object in json format
   * @function getUser
   */

  public getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get a users Favorite movie
  /**
   * @service POST to the respective endpoint of apiUrl to add a movie to a user's favourites
   * @returns a user object in json format
   * @function getFavorite
   */

  public getFavorite(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.get(apiUrl + `users/${username}/movies`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //  Add a Favorite movie to a users list
  /**
    * @service POST to the respective endpoint of apiUrl to add a movie to a user's favourites
    * @returns a user object in json format
    * @function addFavorite
    */

  public addFavorite(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.post(apiUrl + `users/${username}/movies/${movieID}`,
      { FavoriteMovie: movieID }, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  //  Update a User
  /**
   * @service PUT to the respective endpoint of apiUrl to update a user's details
   * @returns a user object in json format
   * @function editUser
   */

  editUser(loggedUser: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${username}`, loggedUser, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Delete a user
  /**
    * @service DELETE to the respective endpoint of apiUrl to delete a user
    * @returns success message
    * @function deleteUser
    */

  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Remove Favorite from users list
  /**
   * @service DELETE to the respective endpoint of apiUrl to remove a movie from a user's favourites
   * @returns a user object in json format
   * @function deleteFavorite
   */

  public deleteFavorite(movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
      .delete(apiUrl + `users/${username}/movies/${movieID}`,
        {
          headers: new HttpHeaders(
            {
              Authorization: 'Bearer ' + token,
            })
        }).pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
  }

  /**
   * Extracts response data from HTTP response
   * @param res
   * @returns response body or empty object
   */

  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  // Error handler
  /**
   * Error handler
   * @param error
   * @returns error message
   */

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened!! Please try again later!!');
  }
}