# Sellora auto-reply

`Code.gs` is a Google Apps Script that sends the branded "we've received your message" email to everyone who submits the audit or contact form on hellosellora.com.

* Runs every 5 minutes in the Google account that receives contact@ emails.
* Picks the visitor's language (fr, en, sv, es) from the "Page language" line Web3Forms includes.
* Audit requests get the three "what happens next" steps; contact messages get a copy of what the visitor wrote.
* Labels each handled email `Sellora/Auto-replied` so nobody gets two replies.
* Images load from `https://hellosellora.com/email/` (`public/email/` in this repo).

**Setup:** script.google.com, New project, paste `Code.gs`, Save, then run `setup` once and approve the Gmail permissions. Run `sendTestEmails` to receive all eight versions.

**Editing:** the wording for each language lives in `TEXT` at the top of `Code.gs`. After changing it, paste the updated file into the Apps Script project again.
