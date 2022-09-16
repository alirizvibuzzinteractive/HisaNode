const MediaUploader = require("../midleware/mediaUploader")

const UploadMediaToAWS = async (req, res) => {
  try {
    console.warn(req.files);
    if (req.file) {
      const result = await MediaUploader.UploadMediaToAWS(req.file);
      const media = result.Location;

      const payload = { ...req.body, media };
      await StoryService.createStory(payload).then((createStoryResponse) => {
          return res.status(200).send({
              status: true,
              data: createStoryResponse
          });
      })
    } else {
      return res.status(404).send({
        status: false,
        error: "Please upload attachment and must be less than 1 MB",
      });
    }
  } catch (error) {
    return res.status(404).send({
      status: false,
      message: error.message,
    });
  }
};
module.exports= { UploadMediaToAWS };
