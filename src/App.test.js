import { render, screen } from '@testing-library/react';
import App from './App';

test('displays correct header text', () => {
  render(<App />);
  expect(screen.getByText('Test Repo Details')).toBeInTheDocument();
});

test('displays repository description component', () => {
  render(<App />)
  expect(screen.getByLabelText('Repository description')).toBeInTheDocument()
})
