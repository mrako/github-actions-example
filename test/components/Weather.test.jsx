import React from 'react';
import renderer from 'react-test-renderer';

import Weather from '../../src/Weather';

const mockFetchPromise = Promise.resolve({ json: () => Promise.resolve({}) });

global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

describe('Weather', () => {
  it('renders correctly', () => {
    const component = (
      <Weather />
    );
    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
