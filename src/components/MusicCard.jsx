import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const {
      musicName,
      musicPreview,
      trackId,
      favChange,
      favCheck,
      music,
    } = this.props;
    return (
      <div>
        <h4>{ musicName }</h4>
        <audio data-testid="audio-component" src={ musicPreview } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favChecked">
          Favorita
          <input
            checked={ favCheck }
            onChange={ (event) => favChange(music, event) }
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            name="favChecked"
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicName: PropTypes.string.isRequired,
  musicPreview: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  favChange: PropTypes.func.isRequired,
  favCheck: PropTypes.bool.isRequired,
  music: PropTypes.string.isRequired,
};

export default MusicCard;
