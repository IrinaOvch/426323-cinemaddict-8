export class ModelFilm {
  constructor(data) {
    this.comments = data[`comments`].map((comment) => ({
      text: comment.comment,
      author: comment.author,
      date: comment.date,
      emoji: comment.emotion,
    }));
    this.actors = data.film_info[`actors`];
    this.ageLimit = data.film_info[`age_rating`];
    this.alternativeTitle = data.film_info[`alternative_title`];
    this.description = data.film_info[`description`];
    this.director = data.film_info[`director`];
    this.genres = data.film_info[`genre`] || ``;
    this.poster = data.film_info[`poster`];
    this.country = data.film_info.release[`release_country`];
    this.releaseDate = data.film_info.release[`date`];
    this.duration = data.film_info[`runtime`];
    this.title = data.film_info[`title`] || ``;
    this.rating = data.film_info[`total_rating`];
    this.writers = data.film_info[`writers`];
    this.id = data[`id`];
    this.userRating = data.user_details[`personal_rating`];
    this.isWatched = Boolean(data.user_details[`already_watched`]);
    this.isInWatchlist = Boolean(data.user_details[`watchlist`]);
    this.isFavourite = Boolean(data.user_details[`favorite`]);
    this.watchingDate = data.user_details[`watching_date`];

  }

  toRAW() {
    return {
      'id': this.id,
      'comments': this.comments.map((comment) => ({
        comment: comment.text,
        author: comment.author,
        date: comment.date,
        emotion: comment.emoji
      })),
      "film_info": {
        'actors': this.actors,
        'age_rating': this.ageLimit,
        'alternative_title': this.alternativeTitle,
        'description': this.description,
        'director': this.director,
        'genre': this.genres,
        'poster': this.poster,
        "release": {
          'release_country': this.country,
          'date': this.releaseDate,
        },
        'runtime': this.duration,
        'title': this.title,
        'total_rating': this.rating,
        'writers': this.writers,
      },
      "user_details": {
        'personal_rating': this.userRating,
        'already_watched': this.isWatched,
        'watchlist': this.isInWatchlist,
        'favorite': this.isFavourite,
        'watching_date': this.watchingDate,
      }
    };
  }


  static parseFilm(data) {
    return new ModelFilm(data);
  }

  static parseFilms(data) {
    return data.map(ModelFilm.parseFilm);
  }
}
