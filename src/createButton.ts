export default function createButton({ text }: { text: string })
{
  const button = document.createElement('button')
  button.className = 'p-2 bg-white'
  button.textContent = text
  return button
}
