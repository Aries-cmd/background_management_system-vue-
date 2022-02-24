import i18n from '../../i18n/index'
const t = i18n.global.t

export const steps = [
  {
    element: '#guide',
    popover: {
      title: t('driver.guideBtn'),
      description: ',,,,,,,,,,,,,,',
      position: 'left'
    }
  },
  {
    element: '#hamburger',
    popover: {
      title: t('driver.hamburgerBtn'),
      description: ',,,,,,,,,,,,,,',
      position: 'bottom'
    }
  },
  {
    element: '#fullScreen',
    popover: {
      title: t('driver.fullScreen'),
      description: ',,,,,,,,,,,,,,',
      position: 'left'
    }
  }
]
