import React, { useState } from 'react';

const ImageUploader = ({ setFile }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        setFile(file); // Добавьте вызов setFile для установки файла в родительском компоненте
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        setFile(file); // Добавьте вызов setFile для установки файла в родительском компоненте
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{ border: '2px dashed #aaa', padding: '20px', textAlign: 'center' }}
      >
        <p>Перетащите изображение сюда или выберите файл</p>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </div>

      {selectedImage && (
        <div>
          <h4>Выбранное изображение:</h4>
          <img src={selectedImage} alt="Выбранное изображение" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
