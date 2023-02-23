import React from "react";
import { render, screen } from "@testing-library/react"
import { BaseRepoIssues as RepoIssues, formatter } from "../RepoIssues"
import userEvent from "@testing-library/user-event";

const data = {
    "repository": {
      "id": "R_kgDOI-XeLA",
      "issues": {
        "nodes": [
          {
            "body": "This is the body for Repo Issue 1",
            "id": "repo-issue-1-ID",
            "title": "Repo Issue 1"
          },
          {
              "body": "This is the body for Repo Issue 2",
              "id": "repo-issue-2-ID",
              "title": "Repo Issue 2"
            }
        ]
      }
    }
}

const queryResults = {
    repoIssues: {
        data: formatter(data)
    }
}

const mutationFn = jest.fn(arg => arg)

const mutationResults = {
    deleteIssue: {
        triggerFn: mutationFn
    }
}

describe('Base Component Tests', () => {
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
        expect(mutationFn).toBeCalledWith({ customVariables: { issueId: "repo-issue-1-ID" }})
    })
    
})

describe('Formatter tests', () => {


    test('if given undefined or null, formatter returns null', () => {
        expect(formatter(undefined)).toBe(null)
        expect(formatter(null)).toBe(null)
    })

    test('correctly formats data pulled from schema', () => {
        expect(formatter(data)).toEqual(queryResults.repoIssues.data)
    })
})

