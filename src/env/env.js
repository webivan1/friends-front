const env = process.env.NODE_ENV === 'development'
  ? {
    mediaUrl: 'http://friends.loc',
    apiUrl: 'http://friends.loc/api',
    langUrl: 'http://friends.loc',
    staticImagesHost: 'http://friends.loc',
    onlineUserHost: ':6002',
    auth: {
      clientId: 2,
      clientSecret: 'B7DXgh9S0Np9sKz4FBTxM9sU0wY8I7hBfj71gi77'
    },
    yandexApiKey: 'e79b7ae4-40d6-410c-a6b2-3dbe7156d57c'
  }
  : {
    mediaUrl: 'http://media.my-tutor.club',
    apiUrl: 'https://my-tutor.club/api',
    langUrl: 'https://my-tutor.club',
    staticImagesHost: 'https://my-tutor.club',
    onlineUserHost: ':6002',
    auth: {
      clientId: 2,
      clientSecret: 'D0AMeFodfbEHkka6NRtl2tZIKcxUhJf4vUsHSP9g'
    },
    yandexApiKey: 'e79b7ae4-40d6-410c-a6b2-3dbe7156d57c'
  };

export default env;
