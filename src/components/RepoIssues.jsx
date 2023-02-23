import { queryProvider } from "@cheddartv/alice-components"
import { gql } from '@apollo/client'

const GET_REPO_ISSUES = gql`
    query getRepoIssues {
        repository(name: "tdd-example", owner: "alanjonesa4") {
            id
            issues(first: 10) {
                nodes {
                    body
                    id
                    title
                }
            }
        }  
    }
`

const DELETE_ISSUE = gql`
mutation deleteIssue($issueId: ID!) {
    deleteIssue(input: { issueId: $issueId }) {
        repository {
            id
            issues(first: 10) {
                nodes {
                    body
                    id
                    title
                }
            }
        }  
    }
}`

export const formatter = data => {
    return data?.repository?.issues?.nodes || null
}

export const BaseRepoIssues = ({queryResults = {}, mutationResults = {}}) => {

    const { repoIssues } = queryResults
    if (repoIssues?.loading) return <div>The data is loading</div>
    if (repoIssues?.error) return <div>{repoIssues?.error?.message}</div>

    const handleClick = (issueId) => {
        console.log(mutationResults?.deleteIssue?.triggerFn)
        console.log({issueId})
        mutationResults?.deleteIssue?.triggerFn({ customVariables: {issueId}})
    }

    return (
        <div aria-label="Repository issues">
            <p>Repository Issues</p>
            <div>
                {repoIssues?.data?.map(({title, body, id}) => (
                    <div key={`repo-issue-${id}`}>
                        <header>{title}</header>
                        <p>{body}</p>
                        {mutationResults?.deleteIssue ? <button onClick={() => handleClick(id)}>{`Delete ${title}`}</button> : null}
                    </div>
                ))}
            </div>
        </div>
        )
}

const args = {
    queries: [
        { 
            query: GET_REPO_ISSUES,
            getVariables: () => {},
            formatter,
            name: 'repoIssues'
        }
    ],
    mutations: [
        {
            mutation: DELETE_ISSUE,
            getVariables: () => {},
            formatter: data => data,
            name: 'deleteIssue'
        }
    ]
}
export default queryProvider(args, BaseRepoIssues)

