// React.createElement is needed to render components
import React from 'react';

// Helper functions from react-testing-library
import { render, cleanup } from '@testing-library/react';

// Components to be tested
import Appointment from 'components/Appointment';

afterEach(cleanup);

describe('Appointment', () => {
  it('renders without crashing', () => {
    render(<Appointment />);
  });
});
