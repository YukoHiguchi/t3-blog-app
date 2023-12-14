import { useRouter } from "next/router";
import { useRouter as useRouterPush } from "next/navigation";
import { api } from "~/utils/api";
import { useState } from "react";
import ConfirmModal from "~/components/ConfirmModal";
import Custom404 from "../404";

const DetailBlog: React.FC = () => {
  const router = useRouter();
  const routerPush = useRouterPush();
  const { id } = router.query;
  const parseIntId = id ? Number(id) : NaN;
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data: blog } = api.post.getDetailBlog.useQuery({ id: parseIntId });
  if (!blog) {
    return <Custom404 />;
  }

  const handleDeleteTrue = () => {
    setIsOpen(false);
    handleGoHome();
  };

  const handleGoHome = () => {
    routerPush.push("/");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="mx-auto mt-10 w-full max-w-2xl rounded-md bg-white p-6 shadow-md">
        <h1 className="mb-4 text-3xl font-bold">{blog?.title}</h1>
        <div className="mb-8 text-sm text-gray-500">
          <span>{blog?.createdAt.toLocaleDateString()}</span>{" "}
        </div>
        <p className="whitespace-pre-line text-gray-700">{blog?.description}</p>
        <button
          className="mt-4 rounded-md bg-red-500 px-4 py-2 text-white"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Delete
        </button>
        {isOpen && (
          <ConfirmModal
            isOpen={isOpen}
            onClose={() => {
              setIsOpen(false);
            }}
            onDelete={handleDeleteTrue}
          />
        )}
      </div>
      <button
        onClick={handleGoHome}
        type="button"
        className="mt-8 flex items-center justify-center gap-x-2 rounded-lg border bg-white px-5 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-orange-500 sm:w-auto"
      >
        <svg
          className="h-5 w-5 rtl:rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
        <span>Go back</span>
      </button>
    </main>
  );
};

export default DetailBlog;
