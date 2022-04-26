// React.createElement is needed to render components
import React from 'react';

// Helper functions from react-testing-library
import { render, cleanup } from '@testing-library/react';

// Components to be tested
import Application from 'components/Application';

afterEach(cleanup);

it('renders without crashing', () => {
  render(<Application />);
});
