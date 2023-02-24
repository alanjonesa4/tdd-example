import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BaseCreateIssue as CreateIssue } from "../CreateIssue";

test('render CreateIssue header', () => {
    render(<CreateIssue />)
    expect(screen.getByText('Add New Issue')).toBeInTheDocument()
})

test('renders an input for Repo Issue Title', () => {
    render(<CreateIssue />)
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument()
})

test('renders an input for Repo Issue body', () => {
    render(<CreateIssue />)
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument()
})

test('renders a submit button', () => {
    render(<CreateIssue />)
    expect(screen.getByText('Create New Issue')).toBeInTheDocument()
})

test('renders text if typed into the title input', () => 
{
    render(<CreateIssue />)
    const titleInput = screen.getByPlaceholderText('Title')
    userEvent.type(titleInput, 'This is a title')
    expect(screen.getByDisplayValue('This is a title')).toBeInTheDocument()
})

test('renders text if typed into the description textarea', () => 
{
    render(<CreateIssue />)
    const descInput = screen.getByPlaceholderText('Description')
    userEvent.type(descInput, 'This is a description')
    expect(screen.getByDisplayValue('This is a description')).toBeInTheDocument()
})

test('disables submit button if nothing is in the title field', () => {
    render(<CreateIssue />)
    expect(screen.getByText('Create New Issue')).toBeDisabled()
})

test('enables submit button if something is in the title field', () => {
    render(<CreateIssue />)
    const titleInput = screen.getByPlaceholderText('Title')
    userEvent.type(titleInput, 'This is a title')
    expect(screen.getByText('Create New Issue')).toBeEnabled()
})

test('calls mutation function with title if submit button is clicked', () => {
    const mutationFn = jest.fn(arg => arg)

    const mutationResults = {
        createIssue: {
            triggerFn: mutationFn
        }
    }
    render(<CreateIssue mutationResults={mutationResults}/>)
    const titleInput = screen.getByPlaceholderText('Title')
    const submitBtn = screen.getByText('Create New Issue')
    userEvent.type(titleInput, 'This is a title')
    userEvent.click(submitBtn)
    expect(mutationFn).toBeCalledWith({ customVariables: { title: 'This is a title', body: null}})
})

test('calls mutation function with title and description if body is present and submit button is clicked', () => {
    const mutationFn = jest.fn(arg => arg)

    const mutationResults = {
        createIssue: {
            triggerFn: mutationFn
        }
    }
    render(<CreateIssue mutationResults={mutationResults}/>)
    const titleInput = screen.getByPlaceholderText('Title')
    const bodyInput = screen.getByPlaceholderText('Description')
    const submitBtn = screen.getByText('Create New Issue')
    userEvent.type(titleInput, 'This is a title')
    userEvent.type(bodyInput, 'This is a description')
    userEvent.click(submitBtn)
    expect(mutationFn).toBeCalledWith({ customVariables: { title: 'This is a title', body: 'This is a description'}})
})
