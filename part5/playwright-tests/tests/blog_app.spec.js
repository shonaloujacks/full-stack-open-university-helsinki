
import { loginWith, createBlog, getBlog } from './helper'
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
    await request.post('/api/users', {
      data: {
        name: 'Emily Taylor',
        username: 'Emilytest',
        password: 'test2345'
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
    await page.getByRole('button', {name: 'Create new blog'}).click()
    await createBlog(page, 'Slow cooker cinnamon & orange beef', 'Ailsa Burt', 'https://www.bbcgoodfood.com/recipes/slow-cooker-cinnamon-orange-beef' )
    await expect(page.getByTestId('blog')).toBeVisible();
  })
   })

  describe('When a blog exists', () => { 
    beforeEach (async ({page}) => {
      await loginWith( page,'mluukkai', 'salainen')

  })
    test('a blog can be liked', async ({page}) => {
      await page.getByRole('button', {name: 'Create new blog'}).click()
      await createBlog(page, 'Mustard pork and apples', 'Good Food team', 'https://www.bbcgoodfood.com/recipes/mustardy-pork-apples')

      await page.getByRole('button', { name: 'View'}).click()
      const likesButton = page.getByTestId('blog-likes-button')
      await likesButton.click()

      await expect(page.getByTestId('blog-likes')).toContainText('Likes: 1')

  })
})

  describe('When deleting a blog', () => { 
    beforeEach (async ({page}) => {
      await loginWith( page,'mluukkai', 'salainen')

  })
     test('a blog can be deleted by its creator', async ({page}) => {
      await page.getByRole('button', {name: 'Create new blog'}).click()
      await createBlog(page, 'Mustard pork and apples', 'Good Food team', 'https://www.bbcgoodfood.com/recipes/mustardy-pork-apples')
    
      await page.getByRole('button', { name: 'View'}).click()
      const removeButton = page.getByTestId('blog-remove')
      const blogToDelete =  page.getByTestId('blog').filter({ hasText: 'Mustard pork and apples' })

      page.once('dialog', async dialog => { await dialog.accept() });
      await removeButton.click()

      await expect(blogToDelete).not.toBeVisible();

  })
   test('the delete button is only visible to the blog creator', async ({page}) => {
      await page.getByRole('button', {name: 'Create new blog'}).click()
      await createBlog(page, 'Mustard pork and apples', 'Good Food team', 'https://www.bbcgoodfood.com/recipes/mustardy-pork-apples')

      await page.getByTestId('logout-button').click()
      await loginWith( page,'Emilytest', 'test2345')

      await page.getByRole('button', { name: 'View' }).click()
       
      const removeButton = page.getByTestId('blog-remove')
      await expect(removeButton).not.toBeVisible();

  })
  })

  describe('Blog layout', () => { 
    beforeEach (async ({page}) => {
      await loginWith( page,'mluukkai', 'salainen')

  })
    test('blogs are ordered according to most likes', async ({page}) => {
      // Create first blog
      await page.getByRole('button', {name: 'Create new blog'}).click()
      await createBlog(page, 'Mustard pork and apples', 'Good Food team', 'https://www.bbcgoodfood.com/recipes/mustardy-pork-apples')
      await expect(page.getByTestId('blog').filter({ hasText: 'Mustard pork and apples' })).toBeVisible();
      // Create second blog
      await createBlog(page, 'Chicken & tzatziki wraps', 'Claire Thomson', 'https://www.bbcgoodfood.com/recipes/chicken-tzatziki-wraps')
      await expect(page.getByTestId('blog').filter({ hasText: 'Chicken & tzatziki wraps' })).toBeVisible();
      // Create third blog
      await createBlog(page, 'Peanut chicken and gnocchi traybake', 'Nadiya Hussain', 'https://www.bbc.co.uk/food/recipes/one-tray_peanut_chicken_19540')
      await expect(page.getByTestId('blog').filter({ hasText: 'Peanut chicken and gnocchi traybake' })).toBeVisible();

      // Open view button for all blogs
      await getBlog(page, 'Mustard pork and apples').getByRole('button', {name: 'View' }).click()
      await getBlog(page, 'Chicken & tzatziki wraps').getByRole('button', {name: 'View' }).click()
      await getBlog(page, 'Peanut chicken and gnocchi traybake').getByRole('button', {name: 'View' }).click()

      // Increase blog likes
      await getBlog(page, 'Chicken & tzatziki wraps').getByTestId('blog-likes-button').click()
      await getBlog(page, 'Chicken & tzatziki wraps').getByTestId('blog-likes-button').click()
      await getBlog(page, 'Peanut chicken and gnocchi traybake').getByTestId('blog-likes-button').click()

      // Check they're in the right order
      await expect(page.getByTestId('blog').first()).toContainText('Chicken & tzatziki wraps')
      await expect(page.getByTestId('blog').nth(1)).toContainText('Peanut chicken and gnocchi traybake')
      await expect(page.getByTestId('blog').nth(2)).toContainText('Mustard pork and apples')

  })
})
})