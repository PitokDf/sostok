import PostCard from "@/components/ui/PostCard";
import { PostType } from "@/types/post";
import { cookies } from "next/headers";

const fetchBerandaData = async () => {
  const cookieStore = cookies();
  const semuaCookies = (await cookieStore).getAll();

  // Buat header 'Cookie' dari semua cookies yang ada
  const cookieHeader = semuaCookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');

  const url = `${process.env.API_URL?.replace('"', "").replace('";', "")}/posts/users/beranda`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Cookie': cookieHeader,
      },
    });
    return (await response.json()).data;
  } catch (error) {
    console.log(`url: ${url}`);
    console.log("Error" + error);
  }
}

export default async function Home() {
  const data: PostType[] = await fetchBerandaData();

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen bg-light p-8 sm:p-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <header className="row-start-1 text-center">
        <h1 className="text-primary text-2xl font-bold">Welcome to Social Media</h1>
        <p className="text-secondary text-lg">Connect, Chat, and Share!</p>
      </header>

      {/* Main Content */}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {
          data?.length > 0 ?
            data.map((post, index) => (
              <PostCard key={`${index}-${post.user.username}`} post={post || []} />
            )) : <h1>Data Kosong</h1>
        }
      </main>
      {/* Footer */}
      <footer className="row-start-3 text-center">
        <p className="text-secondary text-sm">
          Made with <span className="text-error">♥</span> by Your Name
        </p>
      </footer>
    </div>
  );
}
