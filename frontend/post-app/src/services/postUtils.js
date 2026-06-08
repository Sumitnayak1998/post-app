import { API_BASE_URL } from "./api";

export function getPostId(post) {
  return post?._id;
}

export function getPostTitle(post) {
  return post?.post_name || post?.post?.post_name || post?.title || "Untitled post";
}

export function getPostDescription(post) {
  return post?.desc || post?.post?.desc || post?.content || "";
}

export function getPostImagePath(post) {
  return post?.post?.post || post?.post || post?.image || "";
}

export function getImageUrl(post) {
  const path = getPostImagePath(post);

  if (!path) {
    return "https://placehold.co/900x560/f4f7fb/0b2545?text=Post+Image";
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const normalizedPath = path.replace(/\\/g, "/").replace(/^\/+/, "");
  const root = API_BASE_URL.replace(/\/api$/, "");
  return `${root}/${normalizedPath}`;
}

export function buildPostFormData(form, file) {
  const payload = new FormData();
  payload.append("post_name", form.post_name.trim());
  payload.append("desc", form.desc.trim());

  if (file) {
    payload.append("post", file);
  }

  return payload;
}
