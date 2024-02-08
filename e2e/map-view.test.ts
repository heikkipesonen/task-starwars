import { test, expect } from '@playwright/test'
import { MainPage } from './pages/main'
import { LocationListItem, Map } from './pages/map'

test.describe('Main map functionality', () => {
  test('Error handling', async ({ page, context }) => {
    await context.route(/.json$/, (route) => route.abort()) // block all .json requests
    const mainPage = MainPage.of(page)
    mainPage.visit()

    await expect(mainPage.loading).toBeVisible()
    await test.step('Error screen should be visible when the map fails to load', async () => {
      await expect(mainPage.error).toBeVisible({ timeout: 30_000 }) // it will take a while for queries to retry
    })
  })

  test('Success', async ({ page }) => {
    const mainPage = MainPage.of(page)
    mainPage.visit()

    await test.step('Loading screen should be visible before the map is loaded', async () => {
      await expect(page).toHaveTitle(/Starwars/)
      await expect(mainPage.loading).toBeVisible()
      await expect(mainPage.map).toBeVisible()
    })

    const map = Map.of(mainPage.map)
    await test.step('Check if the map markers are correctly loaded and visible', async () => {
      const markerCount = await map.markers.count()
      expect(markerCount).toBeGreaterThan(1)
    })

    await test.step('Clicking the map should add a new marker', async () => {
      const markerCount = await map.markers.count()
      await map.container.click()
      // clicking the map will add a new marker, lets just assume it is the "my location"
      const newMarkerCount = await map.markers.count()
      expect(newMarkerCount).toBeGreaterThan(markerCount)
    })

    await test.step('After my position is added, a list of items is visible', async () => {
      expect(map.locationsList.container).toBeVisible()
      const markerCount = await map.markers.count()
      // -1 as my location is not a "location" presented in the list
      expect(await map.locationsList.items.count()).toEqual(markerCount - 1)
    })

    await test.step('a location list item should have name, picture and distance defined', async () => {
      const locationItems = await map.locationsList.items.all()
      for (const locationItem of locationItems) {
        await expect(LocationListItem.of(locationItem).name).toBeVisible()
        await expect(LocationListItem.of(locationItem).image).toBeVisible()
        await expect(LocationListItem.of(locationItem).distance).toBeVisible()
      }
    })

    await test.step('List of items should be sorted by distance, in ascending order', async () => {
      const locationItems = await map.locationsList.items.all()

      for (let i = 0; i < locationItems.length; i++) {
        const distance = await LocationListItem.of(
          locationItems[i]
        ).getDistanceValue()
        if (i > 0) {
          const previousDistance = await LocationListItem.of(
            locationItems[i - 1]
          ).getDistanceValue()
          expect(distance).toBeGreaterThanOrEqual(previousDistance)
        }
      }
    })
  })
})
