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
      await page.getByTestId('username-input').fill('mluukkai')
      await page.getByTestId('password-input').fill('salainen')
      await page.getByRole('button', {name: 'login'}).click()

      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible();
    })

    test.only('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username-input').fill('mluukkai')
      await page.getByTestId('password-input').fill('wrong')
      await page.getByRole('button', {name: 'login'}).click()

      const errorDiv = page.locator('.error')
      await expect(errorDiv).toContainText('Wrong username or password')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible();
    })
    })
})