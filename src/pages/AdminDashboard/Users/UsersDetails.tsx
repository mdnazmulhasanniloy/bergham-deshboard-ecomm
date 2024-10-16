/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetSingleUserQuery } from "../../../redux/features/auth/authApi";
import showImage from "../../../utils/showImage";

const InfoRow = ({ label, value }: any) => (
  value&&<div className="flex justify-between items-center mb-4 text-18  border-b border-b-primary pb-4">
    <p>{label}</p>
    <p>{value}</p>
  </div>
);

const UsersDetails = ({ id }: { id: string }) => {
  const { data } = useGetSingleUserQuery(id);
  return (
    <div className="mt-10">
      <img
        src={showImage(data?.data?.image)}
        alt=""
        className="mx-auto rounded-full object-cover"
      />
      <InfoRow
        label="Customer Name"
        value={data?.data?.name}
      />
      <InfoRow label="Email" value={data?.data?.email} />
      <InfoRow
        label="Address"
        value={data?.data?.address?.city + "," + data?.data?.address?.country}
      />
    </div>
  );
};

export default UsersDetails;
