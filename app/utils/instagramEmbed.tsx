'use client'
import { useState, useEffect, useCallback, type FC } from "react";
import { createPortal } from "react-dom";

// ─── Behold feed URL ──────────────────────────────────────────────────────────
const BEHOLD_FEED_URL = "https://feeds.behold.so/0o7r3Xk3FeIBEm4ZawXc";
// ─────────────────────────────────────────────────────────────────────────────

type MediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";

interface BeholdSize {
  mediaUrl: string;
  height: number;
  width: number;
}

interface BeholdPost {
  id: string;
  timestamp: string;
  permalink: string;
  mediaType: MediaType;
  mediaUrl: string;
  thumbnailUrl?: string;
  caption?: string;
  prunedCaption?: string;
  isReel?: boolean;
  isSharedToFeed?: boolean;
  sizes: {
    small: BeholdSize;
    medium: BeholdSize;
    large: BeholdSize;
    full: BeholdSize;
  };
  colorPalette: {
    dominant: string;
    muted: string;
    mutedLight: string;
    mutedDark: string;
    vibrant: string;
    vibrantLight: string;
    vibrantDark: string;
  };
  hashtags: string[];
  mentions: string[];
  missingVideoThumbnail: boolean;
}

interface BeholdFeed {
  username: string;
  biography: string;
  profilePictureUrl: string;
  website: string;
  followersCount: number;
  followsCount: number;
  posts: BeholdPost[];
}

interface InstagramFeedProps {
  limit?: number;
  showCaption?: boolean;
}

interface MediaItemProps {
  post: BeholdPost;
  onClick: (post: BeholdPost) => void;
}

interface ModalProps {
  post: BeholdPost;
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

function getMediaSrc(post: BeholdPost): string {
  return post.sizes.medium.mediaUrl;
}

function getThumbnailSrc(post: BeholdPost): string {
  return post.thumbnailUrl ?? post.sizes.medium.mediaUrl;
}

// ─── MediaItem ────────────────────────────────────────────────────────────────

const MediaItem: FC<MediaItemProps> = ({ post, onClick }) => {
  const [loaded, setLoaded] = useState(false);
  const src = post.mediaType === "VIDEO" ? getThumbnailSrc(post) : getMediaSrc(post);

  const badgeLabel: Partial<Record<MediaType, string>> = {
    VIDEO: post.isReel ? "REEL" : "VIDEO",
    CAROUSEL_ALBUM: "ALBUM",
  };
  const badge = badgeLabel[post.mediaType];

  return (
    <div
      className="ig-feed__tile"
      onClick={() => onClick(post)}
      style={{
        position: "relative",
        // aspectRatio: "1",
        overflow: "hidden",
        cursor: "pointer",
        backgroundColor: `rgb(${post.colorPalette.mutedLight})`,
        borderRadius: "var(--border-radius-md)",
      }}
    >
      {!loaded && (
        <div
          className="ig-feed__tile-placeholder"
          style={{
            position: "absolute",
            inset: 0,
            background: `rgb(${post.colorPalette.mutedLight})`,
          }}
        />
      )}
      <img
        className="ig-feed__tile-img"
        src={src}
        alt={post.prunedCaption?.slice(0, 60) ?? "Instagram post"}
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
          className="ig-feed__tile-badge"
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
    // Prevent page scroll while modal is open
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  const src = post.mediaType === "VIDEO" ? getThumbnailSrc(post) : post.sizes.large.mediaUrl;

  // Portal renders the modal at document.body level, completely outside the
  // component tree — this prevents any parent overflow:hidden or z-index
  // stacking context on the page from clipping or hiding the overlay.
  return createPortal(
    <div
      id="ig-feed-modal-overlay"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.72)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: 24,
      }}
    >
      <div
        id="ig-feed-modal"
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
        <a 
          href={post.permalink}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "block" }}
        >
        <img
          id="ig-feed-modal__image"
          src={src}
          alt={post.prunedCaption?.slice(0, 60)}
          style={{
            width: "100%",
            display: "block",
            maxHeight: "fit-content",
            objectFit: "cover",
          }}
        />
        </a>
        <div id="ig-feed-modal__body" style={{ padding: "16px 20px" }}>
          <p
            id="ig-feed-modal__date"
            style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "0 0 8px" }}
          >
            {formatDate(post.timestamp)}
          </p>
          {/* {post.prunedCaption && (
            <p
              id="ig-feed-modal__caption"
              style={{
                fontSize: 14,
                color: "var(--color-text-primary)",
                backgroundColor: "var(--var-light)",
                margin: "0 0 16px",
                lineHeight: 1.6,
                maxHeight: 120,
                overflow: "auto",
                whiteSpace: "pre-line",
              }}
            >
              {post.prunedCaption}
            </p>
          )} */}
          {post.hashtags.length > 0 && (
            <p
              id="ig-feed-modal__hashtags"
              style={{ fontSize: 12, color: "var(--color-text-tertiary)", margin: "0 0 16px" }}
            >
              {post.hashtags.map((h) => `#${h}`).join(" ")}
            </p>
          )}
          <div id="ig-feed-modal__actions" style={{ display: "flex", gap: 10 }}>
            <a
              className="ig-feed-modal__link"
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
              className="ig-feed-modal__close"
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
    </div>,
    document.body
  );
};

// ─── InstagramFeed ────────────────────────────────────────────────────────────

const InstagramFeed: FC<InstagramFeedProps> = ({ limit = 12, showCaption = false }) => {
  const [feed, setFeed] = useState<BeholdFeed | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<BeholdPost | null>(null);

  const fetchFeed = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(BEHOLD_FEED_URL);
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data: BeholdFeed = await res.json();
      setFeed(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load feed.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchFeed();
  }, [fetchFeed]);

  const posts = feed?.posts.slice(0, limit) ?? [];

  return (
    <div id="ig-feed" style={{ fontFamily: "var(--font-sans)", maxWidth: 900, margin: "0 auto", overflow: "hidden" }}>
      {selected && <Modal post={selected} onClose={() => setSelected(null)} />}

      {/* Header */}
      {/* <div
        id="ig-feed__header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
          paddingBottom: 16,
          borderBottom: "0.5px solid var(--color-border-tertiary)",
        }}
      >
        <div id="ig-feed__profile" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {feed?.profilePictureUrl ? (
            <img
              id="ig-feed__avatar"
              src={feed.profilePictureUrl}
              alt={feed.username}
              style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }}
            />
          ) : (
            <svg id="ig-feed__avatar-placeholder" width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="6" stroke="var(--color-text-primary)" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="4" stroke="var(--color-text-primary)" strokeWidth="1.5" />
              <circle cx="17.5" cy="6.5" r="1" fill="var(--color-text-primary)" />
            </svg>
          )}
          <div id="ig-feed__profile-info">
            <p id="ig-feed__username" style={{ margin: 0, fontWeight: 500, fontSize: 15, color: "var(--color-text-primary)" }}>
              {feed ? `@${feed.username}` : "Instagram Feed"}
            </p>
            {feed && (
              <p id="ig-feed__followers" style={{ margin: 0, fontSize: 12, color: "var(--color-text-tertiary)" }}>
                {feed.followersCount.toLocaleString()} followers
              </p>
            )}
          </div>
        </div>
        {posts.length > 0 && (
          <span id="ig-feed__post-count" style={{ fontSize: 13, color: "var(--color-text-tertiary)" }}>
            {posts.length} posts
          </span>
        )}
      </div> */}

      {/* Error state */}
      {error && (
        <div
          id="ig-feed__error"
          style={{
            background: "var(--color-background-secondary)",
            borderRadius: "var(--border-radius-lg)",
            padding: "20px 24px",
            marginBottom: 24,
            border: "0.5px solid var(--color-border-tertiary)",
          }}
        >
          <p id="ig-feed__error-message" style={{ fontSize: 13, color: "var(--color-text-danger)", margin: "0 0 12px" }}>
            {error}
          </p>
          <button
            id="ig-feed__retry-btn"
            onClick={() => void fetchFeed()}
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
          id="ig-feed__skeleton"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 6 }}
        >
          {Array.from({ length: limit }).map((_, i) => (
            <div
              key={i}
              className="ig-feed__skeleton-tile"
              style={{
                aspectRatio: "1",
                borderRadius: "var(--border-radius-md)",
                background: "var(--color-background-secondary)",
                animation: "ig-pulse 1.4s ease-in-out infinite",
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
          <style>{`@keyframes ig-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
        </div>
      )}

      {/* Grid */}
      {!loading && posts.length > 0 && (
        <div
          id="ig-feed__grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 6 }}
        >
          {posts.map((post) => (
            <div key={post.id} className="ig-feed__grid-item self-center">
              <MediaItem post={post} onClick={setSelected} />
              {showCaption && post.prunedCaption && (
                <p
                  className="ig-feed__caption"
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
                  {post.prunedCaption}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && posts.length === 0 && (
        <p
          id="ig-feed__empty"
          style={{ textAlign: "center", color: "var(--color-text-tertiary)", fontSize: 14, padding: "40px 0" }}
        >
          No posts found.
        </p>
      )}
    </div>
  );
};

export default InstagramFeed;