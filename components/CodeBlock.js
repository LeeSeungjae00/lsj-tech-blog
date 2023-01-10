import SyntaxHighlighter from 'react-syntax-highlighter'

const CopyButton = ({ target }) => {
  const handleCopy = async () => {
    if (target) {
      try {
        await navigator.clipboard.writeText(target)

      } catch (error) {
        alert(`copy failed ${error}`)
      }
    }
  }
  return <button onClick={handleCopy} className='absolute bg-white dark:text-gray-800 right0.5 top-0.5 rounded-lg'>copy</button>
}

export default function CodeBlock({ children }) {
  return (
    <div className='relative'>
      <CopyButton target={children}></CopyButton>
      <SyntaxHighlighter>
        {children}
      </SyntaxHighlighter>
    </div>
  )
}
