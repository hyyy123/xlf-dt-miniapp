import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Мгдижа...'

export default function getPageTitle(key) {
  return `${title}`
}
