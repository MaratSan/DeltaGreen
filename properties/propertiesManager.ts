export class PropertiesManager {
  private static testEnvironmentSet: boolean = this.loadTestEnvironment()

  private static loadTestEnvironment(): boolean {
    if (process.env.TEST_ENVIRONMENT === undefined) throw Error('Testing environment is not defined!')
    return true
  }

  public static getProperty(propertyName: string): string {
    const propertyValue = process.env[propertyName]
    if (propertyValue === undefined) {
      throw Error(
        'Property "' + propertyName + '" is not defined for environment "' + process.env.TEST_ENVIRONMENT + '"!'
      )
    }
    return propertyValue
  }
}
