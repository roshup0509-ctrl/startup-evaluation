import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useEvaluations } from "@/contexts/EvaluationsContext";
import { formatDistanceToNow } from "date-fns";

export default function NotificationBell() {
  const { notifications, markAsRead } = useEvaluations();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-destructive" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h4 className="text-sm font-semibold">Notifications</h4>
          <span className="text-xs text-muted-foreground">{unreadCount} unread</span>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">No notifications</div>
          ) : (
            notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 border-b border-border last:border-0 hover:bg-muted/50 cursor-pointer transition-colors ${notification.read ? 'opacity-60' : ''}`}
                onClick={() => markAsRead(notification.id)}
              >
                <h5 className="text-sm font-medium mb-1">{notification.title}</h5>
                <p className="text-xs text-muted-foreground mb-2">{notification.description}</p>
                <span className="text-[10px] text-muted-foreground">
                  {formatDistanceToNow(new Date(notification.date), { addSuffix: true })}
                </span>
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
