import { ChangeEvent, FormEvent, useState } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { CreatePostDocument,  useCreatePostMutation } from "../grapqhl/AllPosts.generated";
const NewPost: React.FC = () => {
    const [length, setLength] = useState<number | undefined>(undefined);
    const [weight, setWeight] = useState<number | undefined>(undefined);
    const [Content, setContent] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const currentUser = useCurrentUser();
    
    const handleLengthChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value);
    setLength(isNaN(value) ? undefined : value);
    };
  
    const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.target.value);
      setWeight(isNaN(value) ? undefined : value);
    };
    const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
      setContent(e.target.value);
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
          
          const position = await getCurrentLocation();
          const { latitude, longitude } = position.coords;
          useCreatePostMutation({
            variables: {
              lon:longitude|| 0,
              lat:latitude|| 0,
              lenght: length|| 0,
              weight: weight|| 0,
              content: Content|| "",
              imagelink: "https://imgur.com/gallery/8aeqFkQ"|| "",
              baitID: "651c0147b7af098d2461395b",
              userID: currentUser?.id || "",
              fishID: "651c188c9e07b36f246ba9ee" ||""
            },
            onError: (e) => {
              console.error(e);
            },
            onCompleted: (r) => {
              console.info(r);
            },
            refetchQueries: [CreatePostDocument],
          });
          console.log(currentUser?.username)
          console.log('Length:', length);
          console.log('Weight:', weight);
          console.log('Content:', Content);
          console.log('Image:', image);
          console.log('Latitude:', latitude);
          console.log('Longitude:', longitude);
        } catch (e) {
          console.error('Error getting location:', e);
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
            type="number"
            id="length"
            value={length}
            onChange={handleLengthChange}
          />
        </div>
        <div>
          <label htmlFor="weight">Weight:</label>
          <input
            type="number"
            id="weight"
            value={weight}
            onChange={handleWeightChange}
          />
        </div>
        <div>
          <label htmlFor="Content">Description:</label>
          <input
            type="text"
            id="Content"
            value={Content}
            onChange={handleContentChange}
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