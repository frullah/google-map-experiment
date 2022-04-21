export default function createButton({ text }: { text: string })
{
  const button = document.createElement('button')
  button.className = 'p-2 bg-white hover:bg-blue-100';
  button.textContent = text
  return button
}
