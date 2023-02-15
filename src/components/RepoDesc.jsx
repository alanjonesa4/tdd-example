const RepoDesc = (props) => {
    return <div aria-label="Repository description">{props?.queryResults?.repoDescription?.data?.desc}</div>
}

export default RepoDesc