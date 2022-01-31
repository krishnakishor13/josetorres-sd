import React, { useRef, useState } from "react";
import { Page, Section } from "react-page-layout";
import { useDispatch, useSelector } from "react-redux";
import uploadImage from "../assets/images/add-profile.png";
import { updateProfile } from "../reducks/users/operations";
import { getUser } from "../reducks/users/selectors";

export default function MyProfile() {
	const dispatch = useDispatch();
	const selector = useSelector((state) => state);
	const user = getUser(selector);
	const userValues = { id: user.id, name: user.name, email: user.email, profile: user.profile };
	const [values, setValues] = useState(userValues);
	const [image, setImage] = useState([]);
  	const [isLoading, setIsLoading] = useState(false);
	

	const [previewImage, setPreviewImage] = useState(null);

	const inputFile = useRef(null);
	const onButtonClick = () => {
		inputFile.current.click();
	};

	const inputImage = (event) => {
		const file = event.target.files[0];
		const objectUrl = URL.createObjectURL(file);
		setPreviewImage(objectUrl);
		setImage(file);
		setValues({...values, profile: null})
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		setValues({
			...values,
			[name]: value,
		});
	};

	const updateProfileHandler = async () => {
		setIsLoading(true);
		await dispatch(updateProfile({ ...values, profile: image }, values.id));
    	setIsLoading(false);
	};

	return (
		<Page layout="default">
			<Section slot="main">
				<div className="profile">
					<form className="form-container">
						<input type="file" style={{ display: "none" }} ref={inputFile} onChange={inputImage} />
						<img
							onClick={onButtonClick}
							name="image"
							type="file"
							src={previewImage ? previewImage : values.profile ? values.profile : uploadImage}
							className={`upload-area`}
							alt="Upload"
						/>
						<div className="upload-text">{`${isLoading ? 'Updating Profile...' : 'Edit Profile'}`}</div>
						<label className="profile-input-label" htmlFor="name">
							Name
						</label>
						<input
							onChange={handleInputChange}
							type="text"
							value={values.name}
							name="name"
							className="profile-input"
							placeholder="Type your name"
						/>
						<label className="profile-input-label" htmlFor="name">
							Mail Address
						</label>
						<input
							onChange={handleInputChange}
							type="email"
							value={values.email}
							name="email"
							className="profile-input"
							placeholder="Type your mail address"
						/>
						<button onClick={updateProfileHandler} type="button" className="custom-btn">
							Done
						</button>
					</form>
				</div>
			</Section>
		</Page>
	);
}
