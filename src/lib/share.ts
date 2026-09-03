export const shareLinks = [
  {
    name: "email",
    icon: "material-symbols:mail-outline",
    label: `Share via Email`,
  },
  {
    name: "linkedin",
    icon: "simple-icons:linkedin",
    label: `Share via LinkedIn`,
  },
];

export function createShareUrl(name: string, title: string, url: string) {
  let shareUrl;
  switch (name) {
    case "email":
      shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
      break;
    case "linkedin":
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(title)}`;
      break;
    default:
      break;
  }

  return shareUrl;
}

export default {
  shareLinks,
};
