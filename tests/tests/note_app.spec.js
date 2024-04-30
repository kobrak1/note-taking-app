const { test, expect, describe, beforeEach } = require("@playwright/test")

describe("Note Taking App", () => {

  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'root123',
        username: 'admin',
        password: 'admin'
      }
    })
    await page.goto('http://localhost:5173')
  })

  // test the note taking app if it opens or not
  test("front page can be opened", async ({ page }) => {
    const locator = await page.getByText("Note Taking App")
    await expect(locator).toBeVisible()
    await expect(
      page.getByText("all rights reserved - ahmet burak karhan 2024")
    ).toBeVisible()
  })

  describe('when logged in', () => {

    beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'login' }).click()
        await page.getByTestId('username').fill('admin')
        await page.getByTestId('password').fill('admin')
    
        await page.getByRole('button', { name: 'login' }).click()
    
        await expect(page.getByText('root123 logged in', { exact: true })).toBeVisible()
    })

    test('a new note can be created', async ({ page }) => {
      await page.getByRole("button", { name: 'new note' }).click()
      await page.getByRole("textbox").fill('this note is created by playwright')
      await page.getByRole("button", { name: 'save' }).click()
  
      await expect(page.getByText('this note is created by playwright')).toBeVisible()
    })

    describe('and a note exists', () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'new note' }).click()
        await page.getByRole('textbox').fill('another note by playright')
        await page.getByRole('button', { name: 'save' }).click()
      })

      test('importance can be changed', async ({ page }) => {
        await page.getByRole("button", { name: 'make not important' }).click()
        await expect(page.getByText('make important')).toBeVisible()
      })
    })
  })
})
