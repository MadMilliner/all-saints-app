'use client'
import { useState, useEffect, useCallback, type FC, type KeyboardEvent } from "react";
 
// ─── Put your Instagram Basic Display API access token here ───────────────────
const ACCESS_TOKEN = "YOUR_ACCESS_TOKEN_HERE";
// ─────────────────────────────────────────────────────────────────────────────
 
const FIELDS =
  "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
 
type MediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
 
interface InstagramPost {
  id: string;
  caption?: string;
  media_type: MediaType;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
}
 
interface InstagramApiResponse {
  data: InstagramPost[];
  error?: { message: string };
}
 
interface InstagramFeedProps {
  limit?: number;
  showCaption?: boolean;
  profileHandle?: string;
}
 
interface MediaItemProps {
  post: InstagramPost;
  onClick: (post: InstagramPost) => void;
}
 
interface ModalProps {
  post: InstagramPost;
  onClose: () => void;
}
 
// ─── Helpers ──────────────────────────────────────────────────────────────────
 
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
 
function getMediaSrc(post: InstagramPost): string {
  return post.media_type === "VIDEO"
    ? (post.thumbnail_url ?? post.media_url)
    : post.media_url;
}
 
// ─── MediaItem ────────────────────────────────────────────────────────────────
 
const MediaItem: FC<MediaItemProps> = ({ post, onClick }) => {
  const [loaded, setLoaded] = useState(false);
  const src = getMediaSrc(post);
 
  const badgeLabel: Partial<Record<MediaType, string>> = {
    VIDEO: "VIDEO",
    CAROUSEL_ALBUM: "ALBUM",
  };
  const badge = badgeLabel[post.media_type];
 
  return (
    <div
      onClick={() => onClick(post)}
      style={{
        position: "relative",
        aspectRatio: "1",
        overflow: "hidden",
        cursor: "pointer",
        backgroundColor: "var(--color-background-secondary)",
        borderRadius: "var(--border-radius-md)",
      }}
    >
      {!loaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--color-background-secondary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 13, color: "var(--color-text-tertiary)" }}>
            Loading…
          </span>
        </div>
      )}
      <img
        src={src}
        alt={post.caption?.slice(0, 60) ?? "Instagram post"}
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: loaded ? "block" : "none",
          transition: "transform 0.25s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
      {badge && (
        <div
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            background: "rgba(0,0,0,0.55)",
            borderRadius: 4,
            padding: "2px 6px",
            fontSize: 11,
            color: "#fff",
            fontWeight: 500,
          }}
        >
          {badge}
        </div>
      )}
    </div>
  );
};
 
// ─── Modal ────────────────────────────────────────────────────────────────────
 
const Modal: FC<ModalProps> = ({ post, onClose }) => {
  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
 
  const src = getMediaSrc(post);
 
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.72)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--color-background-primary)",
          borderRadius: "var(--border-radius-lg)",
          overflow: "hidden",
          maxWidth: 580,
          width: "100%",
          border: "0.5px solid var(--color-border-tertiary)",
        }}
      >
        <img
          src={src}
          alt={post.caption?.slice(0, 60)}
          style={{
            width: "100%",
            display: "block",
            maxHeight: 480,
            objectFit: "cover",
          }}
        />
        <div style={{ padding: "16px 20px" }}>
          <p
            style={{
              fontSize: 13,
              color: "var(--color-text-secondary)",
              margin: "0 0 8px",
            }}
          >
            {formatDate(post.timestamp)}
          </p>
          {post.caption && (
            <p
              style={{
                fontSize: 14,
                color: "var(--color-text-primary)",
                margin: "0 0 16px",
                lineHeight: 1.6,
                maxHeight: 100,
                overflow: "auto",
              }}
            >
              {post.caption}
            </p>
          )}
          <div style={{ display: "flex", gap: 10 }}>
            <a
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 13,
                color: "var(--color-text-info)",
                textDecoration: "none",
                border: "0.5px solid var(--color-border-info)",
                borderRadius: "var(--border-radius-md)",
                padding: "6px 14px",
              }}
            >
              View on Instagram
            </a>
            <button
              onClick={onClose}
              style={{
                fontSize: 13,
                cursor: "pointer",
                background: "none",
                border: "0.5px solid var(--color-border-tertiary)",
                borderRadius: "var(--border-radius-md)",
                padding: "6px 14px",
                color: "var(--color-text-secondary)",
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
 
// ─── InstagramFeed ────────────────────────────────────────────────────────────
 
const InstagramFeed: FC<InstagramFeedProps> = ({
  limit = 12,
  showCaption = false,
  profileHandle = "",
}) => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<InstagramPost | null>(null);
 
  const fetchPosts = useCallback(async (): Promise<void> => {
    if (!ACCESS_TOKEN || ACCESS_TOKEN === "YOUR_ACCESS_TOKEN_HERE") {
      setError("No access token set. Update ACCESS_TOKEN at the top of the file.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const url = `https://graph.instagram.com/me/media?fields=${FIELDS}&limit=${limit}&access_token=${ACCESS_TOKEN}`;
      const res = await fetch(url);
      const data: InstagramApiResponse = await res.json();
      if (data.error) throw new Error(data.error.message);
      setPosts(data.data ?? []);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load posts.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [limit]);
 
  useEffect(() => {
    void fetchPosts();
  }, [fetchPosts]);
 
  return (
    <div style={{ fontFamily: "var(--font-sans)", maxWidth: 900, margin: "0 auto" }}>
      {selected && (
        <Modal post={selected} onClose={() => setSelected(null)} />
      )}
 
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
          paddingBottom: 16,
          borderBottom: "0.5px solid var(--color-border-tertiary)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <rect
              x="2" y="2" width="20" height="20" rx="6"
              stroke="var(--color-text-primary)" strokeWidth="1.5"
            />
            <circle
              cx="12" cy="12" r="4"
              stroke="var(--color-text-primary)" strokeWidth="1.5"
            />
            <circle cx="17.5" cy="6.5" r="1" fill="var(--color-text-primary)" />
          </svg>
          <span
            style={{ fontWeight: 500, fontSize: 16, color: "var(--color-text-primary)" }}
          >
            {profileHandle ? `@${profileHandle}` : "Instagram Feed"}
          </span>
        </div>
        {posts.length > 0 && (
          <span style={{ fontSize: 13, color: "var(--color-text-tertiary)" }}>
            {posts.length} posts
          </span>
        )}
      </div>
 
      {/* Error state */}
      {error && (
        <div
          style={{
            background: "var(--color-background-secondary)",
            borderRadius: "var(--border-radius-lg)",
            padding: "20px 24px",
            marginBottom: 24,
            border: "0.5px solid var(--color-border-tertiary)",
          }}
        >
          <p style={{ fontSize: 13, color: "var(--color-text-danger)", margin: "0 0 12px" }}>
            {error}
          </p>
          <button
            onClick={() => void fetchPosts()}
            style={{
              fontSize: 13,
              cursor: "pointer",
              padding: "6px 16px",
              borderRadius: "var(--border-radius-md)",
              border: "0.5px solid var(--color-border-secondary)",
              background: "none",
              color: "var(--color-text-primary)",
            }}
          >
            Retry
          </button>
        </div>
      )}
 
      {/* Loading skeleton */}
      {loading && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 6,
          }}
        >
          {Array.from({ length: limit }).map((_, i) => (
            <div
              key={i}
              style={{
                aspectRatio: "1",
                borderRadius: "var(--border-radius-md)",
                background: "var(--color-background-secondary)",
                animation: "pulse 1.4s ease-in-out infinite",
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
          <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
        </div>
      )}
 
      {/* Grid */}
      {!loading && posts.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 6,
          }}
        >
          {posts.map((post) => (
            <div key={post.id}>
              <MediaItem post={post} onClick={setSelected} />
              {showCaption && post.caption && (
                <p
                  style={{
                    fontSize: 12,
                    color: "var(--color-text-secondary)",
                    margin: "6px 0 0",
                    lineHeight: 1.5,
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {post.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
 
      {/* Empty state */}
      {!loading && !error && posts.length === 0 && (
        <p
          style={{
            textAlign: "center",
            color: "var(--color-text-tertiary)",
            fontSize: 14,
            padding: "40px 0",
          }}
        >
          No posts found.
        </p>
      )}
    </div>
  );
};
export default InstagramFeed