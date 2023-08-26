import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session)
    return (
      <div className="bg-gray-800 p-4 ">
        <h3 className="text-gray-100 text-xl font-semibold mb-4">
          This page is rendered on the server.
        </h3>
        <p className="text-gray-100 text-xl font-semibold mb-4">
          Access Denied
        </p>
      </div>
    );

  return (
    <>
      <h3>This page is rendered on the server.</h3>
      <p>
        <strong>Session:</strong> {JSON.stringify(session, null, 2)}
      </p>
    </>
  );
};

export default page;
