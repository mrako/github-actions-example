import React from 'react';

const baseURL = process.env.ENDPOINT;

const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/weather`);
    return response.json();
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }

  return {};
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: '',
    };
  }

  async componentDidMount() {
    const weather = await getWeatherFromApi();

    if (weather.icon) {
      this.setState({ icon: weather.icon.slice(0, -1) });
    }
  }

  render() {
    const { icon } = this.state;

    return (
      <div className="icon">
        { icon && <img alt="weather icon" src={`/img/${icon}.svg`} /> }
      </div>
    );
  }
}

export default Weather;
