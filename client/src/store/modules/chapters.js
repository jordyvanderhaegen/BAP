import chapters from '@/assets/data/chapters.json';
import images from '@/assets/data/images.json';

export default {
  namespaced: true,

  state: {
    chapters,
    images,
  },

  getters: {
    dataCount: state => state.chapters.length,
    dataTitles: state => state.chapters.map(item => item.title),
    getImageByIndex: state => id => state.images.find(obj => obj.id === id),
  },
};
