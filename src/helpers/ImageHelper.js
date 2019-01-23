import env from '@/env/env'

export default class ImageHelper {
  static url(path) {
    return env.staticImagesHost + path;
  }
}