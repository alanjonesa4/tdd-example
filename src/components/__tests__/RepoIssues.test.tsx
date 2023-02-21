import React from "react";
import { render, screen } from "@testing-library/react"
import RepoIssues from "../RepoIssues"

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

test('Displays header text', () => {
    render(<RepoIssues queryResults={{}} />)
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