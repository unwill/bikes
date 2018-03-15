import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import AppBar from 'material-ui/AppBar';
import CommunicationEmail from 'material-ui/svg-icons/maps/directions-bike';

import ClientIdentifier from '../apikey';

const config = {
  headers:
  {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Client-Identifier': ClientIdentifier,
  },
};

const proxy = 'https://CORS-Anywhere.HerokuApp.com/';
const baseUrl = 'https://oslobysykkel.no/';
const path = 'api/v1/';

export default class Stations extends Component {
  constructor(props) {
    super(props);
    this.title = 'Stations';
    this.state = {
      stations: [],
      availability: [],
      loadingStations: false,
      loadingAvailibility: false,
      errorText: '',
    };
  }

  componentWillMount() {
    this.getStations();
    this.getavailability();
  }

  getStations = () => {
    const service = 'stations';
    this.setState({ loadingStations: true });
    axios.get(`${proxy + baseUrl + path + service}`, config)
      .then((response) => {
        this.setState({
          stations: response.data.stations,
          loadingStations: false,
        });
      })
      .catch((error) => {
        this.setState({
          loadingStations: false,
          errorText: error,
        });
      });
  };

  getavailability = () => {
    const service = 'stations/availability';
    this.setState({ loadingAvailibility: true });
    axios.get(`${proxy + baseUrl + path + service}`, config)
      .then((response) => {
        this.setState({
          availability: response.data.stations,
          loadingAvailibility: false,
        });
      })
      .catch((error) => {
        this.setState({
          loadingStations: false,
          errorText: error,
        });
      });
  };

  mergeArrayWithId = (array1, array2) => {
    const result = [...array1.concat(array2)
      .reduce(
        (m, o) => m.set(o.id, Object.assign(m.get(o.id) || {}, o)),
        new Map(),
      ).values()];
    return result;
  }

  render() {
    const arr1 = this.state.stations;
    const arr2 = this.state.availability;
    let listItems;
    if (arr1 && arr2) {
      const stations = this.mergeArrayWithId(arr1, arr2);
      stations.sort((a, b) => (a.title && b.title ? a.title.localeCompare(b.title) : 0));
      const filteredStations = stations.filter(station => station.title);
      listItems = filteredStations.map(station => (
        <div>
          <ListItem
            insetChildren
            primaryText={`${station.title} ${station.subtitle}`}
            secondaryText={station.availability ? `${station.availability.bikes} sykler ${station.availability.locks} ledige lås` : ''}
            primaryTogglesNestedList
            rightIcon={<CommunicationEmail />}
          />
        </div>
      ));
    }
    const loading = () => (
      (this.state.loadingStations && this.state.loadingAvailibility) ?
        (
          <div>
            <CircularProgress size={80} thickness={8} />
          </div>
        ) : ''
    );

    const error = () => (
      (this.state.errorText) ?
        (
          <div>
            <i className="material-icons">error</i>
            {this.state.errorText.toString()}
          </div>
        ) : ''
    );

    return (
      <MuiThemeProvider>
        <AppBar title="Sykkelstativer" showMenuIconButton={false} />
        {loading()}
        {error()}
        <Paper zDepth={2}>
          <List>
            { listItems }
          </List>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

