/**
 * Common disposable/temporary email domains.
 * Add to this list as new ones are encountered.
 * Source: curated from public blocklists.
 */
export const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com", "guerrillamail.com", "guerrillamail.net", "guerrillamail.org",
  "guerrillamail.biz", "guerrillamail.de", "guerrillamail.info",
  "tempmail.com", "temp-mail.org", "tempmail.net", "tempmail.io",
  "throwam.com", "throwaway.email", "trashmail.com", "trashmail.me",
  "trashmail.net", "trashmail.at", "trashmail.io", "trashmail.org",
  "yopmail.com", "yopmail.fr", "cool.fr.nf", "jetable.fr.nf",
  "nospam.ze.tc", "nomail.xl.cx", "mega.zik.dj", "speed.1s.fr",
  "courriel.fr.nf", "moncourrier.fr.nf", "monemail.fr.nf",
  "sharklasers.com", "guerrillamailblock.com", "grr.la", "guerrillamail.info",
  "spam4.me", "spamgourmet.com", "spamgourmet.net", "spamgourmet.org",
  "spamgourmet.com", "getairmail.com", "filzmail.com",
  "dispostable.com", "maildrop.cc", "mailnull.com", "spamspot.com",
  "spamthisplease.com", "spamhereplease.com", "mailexpire.com",
  "mailnew.com", "mailscrap.com", "mailsiphon.com", "mailslapping.com",
  "mailzilla.com", "mohmal.com", "mytrashmail.com", "no-spam.ws",
  "noblepioneer.com", "obobbo.com", "odaymail.com",
  "oneoffmail.com", "pookmail.com", "proxymail.eu.org",
  "rklips.com", "rmqkr.net", "royal.net", "rppkn.com",
  "safetymail.info", "sendspamhere.com", "sharklasers.com",
  "shieldemail.com", "shiftmail.com", "skeefmail.com",
  "slippery.email", "slopsbox.com", "smashmail.de",
  "smellfear.com", "sneakemail.com", "snkmail.com",
  "sofimail.com", "sogetthis.com", "spamfree.eu",
  "spamfree24.de", "spamfree24.eu", "spamfree24.info",
  "spamfree24.net", "spamfree24.org", "spamgoes.in",
  "spamgourmet.com", "spamgourmet.net",
  "10minutemail.com", "10minutemail.net", "10minutemail.org",
  "20minutemail.com", "fakeinbox.com", "fakeinbox.net",
  "mailinator2.com", "spamavert.com", "spamevader.com",
  "trbvm.com", "uggsrock.com", "vkcode.ru", "vomoto.com",
  "wetrainbayarea.com", "wetrainbayarea.org", "wh4f.org",
  "whyspam.me", "willhackforfood.biz", "wronghead.com",
  "wuzupmail.net", "xagloo.com", "xemaps.com", "xents.com",
  "xmaily.com", "xoxy.net", "yapped.net", "yeah.net",
  "yep.it", "yogamaven.com", "yuurok.com",
  "z1p.biz", "za.com", "zehnminuten.de", "zehnminutenmail.de",
  "zetmail.com", "zippymail.info", "zoemail.net", "zoemail.org",
  "zomg.info", "zxcv.com", "zxcvbnm.com", "zzz.com",
]);

export function isDisposableEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase().trim();
  if (!domain) return false;
  return DISPOSABLE_DOMAINS.has(domain);
}
