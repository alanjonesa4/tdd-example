import { render, screen } from '@testing-library/react'
import RepoDesc from '../RepoDesc'

test('renders repository description if we pass it down as a queryResult', () => {
    const queryResults = {
        repoDescription: {
            data: {
                desc: 'Repository description: This is a repository description' 
            }
        }
    }
    render(<RepoDesc queryResults={queryResults}/>);
    expect(screen.getByText('Repository description: This is a repository description')).toBeInTheDocument()
})