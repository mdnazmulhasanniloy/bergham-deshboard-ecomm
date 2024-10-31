/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetSingleUserQuery } from "../../../redux/features/auth/authApi";
import showImage from "../../../utils/showImage";

const InfoRow = ({ label, value }: any) =>
  value && (
    <div className="flex justify-between items-center mb-4 text-18  border-b border-b-primary pb-4">
      <p>{label}</p>
      <p>{value}</p>
    </div>
  );

const UsersDetails = ({ id }: { id: string }) => {
  const { data } = useGetSingleUserQuery(id);
  return (
    <div className="mt-10">
      {data?.data?.image ? (
        <img
          src={showImage(data?.data?.image)}
          alt=""
          className="h-36 w-36 mx-auto rounded-full object-cover border"
        />
      ) : (
        <div className="my-10 ">
          <div className="mx-auto h-36 w-36 border rounded-full flex items-center justify-center">
            <p className="text-40">{data?.data?.name[0].toUpperCase()}</p>
          </div>
        </div>
      )}
      <InfoRow label="Customer Name" value={data?.data?.name} />
      <InfoRow label="Email" value={data?.data?.email} />
      <InfoRow
        label="Address"
        value={data?.data?.address?.city + "," + data?.data?.address?.country}
      />
    </div>
  );
};

export default UsersDetails;
