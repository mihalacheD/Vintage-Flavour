'use client';
import { CldUploadWidget } from 'next-cloudinary';
import { Input } from '@nextui-org/input';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import {Image} from "@nextui-org/image";
import 'react-toastify/dist/ReactToastify.css';

interface UploadImgProps {
  onUploadSuccess: (imageUrl: string) => void; // Callback pentru a transmite URL-ul imaginii
}

const Upload_img: React.FC<UploadImgProps> = ({ onUploadSuccess }) => {

  const [ , setResource] = useState();
  const [imageURL, setImageURL] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUploadSuccess = (result: any) => {
    const uploadedURL = result?.info?.secure_url;
    if (uploadedURL) {
      setImageURL(uploadedURL); // Salvăm URL-ul imaginii uploadate
      onUploadSuccess(uploadedURL); // Trimitem URL-ul către formular

      // Afișează notificarea de succes
      toast.success('Image uploaded successfully!', {
        autoClose: 3000, // Închidere automată după 3 secunde
      });
    }
  };

  return (
    <>
    <CldUploadWidget
      signatureEndpoint="/api/sign-cloudinary-params"
      uploadPreset="recipes"
      options={{
       tags: ["Breakfast"],
       }}
      onSuccess={handleUploadSuccess}
      onAbort={() => {setResource(undefined)}}>
      {({ open }) => {
        function handleOnClick() {
          setResource(undefined);
          open();

        }
        return (
          <button type='button' onClick={handleOnClick}>
            <Input
                variant="bordered"
                size="lg"
                aria-label='upload_img'
                placeholder='Upload an Image'/>
          </button>
        );
      }}
    </CldUploadWidget>

      {/* Afișare imagine uploadată */}
      {imageURL && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>Uploaded Image:</p>
          <Image
            src={imageURL}
            alt="Uploaded"
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </div>
      )}

      {/* Container pentru notificări */}
      <ToastContainer />
      </>
  )
}

export default Upload_img;


