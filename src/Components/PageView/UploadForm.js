import React, { useState, useCallback } from "react";
import { useMutation, gql, useQuery } from "@apollo/client";
import get from "lodash/get";
import { makeStyles } from "@material-ui/core/styles";
import { useDropzone } from "react-dropzone";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import AddIcon from "@material-ui/icons/Add";
import blue from "@material-ui/core/colors/blue";

import { SINGLE_UPLOAD } from "Mutations/Photo";
import { PHOTOS } from "Queries/Photo";

const useStyles = makeStyles((theme) => ({
  thumbnail: {
    width: "200px",
    height: "200px",
    objectFit: "cover",
  },
  dropzone: {
    padding: "20px",
    // borderWidth: "2px",
    borderRadius: "2px",
    // borderColor: blue[500],
    // borderStyle: "dashed",
    border: `2px dashed ${blue[500]}`,
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    width: "240px",
    height: "240px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px",
  },
  addIcon: {
    fontSize: "40px",
    color: blue[500],
  },
}));

// http://localhost:4000/images/2bAlWn7VTAFZ.jpeg

export const ImageDropZone = ({ imgURL = "" }) => {
  const classes = useStyles({ imgURL });
  const [url, setUrl] = useState(imgURL);
  const [singleUpload] = useMutation(SINGLE_UPLOAD, {
    onCompleted: (data) => {
      const url = get(data, "singleUpload.url", "");
      setUrl(url);
    },
  });
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    const files = acceptedFiles.map((file) => file);
    console.log(files);
    if (files.length === 0) return;
    const file = files[0];
    console.log(file);
    singleUpload({ variables: { file: file, location: "LA" } });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
    accept: "image/jpeg, image/png",
  });

  return (
    <div className={classes.dropzone}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        {url.includes("http") ? (
          <img src={url} alt="" className={classes.thumbnail} />
        ) : (
          <AddIcon className={classes.addIcon} />
        )}
      </div>
    </div>
  );
};

export const UploadForm = () => {
  const { data, loading } = useQuery(PHOTOS, { variables: { location: "LA" } });
  if (!loading) console.log(data);
  const photos = get(data, "photos", []);
  console.log(photos);
  const maxCount = 3;

  const rowsWithPhoto = photos.map(({ fileName }) => {
    return (
      <ImageDropZone
        imgURL={`http://localhost:4000/images/${fileName}`}
        key={fileName}
      />
    );
  });

  let rowsWithoutPhoto = [];
  for (let i = 0; i < maxCount; i++) {
    rowsWithoutPhoto.push(<ImageDropZone key={`la_${i}`} />);
  }

  const rows = rowsWithPhoto.concat(rowsWithoutPhoto);

  return (
    <DashboardLayout title="Photo Gallery - Los Angeles" maxWidth="md">
      <div style={{ display: "flex", flexWrap: "wrap" }}>{rows}</div>
      <hr />
    </DashboardLayout>
  );
};

// export const UploadForm = () => {
//   const classes = useStyles();
//   const [singleUpload] = useMutation(SINGLE_UPLOAD, {
//     onCompleted: (data) => {
//       const url = get(data, "singleUpload.url", "");
//       setUrl(url);
//     },
//   });
//   const [url, setUrl] = useState("http://placehold.jp/200x200.png");

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     singleUpload({ variables: { file } });
//   };

//   return (
//     <div>
//       <h1>Upload File</h1>
//       <input type="file" onChange={handleFileChange} />
//       <img src={url} alt="" className={classes.thumbnail} />
//     </div>
//   );
// };
