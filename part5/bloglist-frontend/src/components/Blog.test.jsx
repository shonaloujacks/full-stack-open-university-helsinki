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

  const title = screen.getAllByText('Gluten-free apple crumble')
  const author = screen.getAllByText((text) => text.includes('Silvana Franco'))

  expect(title).toBeDefined()
  expect(author).toBeDefined()

})