const { test, expect, describe, beforeEach } = require("@playwright/test")
const { loginWith, createNote } = require('./helper')

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
        loginWith(page, 'admin', 'admin')
        await expect(page.getByText('root123 logged in', { exact: true })).toBeVisible()
    })

    test('a new note can be created', async ({ page }) => {
      await page.pause()
      createNote(page, 'this note is created by playwright', true)  
      await expect(page.getByText('this note is created by playwright')).toBeVisible()
    })

    describe('and a note exists', () => {
      beforeEach(async ({ page }) => {
        createNote(page, 'another note by playright', true)
      })

      test('importance can be changed', async ({ page }) => {
        await page.getByRole("button", { name: 'make not important' }).click()
        await expect(page.getByText('make important')).toBeVisible()
      })
    })
  })
})
