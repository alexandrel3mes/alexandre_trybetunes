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
      checked: true,
      notChecked: false,
    };
  }

  componentDidMount() {
    this.favSongs();
    this.apiReq();
  }

  favSongs = async () => {
    this.setState({ loading: true });
    const request = await getFavoriteSongs();
    const noRepeat = [...new Set(request)];

    const { match: { params: { id } } } = this.props;
    const requestAlbum = await getMusics(id);
    const idsFromTracks = requestAlbum.map((element) => element.trackId);

    const favsIds = [];
    noRepeat.forEach((el) => idsFromTracks.forEach((ele) => {
      if (el === ele) {
        favsIds.push(el);
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

    const newRequest = await getMusics(id);
    const filtered = newRequest.filter((req) => req.kind === 'song');
    this.setState({ albumInfo: filtered });

    this.favSongs();
  }

  handleChange = async (prop) => {
    this.setState({ loading: true });
    await addSong(prop);
    this.setState((prevState) => ({
      favs: [...prevState.favs, prop],
    }));
    this.setState({ loading: false });
    this.favSongs();
  }

  render() {
    const {
      albumInfo,
      albumColection,
      loading,
      favs,
      checked,
      notChecked,
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
                      favCheck={ favs
                        .some((fav) => fav === album.trackId) ? checked : notChecked }
                      favChange={ this.handleChange }
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
