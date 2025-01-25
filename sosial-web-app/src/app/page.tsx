import Button from "@/components/Button";
import ImageSlider from "@/components/ImageSlider";
import ChatUI from "@/components/ui/ChatUI";
import PostCard from "@/components/ui/PostCard";
import SendMessageUI from "@/components/ui/SendMessage";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen bg-light p-8 sm:p-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <header className="row-start-1 text-center">
        <h1 className="text-primary text-2xl font-bold">Welcome to Social Media</h1>
        <p className="text-secondary text-lg">Connect, Chat, and Share!</p>
      </header>

      {/* Main Content */}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Button
          shape="rounded"
          size="small"
          type="button"
          variant="primary"
          isLoading={false}
        >
          Primary Button
        </Button>
        <Button
          shape="rounded"
          size="medium"
          type="button"
          variant="success"
          isLoading={false}
        >
          Success Button
        </Button>
        <Button
          shape="rounded"
          size="large"
          type="submit"
          variant="warning"
          isLoading={true}
        >
          Loading Button
        </Button>

        <div className="w-full">
          <SendMessageUI />
        </div>
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
