/**
 * Parses an Instagram URL and extracts post info.
 * 
 * Supported URLs:
 * - https://www.instagram.com/p/CxxxxxxxxxxX/  → post
 * - https://www.instagram.com/reel/CxxxxxxxxxxX/  → reel
 * - https://www.instagram.com/reels/CxxxxxxxxxxX/  → reel
 * - https://www.instagram.com/stories/username/1234567890/  → story
 * - https://www.instagram.com/tv/CxxxxxxxxxxX/  → reel (IGTV)
 */
export interface InstagramPostInfo {
  isValid: boolean;
  postType: "post" | "reel" | "story" | null;
  postId: string | null;
  username: string | null; // For stories
  cleanUrl: string | null; // Normalized URL
  error?: string;
}

export function parseInstagramUrl(url: string): InstagramPostInfo {
  const trimmed = url.trim();

  // Empty check
  if (!trimmed) {
    return {
      isValid: false,
      postType: null,
      postId: null,
      username: null,
      cleanUrl: null,
    };
  }

  // Must be an Instagram URL
  if (!trimmed.includes("instagram.com")) {
    return {
      isValid: false,
      postType: null,
      postId: null,
      username: null,
      cleanUrl: null,
      error: "Not an Instagram URL",
    };
  }

  try {
    // Story URL: /stories/username/1234567890
    const storyMatch = trimmed.match(/instagram\.com\/stories\/([^/?]+)\/(\d+)/i);
    if (storyMatch) {
      return {
        isValid: true,
        postType: "story",
        postId: storyMatch[2],
        username: storyMatch[1],
        cleanUrl: `https://www.instagram.com/stories/${storyMatch[1]}/${storyMatch[2]}/`,
      };
    }

    // Reel URLs: /reel/xxx or /reels/xxx
    const reelMatch = trimmed.match(/instagram\.com\/reels?\/([^/?]+)/i);
    if (reelMatch) {
      return {
        isValid: true,
        postType: "reel",
        postId: reelMatch[1],
        username: null,
        cleanUrl: `https://www.instagram.com/reel/${reelMatch[1]}/`,
      };
    }

    // IGTV: /tv/xxx (treated as reel)
    const tvMatch = trimmed.match(/instagram\.com\/tv\/([^/?]+)/i);
    if (tvMatch) {
      return {
        isValid: true,
        postType: "reel",
        postId: tvMatch[1],
        username: null,
        cleanUrl: `https://www.instagram.com/tv/${tvMatch[1]}/`,
      };
    }

    // Post URL: /p/xxx
    const postMatch = trimmed.match(/instagram\.com\/p\/([^/?]+)/i);
    if (postMatch) {
      return {
        isValid: true,
        postType: "post",
        postId: postMatch[1],
        username: null,
        cleanUrl: `https://www.instagram.com/p/${postMatch[1]}/`,
      };
    }

    return {
      isValid: false,
      postType: null,
      postId: null,
      username: null,
      cleanUrl: null,
      error: "Invalid Instagram URL. Please paste a post, reel, or story URL.",
    };
  } catch (err) {
    return {
      isValid: false,
      postType: null,
      postId: null,
      username: null,
      cleanUrl: null,
      error: "Failed to parse URL",
    };
  }
}

/**
 * Get emoji icon for post type
 */
export function getPostTypeIcon(type: string | null): string {
  switch (type) {
    case "reel":
      return "🎬";
    case "post":
      return "📷";
    case "story":
      return "📸";
    case "all":
      return "🌐";
    default:
      return "📌";
  }
}

/**
 * Get display label for post type
 */
export function getPostTypeLabel(type: string | null): string {
  switch (type) {
    case "reel":
      return "Reel";
    case "post":
      return "Post";
    case "story":
      return "Story";
    case "all":
      return "All posts";
    default:
      return "Unknown";
  }
}