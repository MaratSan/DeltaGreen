import { Page } from '@playwright/test';

export abstract class POM {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public abstract navigate(): Promise<void>;
  public abstract goBack(): Promise<void>;

  public async goForward(): Promise<void> {
    await this.page.goForward();
  }

  public abstract validateAllComponents(): Promise<void>;
}
