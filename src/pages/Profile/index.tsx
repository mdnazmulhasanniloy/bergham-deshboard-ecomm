import FileUpload from "../../component/FileUpload";
import ProfileForm from "../../component/ProfileForm";
import UseImageUpload from "../../hooks/useImageUpload";
import { useProfileQuery } from "../../redux/features/auth/authApi";
import showImage from "../../utils/showImage";
import CustomSpinner from "../../component/CustomSpinner/CustomSpinner";
const Profile = () => {
  const { imageUrl, setFile, imageFile } = UseImageUpload();
  const { data: profile, refetch, isLoading } = useProfileQuery(undefined);

  if (isLoading) {
    return <CustomSpinner />;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-20 font-500 mb-2 text-gray">Personal Information</h1>
      <div className="bg-white p-6">
        <div className="flex items-center mb-8 gap-x-4">
          <div className="flex items-center gap-x-4">
            <FileUpload
              setSelectedFile={setFile}
              imageUrl={imageUrl ?? showImage(profile?.data?.image)}
            />
          </div>

          <div className="space-y-1">
            <h1 className="text-20 w-full text-gray font-500">
              Name:{" "}
              {profile?.data?.name}
            </h1>
            <h1 className="text-20 w-full text-gray font-500">
              Email: {profile?.data?.email}
            </h1>
            <h1 className="text-20 text-gray font-500">
              {profile?.data?.phoneNumber &&
                `Phone Number: ${profile?.data?.phoneNumber}`}
            </h1>
          </div>
        </div>

        <div className="w-full mt-4">
          <div className="w-full mt-4">
            <ProfileForm
              refetch={refetch}
              ProfileData={profile}
              imageFile={imageFile}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
