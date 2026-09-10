// Choose media by device identity, not the current browser window size.
export function isPhoneDevice(nav = navigator) {
  const ua = nav.userAgent || '';
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua) ||
      (/Macintosh/i.test(ua) && nav.maxTouchPoints > 1)) return false;
  if (/iPhone|iPod|Windows Phone/i.test(ua)) return true;
  if (/Android/i.test(ua)) return /Mobile/i.test(ua);
  return nav.userAgentData?.mobile === true;
}
