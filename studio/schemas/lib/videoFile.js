export default {
  type: 'file',
  name: 'localVideo',
  title: 'Local Video',
  fields: [
    {
      type: 'picture',
      name: 'image',
      title: 'image',
      description: 'Fallback image for mobile/while loading video file',
      required: true,
      options: {
        hotspot: true
      }
    },

    {
      type: 'file',
      name: 'smallVersion',
      title: 'Smaller file version',
      description: "Shows on screens less than 750px wide.",
      options: {
        accept: 'video/mp4'
      }
    }
  ],
  options: {
    accept: 'video/mp4'
  },

}