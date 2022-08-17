
const stagingUrl = `https://fs2022.ekfapps.com`
export default function resolveProductionUrl(document) {
  if (document._type == 'section') {
    return `${stagingUrl}/#${section.anchor}`
  }
  if (document.slug.current == 'jobs' || document._id == 'jobs') {
    return `${stagingUrl}/jobs`
  }
  if (document.slug.current == 'contact') {
    return `${stagingUrl}/contact`
  }
  return `${stagingUrl}/${document.slug.current}`

}
