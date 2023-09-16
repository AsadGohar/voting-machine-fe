import React from "react";
import { Button } from "@mui/material";
const cloudName = import.meta.env.VITE_APP_DEV_CLOUD_NAME;
const cloudPreset = import.meta.env.VITE_APP_DEV_CLOUD_PRESET;

interface IProps {
	type: string;
	setImage: (url: string) => void;
}

export const ImageUpload = (props: IProps) => {
	const { setImage, type } = props;
	React.useEffect(() => {
		{
			const myWidget = window.cloudinary.createUploadWidget(
				{
					cloudName: cloudName,
					uploadPreset: cloudPreset,
				},
				(error: any, result: any) => {
					if (!error && result && result.event === "success") {
						setImage(result.info.url);
					}
				}
			);
			const uploadWidget = document?.getElementById("upload_widget");
			if (uploadWidget) {
				uploadWidget.addEventListener(
					"click",
					function () {
						myWidget.open();
					},
					false
				);
			}
		}
	});

	return (
		<Button
			id="upload_widget"
			className="cloudinary-button"
			variant="contained"
			component="span"
		>
			Select {type} Picture
		</Button>
	);
};

export default ImageUpload;
