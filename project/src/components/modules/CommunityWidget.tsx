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
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:pb-3">
        <CardTitle className="text-sm sm:text-base font-semibold">
          {mode === 'moderate' ? 'Community Moderation' : 'Community'}
        </CardTitle>
        {mode !== 'moderate' && (
          <Button variant="outline" size="sm" className="h-7 text-xs" aria-label={mode === 'preview' ? 'View all posts' : 'Create new post'}>
            {mode === 'preview' ? 'View all' : 'New post'}
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-2 sm:space-y-3">
        {mode === 'moderate' && (
          <div className="flex gap-2 pb-1" role="region" aria-label="Moderation statistics">
            <div className="flex-1 rounded-lg border border-border/50 bg-warning/5 px-2 sm:px-3 py-1.5 sm:py-2 text-center">
              <p className="text-base sm:text-lg font-bold text-warning" aria-label="3 posts awaiting review">3</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Awaiting review</p>
            </div>
            <div className="flex-1 rounded-lg border border-border/50 bg-destructive/5 px-2 sm:px-3 py-1.5 sm:py-2 text-center">
              <p className="text-base sm:text-lg font-bold text-destructive" aria-label="1 flagged post">1</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Flagged</p>
            </div>
            <div className="flex-1 rounded-lg border border-border/50 bg-success/5 px-2 sm:px-3 py-1.5 sm:py-2 text-center">
              <p className="text-base sm:text-lg font-bold text-success" aria-label="142 published posts">142</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Published</p>
            </div>
          </div>
        )}

        {posts.map((post) => (
          <article
            key={post.id}
            className="rounded-xl border border-border/50 p-2.5 sm:p-3 transition-colors hover:bg-secondary/30 cursor-pointer"
            tabIndex={0}
            aria-label={`Post by ${post.author}: ${post.content}`}
          >
            <div className="flex items-start gap-2">
              {/* Avatar */}
              <div
                className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] sm:text-xs font-semibold text-primary"
                aria-hidden="true"
              >
                {post.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
                  <span className="text-xs sm:text-sm font-medium">{post.author}</span>
                  {post.verified && <BadgeCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" aria-label="Verified user" />}
                  <span className="text-[10px] sm:text-xs text-muted-foreground">{post.role}</span>
                  {post.trending && (
                    <div className="flex items-center gap-0.5 rounded-full bg-destructive/10 px-1.5 py-0.5" aria-label="Trending post">
                      <Flame className="h-2.5 w-2.5 text-destructive" aria-hidden="true" />
                      <span className="text-[9px] sm:text-[10px] font-medium text-destructive">Trending</span>
                    </div>
                  )}
                  <time className="ml-auto text-[10px] sm:text-xs text-muted-foreground">{post.time}</time>
                </div>
                <p className="mt-1 text-[10px] sm:text-xs leading-relaxed text-muted-foreground line-clamp-2">
                  {post.content}
                </p>
                <div className="mt-1.5 sm:mt-2 flex items-center gap-2 sm:gap-3">
                  <Badge variant="outline" className={cn('text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0', tagStyles[post.tagTone])}>
                    {post.tag}
                  </Badge>
                  <div className="ml-auto flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={() => setLiked(prev => {
                        const next = new Set(prev);
                        next.has(post.id) ? next.delete(post.id) : next.add(post.id);
                        return next;
                      })}
                      className={cn('flex items-center gap-1 text-[10px] sm:text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm', liked.has(post.id) ? 'text-primary' : 'text-muted-foreground hover:text-foreground')}
                      aria-label={`Like post, ${post.likes + (liked.has(post.id) ? 1 : 0)} likes`}
                      aria-pressed={liked.has(post.id)}
                    >
                      <ThumbsUp className="h-3 w-3" aria-hidden="true" />
                      {post.likes + (liked.has(post.id) ? 1 : 0)}
                    </button>
                    <span className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground" aria-label={`${post.comments} comments`}>
                      <MessageCircle className="h-3 w-3" aria-hidden="true" />
                      {post.comments}
                    </span>
                    {mode !== 'moderate' && (
                      <button
                        className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground hover:text-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
                        aria-label="Share post"
                      >
                        <Share2 className="h-3 w-3" aria-hidden="true" />
                      </button>
                    )}
                    {mode === 'moderate' && (
                      <Button size="sm" variant="outline" className="h-6 px-2 text-[10px] sm:text-xs" aria-label={`Review post by ${post.author}`}>
                        Review
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </CardContent>
    </Card>
  );
}
