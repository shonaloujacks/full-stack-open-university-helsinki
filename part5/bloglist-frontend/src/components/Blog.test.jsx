import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect, test, describe } from 'vitest'

import userEvent from '@testing-library/user-event'

const blog = {
  title: 'Gluten-free apple crumble',
  author: 'Silvana Franco',
  url: 'https://www.bbcgoodfood.com/recipes/gluten-free-apple-crumble',
  likes: 4
}

describe('renders correct content', () => {

  test('renders author and title by default', () => {

    render(<Blog blog={blog}/>)

    const title = screen.getByTestId('blog-name')
    const author = screen.getByTestId('blog-author')

    const url = screen.queryByTestId('blog-url')
    const likes = screen.queryByTestId('blog-likes')

    expect(title).toBeVisible()
    expect(author).toBeVisible()
    expect(url).not.toBeVisible()
    expect(likes).not.toBeVisible()

  })

  test('renders url and likes when view button clicked', async () => {
    render(<Blog blog={blog}/>)

    const user = userEvent.setup()
    const button = screen.getByTestId('blog-view')

    await user.click(button)

    const likes = screen.getByTestId('blog-likes')
    const url = screen.getByTestId('blog-url')

    expect(likes).toBeVisible()
    expect(url).toBeVisible()

  })

})


