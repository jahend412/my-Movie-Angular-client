import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'

import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { DescriptionComponent } from '../description/description.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent {
  movies: any[] = [];
  favorites: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites();
  }

  /**
   * Fetch movies via API and set movies state to returned JSON file
   * @returns array holding movies objects
   * @function getMovies
   */

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
  * Opens genre information from GenreComponent
  * @param {string} name
  * @param {string} description
  * @function openGenre
  */

  openGenre(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
  }

  /**
 * Opens director information from DirectorComponent
 * @param {string} name
 * @param {string} bio
 * @param {string} birthday
 * @function openDirector
 */

  openDirector(name: string, bio: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
      },
      width: '500px',
    });
  }

  /**
  * Opens movie details from MovieDetailsComponent
  * @param {string} title
  * @param {string} description
  * @function openDescription
  */

  openDescription(title: string, description: string): void {
    this.dialog.open(DescriptionComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '500px',
    });
  }

  /**
     * Fetch user info via API and set favorites state to returned JSON file
     * @returns array holding IDs of favorites
     * @function getFavorites
     */

  getFavorites(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      console.log(this.favorites);
      return this.favorites;
    });
  }

  /**
  * Checks if a movie is included in a user's favorite movies
  * @param {string} id
  * @returns boolean
  * @function isFav
  */

  isFav(id: string): boolean {
    return this.favorites.includes(id);
  }

  /**
   * Adds a movie to a user's favorites via an API call
   * @param {string} id
   * @function addFavorites
   */

  addFavorite(id: string): void {
    console.log(id);
    this.fetchApiData.addFavorite(id).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Movie has been added to your favorites!', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  /**
 * Removes a movie from a user's favorites via an API call
 * @param {string} id
 * @function deleteFavorite
 */

  deleteFavorite(id: string): void {
    console.log(id);
    this.fetchApiData.deleteFavorite(id).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Movie has been removed from your favorites!', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

}
