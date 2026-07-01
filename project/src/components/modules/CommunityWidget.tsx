'use client';

import { useState } from 'react';
import { ThumbsUp, MessageCircle, Share2, Flame, BadgeCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type CommunityMode = 'feed' | 'preview' | 'moderate';

interface CommunityWidgetProps {
  mode?: CommunityMode;
}

const mockPosts = [
  {
    id: 'p1',
    author: 'Emeka Okafor',
    role: 'Farmer',
    verified: true,
    avatar: 'EO',
    time: '2h ago',
    content: 'Just harvested 3.8T of tomatoes from Plot B — best yield this season! The drip irrigation system made all the difference.',
    likes: 24,
    comments: 8,
    tag: 'Success Story',
    tagTone: 'success',
    trending: true,
  },
  {
    id: 'p2',
    author: 'Dr. Amina Bello',
    role: 'Expert',
    verified: true,
    avatar: 'AB',
    time: '5h ago',
    content: 'Reminder: With the rains coming Wednesday, hold off on pesticide application until Thursday. Wet conditions reduce effectiveness by up to 60%.',
    likes: 42,
    comments: 15,
    tag: 'Expert Tip',
    tagTone: 'primary',
    trending: true,
  },
  {
    id: 'p3',
    author: 'Fatima Ibrahim',
    role: 'Buyer',
    verified: false,
    avatar: 'FI',
    time: '1d ago',
    content: 'Looking for reliable cassava suppliers in Kano region — 500kg/week minimum. DM me or connect through the platform.',
    likes: 11,
    comments: 6,
    tag: 'Procurement',
    tagTone: 'default',
    trending: false,
  },
];

const tagStyles: Record<string, string> = {
  success: 'border-success/30 text-success',
  primary: 'border-primary/30 text-primary',
  warning: 'border-warning/30 text-warning',
  default: 'border-border text-muted-foreground',
};

export function CommunityWidget({ mode = 'feed' }: CommunityWidgetProps) {
  const [liked, setLiked] = useState<Set<string>>(new Set());

  const posts = mode === 'preview' ? mockPosts.slice(0, 2) : mockPosts;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-base font-semibold">
          {mode === 'moderate' ? 'Community Moderation' : 'Community'}
        </CardTitle>
        {mode !== 'moderate' && (
          <Button variant="outline" size="sm" className="h-7 text-xs">
            {mode === 'preview' ? 'View all' : 'New post'}
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {mode === 'moderate' && (
          <div className="flex gap-2 pb-1">
            <div className="flex-1 rounded-lg border border-border/50 bg-warning/5 px-3 py-2 text-center">
              <p className="text-lg font-bold text-warning">3</p>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </div>
            <div className="flex-1 rounded-lg border border-border/50 bg-destructive/5 px-3 py-2 text-center">
              <p className="text-lg font-bold text-destructive">1</p>
              <p className="text-xs text-muted-foreground">Flagged</p>
            </div>
            <div className="flex-1 rounded-lg border border-border/50 bg-success/5 px-3 py-2 text-center">
              <p className="text-lg font-bold text-success">142</p>
              <p className="text-xs text-muted-foreground">Published</p>
            </div>
          </div>
        )}

        {posts.map((post) => (
          <div key={post.id} className="rounded-xl border border-border/50 p-3 transition-colors hover:bg-secondary/30">
            <div className="flex items-start gap-2">
              {/* Avatar */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                {post.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-sm font-medium">{post.author}</span>
                  {post.verified && <BadgeCheck className="h-3.5 w-3.5 text-primary" />}
                  <span className="text-xs text-muted-foreground">{post.role}</span>
                  {post.trending && (
                    <div className="flex items-center gap-0.5 rounded-full bg-destructive/10 px-1.5 py-0.5">
                      <Flame className="h-2.5 w-2.5 text-destructive" />
                      <span className="text-[10px] font-medium text-destructive">Trending</span>
                    </div>
                  )}
                  <span className="ml-auto text-xs text-muted-foreground">{post.time}</span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                  {post.content}
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <Badge variant="outline" className={cn('text-[10px] px-1.5 py-0', tagStyles[post.tagTone])}>
                    {post.tag}
                  </Badge>
                  <div className="ml-auto flex items-center gap-3">
                    <button
                      onClick={() => setLiked(prev => {
                        const next = new Set(prev);
                        next.has(post.id) ? next.delete(post.id) : next.add(post.id);
                        return next;
                      })}
                      className={cn('flex items-center gap-1 text-xs transition-colors', liked.has(post.id) ? 'text-primary' : 'text-muted-foreground hover:text-foreground')}
                    >
                      <ThumbsUp className="h-3 w-3" />
                      {post.likes + (liked.has(post.id) ? 1 : 0)}
                    </button>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MessageCircle className="h-3 w-3" />
                      {post.comments}
                    </span>
                    {mode !== 'moderate' && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground cursor-pointer">
                        <Share2 className="h-3 w-3" />
                      </span>
                    )}
                    {mode === 'moderate' && (
                      <Button size="sm" variant="outline" className="h-6 px-2 text-xs">Review</Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
