
import { loginWith, createBlog } from './helper'

const { test, expect, beforeEach, describe } = require('@playwright/test')
export { loginWith } from './helper'

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
  
  test.only('a new blog can be created', async ({page}) => {
    await createBlog(page, 'Slow cooker cinnamon & orange beef', 'Ailsa Burt', 'https://www.bbcgoodfood.com/recipes/slow-cooker-cinnamon-orange-beef' )
 
    await expect(page.getByText('Slow cooker cinnamon & orange beef')).toBeVisible();
  })

  })
})