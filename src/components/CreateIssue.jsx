import { useState } from "react"
import { gql } from "@apollo/client"
import { queryProvider } from "@cheddartv/alice-components"

const CREATE_ISSUE_MUTATION = gql`
mutation createIssue($title: String!, $body: String) {
    createIssue(
        input: {
          repositoryId: "R_kgDOI-XeLA", 
          title: $title, 
          body: $body
        }
      ) {
        clientMutationId
        issue {
          id
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
      }
  }`

export const BaseCreateIssue = ({mutationResults = {}}) => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const handleTitleChange = e => {
        setTitle(e?.target?.value)
    }

    const handleBodyChange = e => {
        setBody(e?.target?.value)
    }

    const handleClick = () => {
        if (mutationResults) {
            mutationResults.createIssue.triggerFn({ customVariables: { title, body: body || null } })
        }
    }

    return <div>
        <p className="sub_head">Add New Issue</p>
        <div className="create_issue">
          <input placeholder="Title" value={title} onChange={handleTitleChange}></input>
          <textarea placeholder="Description" value={body} onChange={handleBodyChange} className="text_desc"></textarea>
          <button disabled={!title} onClick={handleClick}>Create New Issue</button>
        </div>
    </div>
} 

const args = {
    mutations: [
        {
            mutation: CREATE_ISSUE_MUTATION,
            getVariables: () => {},
            formatter: data => data,
            name: 'createIssue'
        }
    ]
}

export default queryProvider(args, BaseCreateIssue)
