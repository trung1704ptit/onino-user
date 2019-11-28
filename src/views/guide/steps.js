import i18n from '@/lang';

const steps = [
  {
    element: '#hamburger-container',
    popover: {
      title: 'Hamburger',
      description: i18n.t('guide.sideBar'),
      position: 'bottom'
    }
  },
  {
    element: '#breadcrumb-container',
    popover: {
      title: 'Breadcrumb',
      description: i18n.t('guide.breadcrumb'),
      position: 'bottom'
    }
  },
  {
    element: '#header-search',
    popover: {
      title: 'Page Search',
      description: i18n.t('guide.searchDescription'),
      position: 'left'
    }
  },
  { 
    element: '#screenfull',
    popover: {
      title: 'Screenfull',
      description: i18n.t('guide.fullScreen'),
      position: 'left'
    }
  },
  {
    element: '#tags-view-container',
    popover: {
      title: 'Tags view',
      description: i18n.t('guide.tagsViewDescription'),
      position: 'bottom'
    },
    padding: 0
  }
]

export default steps
