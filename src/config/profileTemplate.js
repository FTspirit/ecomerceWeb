const profileTemplate = {
  normal: {
    flag: false,
    image: '',
    video: '',
    icon: '',
  },
  independence_day: {
    flag: true,
    image: '',
    video: 'https://api.storage.staging.gofa.vn/admin/video/Lark20230825-180949.mp4',
    icon: 'national flag',
  },
  tet_day: {
    flag: true,
    image: '',
    video: '',
    icon: 'https://api-storage-staging.gofa.vn/admin/video/gofa_car.gltf',
  },
};
const profileTemplateV2 = {
  normal: {
    flag: false,
    image: '',
    video: '',
    icon: '',
    secure: true,
  },
  independence_day: {
    flag: true,
    image: '',
    video: 'https://api.storage.staging.gofa.vn/admin/video/Lark20230825-180949.mp4',
    icon: 'national flag',
  },
  tet_day: {
    flag: false,
    image: '',
    video: '',
    icon: 'https://api-storage-staging.gofa.vn/admin/video/gofa_car.gltf',
    secure: true,
  },
};

const profileTemplateUpdatePasswword = {
  normal: {
    flag: false,
    image: '',
    video: '',
    icon: '',
    secure: true,
  },
  independence_day: {
    flag: true,
    image: '',
    video: 'https://api.storage.staging.gofa.vn/admin/video/Lark20230825-180949.mp4',
    icon: 'national flag',
  },
  tet_day: {
    flag: false,
    image: '',
    video: '',
    icon: 'https://api-storage-staging.gofa.vn/admin/video/gofa_car.gltf',
    secure: true,
  },
};

module.exports = {
  profileTemplate,
  profileTemplateV2,
  profileTemplateUpdatePasswword,
};
