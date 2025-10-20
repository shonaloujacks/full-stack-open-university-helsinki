
import { loginWith, createBlog } from './helper'
const { test, expect, beforeEach, describe } = require('@playwright/test')


describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    
    await expect(page.getByRole('button', { name: 'login'})).toBeVisible()
    await expect(page.getByTestId('username-input')).toBeVisible()
    await expect(page.getByTestId('password-input')).toBeVisible()

  })
   describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')

      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible();
    })

    test('fails with wrong credentials', async ({ page }) => {
        await loginWith(page, 'mluukkai', 'wrong')

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('Wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible();
    })
    })

  describe('When logged in',  () => {
  beforeEach (async ({page}) => {
    await loginWith( page,'mluukkai', 'salainen') 
  })
  
  test('a new blog can be created', async ({page}) => {
    await createBlog(page, 'Slow cooker cinnamon & orange beef', 'Ailsa Burt', 'https://www.bbcgoodfood.com/recipes/slow-cooker-cinnamon-orange-beef' )
    await expect(page.getByTestId('blog-name')).toBeVisible();
  })
   })

  describe('When a blog exists', () => { 
    beforeEach (async ({page}) => {
      await loginWith( page,'mluukkai', 'salainen')

  })
    test('a blog can be liked', async ({page}) => {
      await createBlog(page, 'Mustard pork and apples', 'Good Food team', 'https://www.bbcgoodfood.com/recipes/mustardy-pork-apples')
      await page.pause()

      await page.getByRole('button', { name: 'View'}).click()
      const likesButton = page.getByTestId('blog-likes-button')
      await likesButton.click()

      await expect(page.getByTestId('blog-likes')).toContainText('Likes: 1')

  })
})

})