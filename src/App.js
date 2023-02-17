import './App.css';
import { RepoDesc, RepoIssues } from './components'

function App() {

  const queryResults = {
    repoIssues: {
        data: [
            {
                title: 'Repo Issue 1',
                body: 'This is the body for Repo Issue 1',
                id: "repo-issue-1-ID"
            },
            {
                title: 'Repo Issue 2',
                body: 'This is the body for Repo Issue 2',
                id: "repo-issue-2-id"
            }
        ]
    }
}

  return (
    <div className="App">
      <header className="App-header">
       Test Repo Details
      </header>
      <RepoDesc />
      <RepoIssues queryResults={queryResults} />
    </div>
  );
}

export default App;
