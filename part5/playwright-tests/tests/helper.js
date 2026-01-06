
const loginWith = async (page, username, password) => {
  await page.getByTestId('username-input').fill(username)
  await page.getByTestId('password-input').fill(password)
  await page.getByRole('button', {name: 'login'}).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByTestId('title-input').fill(title)
  await page.getByTestId('author-input').fill(author)
  await page.getByTestId('url-input').fill(url)
  await page.getByRole('button', { name: 'Create'}).click()
}
// To use to requery locator in dynamically changing list
const getBlog = (page, title) => page.getByTestId('blog').filter({ hasText: title })


export { loginWith, createBlog, getBlog }