import chapters from '@/assets/data/chapters';
import images from '@/assets/data/images';

export default {
  namespaced: true,
  state: {
    chapters: chapters,
    images: images
  },
  getters: {
    dataCount: state => state.chapters.length,
    dataTitles: state => state.chapters.map(item => item.title),
    getImageByIndex: state=> id => state.images.find(obj => obj.id === id)
  },
};
