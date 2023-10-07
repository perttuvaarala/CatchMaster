import { ChangeEvent, FormEvent, useState } from "react";

const NewPost: React.FC = () => {
    const [length, setLength] = useState('');
    const [weight, setWeight] = useState('');
    const [image, setImage] = useState<string | null>(null);
  
    const handleLengthChange = (e: ChangeEvent<HTMLInputElement>) => {
      setLength(e.target.value);
    };
  
    const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
      setWeight(e.target.value);
    };
  
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            setImage(reader.result);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    };
  
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
    
        try {
          // Get current location
          const position = await getCurrentLocation();
          const { latitude, longitude } = position.coords;
    
          console.log('Length:', length);
          console.log('Weight:', weight);
          console.log('Image:', image);
          console.log('Latitude:', latitude);
          console.log('Longitude:', longitude);
        } catch (e) {
          console.error('Error getting location:');
        }
      };
    
      const getCurrentLocation = (): Promise<GeolocationPosition> =>
        new Promise((resolve, reject) => {
          if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser.'));
          } else {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          }
        });
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="length">Length:</label>
          <input
            type="text"
            id="length"
            value={length}
            onChange={handleLengthChange}
          />
        </div>
        <div>
          <label htmlFor="weight">Weight:</label>
          <input
            type="text"
            id="weight"
            value={weight}
            onChange={handleWeightChange}
          />
        </div>
        <div>
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {image && <img src={image} alt="Uploaded" style={{ maxWidth: '100px' }} />}
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  };
  
  export default NewPost;