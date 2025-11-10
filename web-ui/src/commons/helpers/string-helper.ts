export function getImagePath(image?: string) {
  if (!image) {
    return "/no-image.png";
  }
  return process.env.NEXT_PUBLIC_CLOUDFLARE_R2_URL + "/" + image;
}
