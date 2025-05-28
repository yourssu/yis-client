import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/one-dark'

import { DeploymentManifestType } from '@/types/deployment'

interface ApplicationDeploymentManifestDialogContentProps {
  manifest: DeploymentManifestType
}

export const ApplicationDeploymentManifestDialogContent = ({
  manifest,
}: ApplicationDeploymentManifestDialogContentProps) => {
  const manifestExtension = manifest.fileName.split('.').pop() || ''
  const lines = manifest.content.split('\n').length

  return (
    <SyntaxHighlighter
      customStyle={{
        width: '100%',
        flex: '1 1 auto',
        background: 'transparent',
        fontSize: 13,
        lineHeight: 1.45,
        padding: '10px 0 20px 0',
        margin: 0,
      }}
      language={manifestExtension}
      lineNumberStyle={{
        minWidth: `${1 + Math.max(lines.toString().length, 2)}.25em`,
      }}
      showLineNumbers
      style={prism}
    >
      {manifest.content}
    </SyntaxHighlighter>
  )
}
