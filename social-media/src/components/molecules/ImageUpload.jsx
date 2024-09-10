import React, { useState } from 'react';

const ImageUpload = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);

    
    const handleImageChange = (e) => {
        const file = e.target.files[0]; 

       
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(file);
            setPreview(URL.createObjectURL(file)); // Generate a preview URL
        } else {
            alert('Please select a valid image file');
        }
    };

   
    const removeImage = () => {
        setSelectedImage(null);
        setPreview(null); // Clear the preview
    };

    return (
        <div className="container mx-auto my-4">
            <h2 className="text-lg font-bold mb-2">Upload and Preview Image</h2>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mb-4"
            />
            {preview && (
                <div className="image-preview mb-4">
                    <img
                        src={preview}
                        alt="Preview"
                        className="max-w-full h-auto"
                    />
                    <button
                        onClick={removeImage}
                        className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                    >
                        Remove Image
                    </button>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
