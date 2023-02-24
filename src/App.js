import './App.css';
import { RepoIssues, CreateIssue } from './components'

function App() {
  return (
    <div className="App">
      <header className="App-header">
       Test Repo Details
      </header>
      <div className="container">
        <RepoIssues />
        <CreateIssue />
      </div>
    </div>
  );
}

export default App;
