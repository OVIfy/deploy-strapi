module.exports = ({ env }) => ({
    // ...
    upload: {
      config: {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: env('CLOUDINARY_NAME'),
          api_key: env('CLOUDINARY_KEY'),
          api_secret: env('CLOUDINARY_SECRET'),
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      },
    },

    "fuzzy-search": {
      enabled: true,
      config: {
        contentTypes: [
          {
            uid: "api::event.event",
            modelName: "event",
            transliterate: true,
            fuzzysortOptions: {
              characterLimit: 300,
              threshold: -600,
              limit: 10,
              keys: [
                {
                  name: "name",
                  weight: 100,
                },
                {
                  name: "description",
                  weight: -100,
                },
              ],
            },
          },
        ],
      },
    },
    // ...
  });