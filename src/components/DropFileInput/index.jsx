import React from "react";
import { Typography } from "@material-ui/core";
import { FileUploader } from "react-drag-drop-files";
import PublishIcon from "@material-ui/icons/Publish";
import { useStyles } from "./styles";

const UploadImage = React.forwardRef(
  ({ handleImageUploadComplete, helperText, error, value }, ref) => {
    const classes = useStyles();
    const [isImgUploading, setIsImgUploading] = React.useState(false);
    const [isInvalidFile, setIsInvalidFile] = React.useState(false);
    const handleFileUpload = (file) => {
      setIsInvalidFile(null);
      setIsImgUploading(true);
      // check for file
      if (
        !file ||
        !/\.(jpg|jpeg|png|gif|tiff|tif|heif|heic|svg|svgz|ai|mp4|ogg|webm|mov)$/.test(
          file.name.toLowerCase()
        )
      ) {
        setIsInvalidFile("Only image and video NFTs are allowed.");
        setIsImgUploading(false);
        return false;
      }
      setIsImgUploading(false);
      handleImageUploadComplete(file);
      const res = URL.createObjectURL(file);
      ref.current.poster = res;
      ref.current.src = res;
    };
    return (
      <div className={classes.leftleft}>
        <div className={classes.label1}>
          <FileUploader
            classes="drag_n_drop"
            handleChange={handleFileUpload}
            name="imageFile"
            type="file"
          >
            <div className={classes.innerLabel}>
              <PublishIcon
                style={{ fontSize: "90px" }}
                className={classes.uploadicon}
              />
              <p className={classes.drag}>
                Drag and drop or Choose file to upload
              </p>
            </div>
          </FileUploader>
        </div>
        <div className={classes.mainLabel}>
          {(error || isInvalidFile) && (
            <p className={classes.error}>{isInvalidFile || helperText}</p>
          )}
        </div>
      </div>
    );
  }
);
export default UploadImage;
