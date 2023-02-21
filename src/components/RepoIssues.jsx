const RepoIssues = ({queryResults = {}, mutationResults = {}}) => {

    const { repoIssues } = queryResults
    if (repoIssues?.loading) return <div>The data is loading</div>
    if (repoIssues?.error) return <div>{repoIssues?.error?.message}</div>

    const handleClick = (issueId) => {
        mutationResults?.deleteIssue?.triggerFn({issueId})
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
export default RepoIssues