import { CpuResourceNames, MemoryResourceNames } from '@/types/resource'

interface MakeManifestsProps {
  applicationName: string
  cpuLimits: CpuResourceNames
  cpuRequests: CpuResourceNames
  domainName: string
  imageUrl: string
  memoryLimits: MemoryResourceNames
  memoryRequests: MemoryResourceNames
  port: number
}

export const makeManifests = ({
  applicationName,
  domainName,
  port,
  imageUrl,
  cpuLimits,
  cpuRequests,
  memoryLimits,
  memoryRequests,
}: MakeManifestsProps) => {
  const manifestDomainName = domainName
    .replace('https://', '')
    .replace('http://', '')
    .replace(/\/$/, '')

  return [
    {
      fileName: 'namespace.yaml',
      content: `apiVersion: v1\nkind: Namespace\nmetadata:\n  name: ${applicationName}`,
    },
    {
      fileName: 'ingress.yaml',
      content: `apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: ${applicationName}\n  namespace: ${applicationName}\nspec:\n  ingressClassName: nginx\n  rules:\n    - host: '${manifestDomainName}'   # hostname to be connected in the Ingress\n      http:\n        paths:\n          - backend:\n              service:\n                name: ${applicationName}\n                port:\n                  number: ${port}\n            path: /\n            pathType: Prefix`,
    },
    {
      fileName: 'service.yaml',
      content: `apiVersion: v1\nkind: Service\nmetadata:\n  name: ${applicationName}\n  namespace: ${applicationName}\nspec:\n  selector:\n    app: ${applicationName}\n  ports:\n    - protocol: TCP\n      port: ${port}     \n      targetPort: ${port}    \n  type: LoadBalancer`,
    },
    {
      fileName: 'deployment.yaml',
      content: `apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: ${applicationName}\n  namespace: ${applicationName}\n  labels:\n    app: ${applicationName}\nspec:\n  replicas: 1\n  selector:\n    matchLabels:\n      app: ${applicationName}\n  strategy:\n    type: RollingUpdate\n    rollingUpdate:\n      maxSurge: 1\n      maxUnavailable: 0\n  template:\n    metadata:\n      name: ${applicationName}\n      labels:\n        app: ${applicationName}\n    spec:\n      containers:\n        - name: ${applicationName}\n          image: ${imageUrl}\n          imagePullPolicy: IfNotPresent\n          ports:\n            - containerPort: ${port}\n          resources:\n            requests:\n              cpu: ${cpuRequests}\n              memory: ${memoryRequests}\n            limits:\n              memory: ${memoryLimits}\n              cpu: ${cpuLimits}\n      restartPolicy: Always`,
    },
  ]
}
