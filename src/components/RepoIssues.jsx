const RepoIssues = ({queryResults}) => {
    if (!queryResults?.repoIssues) return <div aria-label="Repository issues"></div>


    const { repoIssues: { data, loading, error }} = queryResults

    if (loading) return <div>The data is loading</div>

    if (error) return <div>{error?.message}</div>

    return (
        <div aria-label="Repository issues">
            <p>Repository Issues</p>
            <div>
                {data?.map(({title, body, id}) => (
                    <div key={`repo-issue-${id}`}>
                        <header>{title}</header>
                        <p>{body}</p>
                    </div>
                ))}
            </div>
        </div>
        )
}
export default RepoIssues