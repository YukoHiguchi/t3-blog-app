import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import Header from "~/components/Header";
import { api } from "~/utils/api";

const PostBlog = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  // const [title, setTitle] = useState<string>("");
  // const [description, setDescription] = useState<string>("");
  const allBlogs = api.post.getAllBlogs.useQuery();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const postBlog = api.post.postBlog.useMutation({
    onSettled: () => {
      void allBlogs.refetch();
    },
  });
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここで `title` と `description` を使って blog を投稿する処理を追加してください。

    if (titleRef.current && descriptionRef.current) {
      postBlog.mutate({
        title: titleRef.current.value,
        description: descriptionRef.current.value,
      });
    }

    router.push("/");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="container flex flex-col items-center justify-center gap-4 px-4 py-16 ">
        <Header />

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-lg bg-white p-6 shadow-md"
        >
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-800"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="title"
              type="text"
              placeholder="Title"
              ref={titleRef}
            />
          </div>
          <div className="mb-6">
            <label
              className="mb-2 block text-sm font-bold text-gray-800"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="description"
              placeholder="Add description"
              ref={descriptionRef}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="focus:shadow-outline rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-700 focus:outline-none"
              type="submit"
            >
              Add
            </button>
            <Link
              href="/"
              className="inline-block align-baseline text-sm font-bold text-gray-500 hover:text-orange-600"
            >
              Cansel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default PostBlog;
