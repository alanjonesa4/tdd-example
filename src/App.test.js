import { render, screen } from '../test-utils.jsx'
import App from './App';

test('displays hello world', () => {
  render(<App />);
  expect(screen.getByText('Hello world!')).toBeInTheDocument();
});