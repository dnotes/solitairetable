export function modal(node:HTMLElement) {
  const handleClick = (event:any) => {
    if(!node.contains(event.target)) node.dispatchEvent(new CustomEvent('cancel'))
  }
  const handleEscape = (event:any) => {
    if (event.key === 'Escape') node.dispatchEvent(new CustomEvent('cancel'))
  }

  document.addEventListener('click', handleClick)
  document.addEventListener('keydown', handleEscape)

  return {
    destroy() {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }
}
