import React from "react";
import { render, screen } from "@testing-library/react"
import RepoIssues from "../RepoIssues"
import userEvent from "@testing-library/user-event";

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

const mutationFn = jest.fn(arg => arg)

const mutationResults = {
    deleteIssue: {
        triggerFn: mutationFn
    }
}

test('Displays header text', () => {
    render(<RepoIssues />)
    expect(screen.getByText('Repository Issues')).toBeInTheDocument()
})

test('Displays Repo Issue Titles', () => {
    render(<RepoIssues queryResults={queryResults} />);
    expect(screen.getByText('Repo Issue 1')).toBeInTheDocument()
    expect(screen.getByText('Repo Issue 2')).toBeInTheDocument()
})

test('Displays Repo Issue descriptions', () => {
    render(<RepoIssues queryResults={queryResults} />);
    expect(screen.getByText('This is the body for Repo Issue 1')).toBeInTheDocument()
    expect(screen.getByText('This is the body for Repo Issue 2')).toBeInTheDocument()
})

test('displays loading screen when loading is true', () => {
    const loadingResults = {
        repoIssues: {
            loading: true
        }
    }
    render(<RepoIssues queryResults={loadingResults} />);
    expect(screen.getByText('The data is loading')).toBeInTheDocument()
})

test('displays error screen when error is present', () => {
    const loadingResults = {
        repoIssues: {
            error: new Error('This is an error')
        }
    }
    render(<RepoIssues queryResults={loadingResults} />);
    expect(screen.getByText('This is an error')).toBeInTheDocument()
})

test('if no mutationResults, delete button does not appear', () => {
    render(<RepoIssues queryResults={queryResults} />);
    expect(screen.queryByText('Delete Repo Issue 1')).not.toBeInTheDocument()
})

test('displays delete button', () => {
    render(<RepoIssues queryResults={queryResults} mutationResults={mutationResults} />);
    expect(screen.getByText('Delete Repo Issue 1')).toBeInTheDocument()
})

test('when user clicks button, mutation function is triggered', () => {
    render(<RepoIssues queryResults={queryResults} mutationResults={mutationResults}/>);
    const deleteBtn = screen.getByText('Delete Repo Issue 1')
    userEvent.click(deleteBtn)
    expect(mutationFn).toBeCalledWith({ issueId: "repo-issue-1-ID"})
})

// mutation MyMutation {
//     deleteIssue(input: {issueId: "I_kwDOI-XeLM5fA0dk"}) {
//       repository {
//         issues(first: 10) {
//           nodes {
//             id
//           }
//         }
//       }
//     }
//   }