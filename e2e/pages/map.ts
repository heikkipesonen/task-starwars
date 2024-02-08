import { Locator } from '@playwright/test'

export class Map {
  constructor(protected page: Locator) {}

  public get markers() {
    return this.page.getByLabel('Map marker')
  }

  public get container() {
    return this.page
  }

  public get locationsList() {
    return LocationsList.of(this.page.getByTestId('locations-list'))
  }

  public static of = (page: Locator) => new Map(page)
}

class LocationsList {
  constructor(protected page: Locator) {}
  public get container() {
    return this.page
  }
  public get items() {
    return this.page.getByTestId('locations-list__item')
  }

  public static of = (page: Locator) => new LocationsList(page)
}

export class LocationListItem {
  constructor(protected page: Locator) {}

  public get name() {
    return this.page.getByTestId('locations-list__item__name')
  }

  public get image() {
    return this.page.getByTestId('locations-list__item__image')
  }

  public get distance() {
    return this.page.getByTestId('locations-list__item__distance')
  }

  public getDistanceValue = async () => {
    return parseFloat((await this.distance.textContent()) || '0')
  }

  public static of = (page: Locator) => new LocationListItem(page)
}
