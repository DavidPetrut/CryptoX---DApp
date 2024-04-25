
const ProfileImage = ({ imagePath, altText, className, onClick }:any ) => {
    const defaultImage = 'path_to_some_default_image_if_you_have_one'; 
  
    return (
      <img
        src={imagePath ? `http://localhost:3001${imagePath}` : defaultImage}
        alt={altText}
        className={className}
        onClick={onClick}
      />
    );
  };
  
  export default ProfileImage;
