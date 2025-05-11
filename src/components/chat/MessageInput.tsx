
import React, { useState, useRef, useCallback } from "react";
import { Paperclip, Send, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AttachmentPreview } from "./AttachmentPreview";
import { useMobileDetection } from "@/hooks/use-mobile-detection";

interface MessageInputProps {
  onSendMessage: (content: string, attachments?: any[]) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage, 
  disabled = false,
  placeholder = "Type a message..."
}) => {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<any[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { isMobile, hasTouch } = useMobileDetection();

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Send on Enter (but not with Shift+Enter for new line)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [message, attachments]);

  const handleSendMessage = useCallback(() => {
    if ((message.trim() || attachments.length > 0) && !disabled) {
      onSendMessage(message, attachments);
      setMessage("");
      setAttachments([]);
      
      // Focus back on textarea after sending
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  }, [message, attachments, onSendMessage, disabled]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
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
  }, []);

  const removeAttachment = useCallback((id: string) => {
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
  }, []);

  // Auto-resize textarea as user types
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  return (
    <div className="p-4 bg-black/30 backdrop-blur-md">
      {attachments.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2 max-h-24 overflow-y-auto">
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
            placeholder={placeholder}
            className={`resize-none py-3 pr-14 pl-10 min-h-[50px] max-h-[120px] rounded-full bg-black/20 border-white/10 transition-colors ${
              isFocused ? "border-brand-pink" : ""
            } ${disabled ? "opacity-50" : ""}`}
            value={message}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={{ touchAction: "manipulation" }}
            disabled={disabled}
          />
          
          {/* Attachment button */}
          <div className="absolute bottom-2.5 left-3 flex gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full bg-transparent hover:bg-white/10"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              title="Attach file"
            >
              <Paperclip className="h-4 w-4" />
              <span className="sr-only">Attach file</span>
            </Button>
          </div>
          
          {/* Emoji button (on desktop) */}
          {!isMobile && (
            <div className="absolute bottom-2.5 right-12">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full bg-transparent hover:bg-white/10"
                disabled={disabled}
                title="Add emoji"
              >
                <Smile className="h-4 w-4" />
                <span className="sr-only">Add emoji</span>
              </Button>
            </div>
          )}
          
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
            multiple
            disabled={disabled}
            accept="image/*,video/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
        </div>
        
        <Button
          type="button"
          size="icon"
          className={`h-10 w-10 rounded-full flex-shrink-0 ${
            message.trim() || attachments.length > 0 
              ? "bg-brand-pink hover:bg-brand-pink/90" 
              : "bg-gray-500/50 cursor-not-allowed"
          }`}
          onClick={handleSendMessage}
          disabled={disabled || (!message.trim() && attachments.length === 0)}
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
