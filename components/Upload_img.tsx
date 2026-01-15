'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { Input, Image } from "@heroui/react";
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface UploadImgProps {
  onUploadSuccess: (imageUrl: string) => void;
}

const Upload_img: React.FC<UploadImgProps> = ({ onUploadSuccess }) => {
  const [imageURL, setImageURL] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUploadSuccess = (result: any) => {
    const uploadedURL = result?.info?.secure_url;

    if (uploadedURL) {
      setImageURL(uploadedURL);
      onUploadSuccess(uploadedURL);

      document.body.style.overflow = '';

      toast.success('Image uploaded successfully!', {
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <CldUploadWidget
        signatureEndpoint="/api/sign-cloudinary-params"
        uploadPreset="recipes"
        options={{
          tags: ['Recipe'],
        }}
        onSuccess={handleUploadSuccess}
        onAbort={() => {
          document.body.style.overflow = '';
        }}
      >
        {({ open }) => (
          <button type="button" onClick={() => open()} className="w-full">
            <Input
              variant="bordered"
              size="lg"
              readOnly
              aria-label="Upload image"
              placeholder="Upload an image"
              className="cursor-pointer"
            />
          </button>
        )}
      </CldUploadWidget>

      {/* Preview imagine */}
      {imageURL && (
        <div className="mt-6 flex flex-col items-center gap-3">
          <p className="text-sm font-medium text-gray-700">Uploaded image</p>
          <Image
            src={imageURL}
            alt="Uploaded"
            className="max-w-full rounded-xl"
          />
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default Upload_img;
