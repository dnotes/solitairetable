export default function getLabel(k:string):string {
  let l = k.replace(/.+\[/, '').replace('\]', '')
  let firstLetter = l.slice(0,1).toUpperCase()
  return l.replace(/[A-Z]/g, ' $&').replace(/^./, firstLetter)
}
