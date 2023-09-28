import './MovieCard.css';

function MovieCard({ movie, mode, save, unsave }) {
  const [text, className, action] =
    mode === 'all' && movie.saved
      ? ['', 'card__button_saved', unsave]
      : mode === 'all' && !movie.saved
      ? ['Сохранить', 'card__button_unsaved', save]
      : mode === 'saved' && movie.saved
      ? ['', 'card__button_remove', unsave]
      : ['', () => {}];

  return (
    <div className="card">
      <div className="card__container">
        <a href={movie.trailerLink}>
          <img className="card__image" src={movie.image} alt={movie.name} />
        </a>
        <button type="button" className={`card__button ${className}`} onClick={action}>
          {text}
        </button>
      </div>

      <div className="card__info">
        <h2 className="card__title">{movie.name}</h2>
        <p className="card__duration">{`${Math.trunc(movie.duration / 60)}ч ${movie.duration % 60}м`}</p>
      </div>
    </div>
  );
}

export default MovieCard;
