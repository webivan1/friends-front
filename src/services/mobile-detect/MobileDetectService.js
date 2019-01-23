import device from 'current-device';

export default class MobileDetectService {

  media = {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920
  };

  currentMedia = null;

  constructor() {
    this.device = device;
    this.currentMedia = this.setCurrentMedia();
  }

  setCurrentMedia() {
    const size = window.innerWidth;

    if (size >= this.media.xs && size < this.media.sm) {
      return 'xs';
    }

    if (size >= this.media.sm && size < this.media.md) {
      return 'sm';
    }

    if (size >= this.media.md && size < this.media.lg) {
      return 'md';
    }

    if (size >= this.media.lg && size < this.media.xl) {
      return 'lg';
    }

    if (size >= this.media.xl) {
      return 'xl';
    }
  }

  isMobile() {
    return this.device.mobile() || this.inMedia(['xs']);
  }

  isTablet() {
    return this.device.tablet() || this.inMedia(['xs', 'md']);
  }

  isDesctop() {
    return this.device.desktop() || this.inMedia(['md', 'lg', 'xl'])
  }

  inMedia(media) {
    return media.indexOf(this.currentMedia) !== -1;
  }

  getValueByData(data) {
    const currentSize = this.media[this.currentMedia];

    let dataValue = null;

    Object.keys(data)
      .map(key => [this.media[key], data[key]])
      .sort(([size1], [size2]) => size1 < size2 ? 1 : (size1 > size2 ? -1 : 0))
      .filter(([ size, value ]) => size <= currentSize)
      .forEach(([ size, value ]) => !dataValue ? dataValue = value : null);

    if (!dataValue) {
      dataValue = data[Object.keys(data).slice(0, 1)];
    }

    return dataValue;
  }

}