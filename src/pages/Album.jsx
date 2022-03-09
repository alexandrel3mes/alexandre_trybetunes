import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import LoadingScreen from '../LoadingScreen';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      albumColection: '',
      albumInfo: [],
      loading: false,
      favs: [],
    };
  }

  componentDidMount() {
    this.apiReq();
    this.favSongs();
  }

  favSongs = async () => {
    this.setState({ loading: true });
    const request = await getFavoriteSongs();

    const { albumInfo } = this.state;
    const idsFromTracks = albumInfo.map((element) => element.trackId);

    const favsIds = [];
    request.forEach((el) => idsFromTracks.forEach((ele) => {
      if (el.trackId === ele) {
        favsIds.push(ele);
      }
    }));
    this.setState({
      loading: false,
      favs: favsIds,
    });
  }

  apiReq = async () => {
    const { match: { params: { id } } } = this.props;
    const request = await getMusics(id);
    this.setState({ albumColection: request[0] });

    const filtered = request.filter((req) => req.kind === 'song');
    this.setState({ albumInfo: filtered });
  }

  funcThatAddSong = async (prop) => {
    await addSong(prop);
    this.setState((prevState) => ({
      favs: [...prevState.favs, prop.trackId],
      loading: false,
    }));
  }

  handleChange = (prop, { target }) => {
    this.setState({ loading: true });
    if (target.checked) {
      this.funcThatAddSong(prop);
    }
  }

  render() {
    const {
      albumInfo,
      albumColection,
      loading,
      favs,
    } = this.state;
    return (
      <>
        <Header />
        {
          loading ? <LoadingScreen /> : (

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
                      trackId={ album.trackId }
                      favCheck={ favs.some((fav) => fav === album.trackId) }
                      favChange={ this.handleChange }
                      music={ album }
                    />
                  ))
                }
              </div>
            </div>
          )
        }
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string.isRequired,
};

export default Album;
