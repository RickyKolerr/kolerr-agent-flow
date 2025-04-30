
import React from "react";
import { X, File, Image as ImageIcon, FileVideo, Music } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AttachmentPreviewProps {
  attachment: {
    id: string;
    name: string;
    type: string;
    url: string;
    size: number;
  };
  onRemove: () => void;
}

export const AttachmentPreview: React.FC<AttachmentPreviewProps> = ({ attachment, onRemove }) => {
  const getIcon = () => {
    switch (attachment.type) {
      case "image":
        return <ImageIcon className="h-5 w-5" />;
      case "video":
        return <FileVideo className="h-5 w-5" />;
      case "audio":
        return <Music className="h-5 w-5" />;
      default:
        return <File className="h-5 w-5" />;
    }
  };

  return (
    <div className="relative group">
      {attachment.type === "image" ? (
        <div className="relative h-20 w-20 rounded-md overflow-hidden border border-white/10">
          <img
            src={attachment.url}
            alt={attachment.name}
            className="h-full w-full object-cover"
          />
          <Button
            variant="destructive"
            size="icon"
            className="h-5 w-5 absolute top-1 right-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={onRemove}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2 bg-black/20 p-2 rounded-md border border-white/10">
          <div className="bg-black/30 p-1 rounded-md">{getIcon()}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm truncate">{attachment.name}</p>
            <p className="text-xs text-gray-400">
              {(attachment.size / 1024).toFixed(1)} KB
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={onRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
