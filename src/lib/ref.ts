export default (ref:DocBase) => {
  return ref._type != 'page' ?  '/' + ref._type + '/' + ref.slug.current :'/' + ref.slug.current
}