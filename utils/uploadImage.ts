import axios from "axios";

// const CLOUD_NAME = "he0pd9rd";
const UPLOAD_PRESET = "Viora-Product";

export async function uploadImage(file: File) {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const res = await axios.post(
        `${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
    );

    return res.data.secure_url;
}