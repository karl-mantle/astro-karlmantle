export const shareLinks = [
  {
    name: 'email',
    icon: 'ri:mail-line',
    label: `Share via Email`,
  },
  {
    name: 'facebook',
    icon: 'simple-icons:facebook',
    label: `Share on Facebook`,
  },
  {
    name: 'linkedin',
    icon: 'simple-icons:linkedin',
    label: `Share via LinkedIn`,
  },
  {
    name: 'medium',
    icon: 'simple-icons:medium',
    label: `Share on Medium`,
  },
  {
    name: 'pinterest',
    icon: 'simple-icons:pinterest',
    label: `Pin on Pinterest`,
  },
  {
    name: 'reddit',
    icon: 'simple-icons:reddit',
    label: `Post on reddit`,
  },
  {
    name: 'whatsapp',
    icon: 'simple-icons:whatsapp',
    label: `Send via Whatsapp`,
  },
  {
    name: 'x',
    icon: 'simple-icons:x',
    label: `Share on X`,
  }
];

export function createShareUrl(name: string, title: string, url: string) {

  let shareUrl;
  switch (name) {
    case 'email':
      shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
      break;
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      break;
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(title)}`;
      break;
    case 'medium':
      shareUrl = `https://medium.com/new-story?url=${encodeURIComponent(url)}&title=${title}`;
      break;
    case 'pinterest':
      shareUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&descriptsimple-icons=${encodeURIComponent(title)}`;
      break;
    case 'reddit':
      shareUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
      break;
    case 'whatsapp':
      shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(title)}%20${encodeURIComponent(url)}`;
      break;
    case 'x':
      shareUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
      break;
    default:
      break;
  }

  return shareUrl;
}

export default {
  shareLinks
};
