import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      albumColection: '',
      albumInfo: [],
    };
  }

  componentDidMount() {
    this.apiReq();
  }

  apiReq = async () => {
    const { match: { params: { id } } } = this.props;
    const request = await getMusics(id);
    this.setState({ albumColection: request[0] });

    const newRequest = await getMusics(id);
    const filtered = newRequest.filter((req) => req.kind === 'song');
    this.setState({ albumInfo: filtered });
    console.log(filtered);
  }

  render() {
    const { albumInfo, albumColection } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <div>
            <img src={ albumColection.artworkUrl100 } alt="Album Cover" />
            <h3 data-testid="album-name">{ albumColection.collectionName }</h3>
            <p data-testid="artist-name">{ albumColection.artistName }</p>
          </div>
          <div>
            {
              albumInfo.map((album) => (
                <MusicCard
                  key={ album.trackId }
                  musicName={ album.trackName }
                  musicPreview={ album.previewUrl }
                />
              ))
            }
          </div>
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string.isRequired,
};

export default Album;
