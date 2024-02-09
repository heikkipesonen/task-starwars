import { Page } from '@playwright/test'

export class MainPage {
  constructor(protected page: Page) {}

  public get loading() {
    return this.page.getByTestId('view__loading')
  }
  
  public get error() {
    return this.page.getByTestId('view__error')
  }
  
  public get map() {
    return this.page.getByTestId('view__map')
  }

  public visit() {
    return this.page.goto('/')
  }

  public static of = (page: Page) => new MainPage(page)
}
