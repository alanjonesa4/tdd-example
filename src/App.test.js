import { render, screen } from '../test-utils.jsx'
import App from './App';

test('displays correct header text', () => {
  render(<App />);
  expect(screen.getByText('Test Repo Details')).toBeInTheDocument();
});

test('displays repository description component', () => {
  render(<App />)
  expect(screen.getByLabelText('Repository description')).toBeInTheDocument()
})

test('displays repo issues component', () => {
  render(<App />)
  expect(screen.getByText('repoIssues')).toBeInTheDocument()
})
