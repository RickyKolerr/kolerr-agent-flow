
import React, { useState, useRef } from "react";
import { Paperclip, Image, Send, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AttachmentPreview } from "./AttachmentPreview";
import { useIsMobile } from "@/hooks/use-mobile";

interface MessageInputProps {
  onSendMessage: (content: string, attachments?: any[]) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isMobile = useIsMobile();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (message.trim() || attachments.length > 0) {
      onSendMessage(message, attachments);
      setMessage("");
      setAttachments([]);
      
      // Focus back on textarea after sending
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Convert FileList to Array and create previews
      const newAttachments = Array.from(files).map((file) => ({
        id: `attachment-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        file,
        name: file.name,
        size: file.size,
        type: file.type.split("/")[0],
        url: URL.createObjectURL(file),
      }));
      
      setAttachments((prev) => [...prev, ...newAttachments]);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => 
      prev.filter((attachment) => {
        if (attachment.id === id) {
          // Revoke object URL to prevent memory leaks
          URL.revokeObjectURL(attachment.url);
          return false;
        }
        return true;
      })
    );
  };

  return (
    <div className="border-t border-white/10 p-2 md:p-4 bg-black/10">
      {attachments.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {attachments.map((attachment) => (
            <AttachmentPreview
              key={attachment.id}
              attachment={attachment}
              onRemove={() => removeAttachment(attachment.id)}
            />
          ))}
        </div>
      )}
      
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            placeholder="Type a message..."
            className="resize-none py-3 pr-2 min-h-[50px] md:min-h-[60px] max-h-[120px] bg-black/20 border-white/10"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          
          {/* Mobile-optimized button group */}
          <div className="absolute bottom-2 left-2 flex gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            
            {/* Only show additional buttons on desktop */}
            {!isMobile && (
              <>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                >
                  <Image className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                >
                  <Smile className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            multiple
          />
        </div>
        <Button
          type="button"
          size="icon"
          className="h-10 w-10 rounded-full bg-brand-pink hover:bg-brand-pink/90 flex-shrink-0"
          onClick={handleSendMessage}
          disabled={!message.trim() && attachments.length === 0}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
