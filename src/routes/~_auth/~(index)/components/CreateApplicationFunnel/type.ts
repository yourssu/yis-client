export type CreateApplicationFunnelSteps = {
  배포_정보입력: {
    application: {
      description: string
      name: string
    }
    deploy: {
      description?: string
      name?: string
    }
  }
  어플리케이션_정보입력: {
    application: {
      description?: string
      name?: string
    }
  }
}
