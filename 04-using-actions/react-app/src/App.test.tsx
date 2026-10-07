import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('shows the getting-started page with a counter starting at zero', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Get started', level: 1 }))
      .toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Count is 0' }))
      .toBeInTheDocument()
  })

  it('increments the counter on each click', async () => {
    const user = userEvent.setup()
    render(<App />)

    const counter = screen.getByRole('button', { name: 'Count is 0' })
    await user.click(counter)
    expect(counter).toHaveAccessibleName('Count is 1')

    await user.click(counter)
    expect(counter).toHaveAccessibleName('Count is 2')
  })

  it('lets keyboard users focus and activate the counter', async () => {
    const user = userEvent.setup()
    render(<App />)

    const counter = screen.getByRole('button', { name: 'Count is 0' })
    await user.tab()
    expect(counter).toHaveFocus()

    await user.keyboard('{Enter}')
    expect(counter).toHaveAccessibleName('Count is 1')

    await user.keyboard(' ')
    expect(counter).toHaveAccessibleName('Count is 2')
  })

  it('links to the Vite and React documentation', () => {
    render(<App />)

    expect(screen.getByRole('link', { name: 'Explore Vite' }))
      .toHaveAttribute('href', 'https://vite.dev/')
    expect(screen.getByRole('link', { name: 'Learn more' }))
      .toHaveAttribute('href', 'https://react.dev/')
  })
})
