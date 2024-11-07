import defaultSettings from '@/settings'

const title = defaultSettings.title || process.env.VUE_APP_BASE_TITLE

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${title}`
    // return `${pageTitle} - ${title}`
  }
  return `${title}`
}
