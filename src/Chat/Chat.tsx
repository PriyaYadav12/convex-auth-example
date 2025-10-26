import { Message } from "@/Chat/Message";
import { MessageList } from "@/Chat/MessageList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "convex/react";
import { FormEvent, useState } from "react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

export function Chat({ viewer }: { viewer: Id<"users"> }) {
  const [newMessageText, setNewMessageText] = useState("");
  const messages = useQuery(api.messages.list);
  const sendMessage = useMutation(api.messages.send);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage({ body: newMessageText })
      .then(() => {
        setNewMessageText("");
      })
      .catch((error) => {
        console.error("Failed to send message:", error);
      });
  };

  return (
    <>
      <MessageList>
        {messages?.map((message) => (
          <Message
            key={message._id}
            author={message.userId}
            authorName={message.author}
            viewer={viewer}
          >
            {message.body}
          </Message>
        ))}
      </MessageList>
      <div className="border-t-4 border-solid border-primary kid-bg-gradient">
        <form onSubmit={handleSubmit} className="container flex gap-3 py-6">
          <div className="flex-1 relative">
            <Input
              value={newMessageText}
              onChange={(event) => setNewMessageText(event.target.value)}
              placeholder="Tell us your story idea... ✨"
              className="kid-input text-lg"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl">
              {newMessageText ? '💭' : '✍️'}
            </div>
          </div>
          <Button 
            type="submit" 
            disabled={newMessageText === ""}
            className="kid-button bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="flex items-center gap-2">
              Send Story! 
              <span className="text-xl">🚀</span>
            </span>
          </Button>
        </form>
        <div className="container pb-4">
          <p className="text-sm text-center kid-text-secondary font-bold">
            💡 Tip: Share your favorite characters, places, or adventures!
          </p>
        </div>
      </div>
    </>
  );
}
