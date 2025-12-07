import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './uploadImage.css';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../Config/Client/Firebase';

const ImageUploadComponent = ({ id, onImageUpload }) => {
    const [pictures, setPictures] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploading, setUploading] = useState(false);

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (!file) return;

        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        setUploading(true);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                console.error("Upload failed:", error);
                setUploading(false);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setPictures([downloadURL]);
                    onImageUpload([downloadURL]);
                    setUploading(false);
                    setUploadProgress(0);
                });
            }
        );
    }, [onImageUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        maxFiles: 1,
    });

    return (
        <div>
            {/* Dropzone */}
            <div
                {...getRootProps()}
                className="dropzone-container"
                id={id}
                style={{
                    border: "2px dashed #aaa",
                    padding: "20px",
                    borderRadius: "10px",
                    textAlign: "center",
                    background: "#f8f9fa",
                    cursor: "pointer"
                }}
            >
                <input {...getInputProps()} />

                {isDragActive ? (
                    <p>Kéo ảnh vào đây...</p>
                ) : (
                    <p>Nhấn hoặc kéo ảnh vào để tải lên</p>
                )}
            </div>

            {/* Preview ảnh */}
            {pictures.length > 0 && (
                <div className="preview-container mt-3">
                    <img
                        src={pictures[0]}
                        alt="Preview"
                        style={{ width: "150px", borderRadius: "8px" }}
                    />
                </div>
            )}

            {/* Tiến trình upload */}
            {uploading && (
                <div className="float-end mt-2">
                    <p>Đang tải lên: {Math.round(uploadProgress)}%</p>
                    <progress value={uploadProgress} max="100" />
                </div>
            )}
        </div>
    );
};

export default ImageUploadComponent;
