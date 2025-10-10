import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { expect, test } from 'vitest'

test('renders content', () => {
  const blog = {
    title: 'Gluten-free apple crumble',
    author: 'Silvana Franco',
    url: 'https://www.bbcgoodfood.com/recipes/gluten-free-apple-crumble',
    likes: 4
  }

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