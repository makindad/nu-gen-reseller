/**
 * NU-GEN Research — reseller applications → Google Sheet
 *
 * Setup (about 3 minutes):
 *  1. Create a new Google Sheet (e.g. "NU-GEN Reseller Applications").
 *  2. Extensions → Apps Script. Delete the sample code and paste this whole file.
 *  3. (Optional) set SECRET_KEY below and add ?key=YOUR_KEY to the URL in step 5.
 *  4. Click Deploy → New deployment → type "Web app".
 *       Execute as: Me      Who has access: Anyone
 *     Click Deploy and approve the Google permissions prompt.
 *  5. Copy the Web app URL (ends in /exec) and add ?key=YOUR_SECRET_KEY to it, e.g.
 *       https://script.google.com/macros/s/AKfy.../exec?key=YOUR_SECRET_KEY
 *  6. In Vercel → Project → Settings → Environment Variables, set
 *       RESELLER_WEBHOOK_URL = that full URL
 *     then redeploy.
 *
 * If you edit this script later, use Deploy → Manage deployments → Edit →
 * Version: "New version" so the same URL keeps working.
 */

// Optional: set a key and append ?key=... to the webhook URL. Empty = no check.
const SECRET_KEY = "";
const SHEET_NAME = "Applications";

const COLUMNS = [
  ["submitted_at", "Submitted (UTC)"],
  ["fullName", "Full name"],
  ["company", "Company"],
  ["email", "Business email"],
  ["phone", "Phone"],
  ["website", "Website / social"],
  ["country", "Country"],
  ["businessType", "Business type"],
  ["monthlyVolume", "Est. monthly volume"],
  ["about", "About the business"],
  ["consent", "Consent"],
  ["utm_source", "utm_source"],
  ["utm_medium", "utm_medium"],
  ["utm_campaign", "utm_campaign"],
  ["utm_content", "utm_content"],
  ["utm_term", "utm_term"],
  ["referrer", "Referrer"],
  ["landing_page", "Landing page"],
  ["country_campaign", "Country campaign"],
  ["user_agent", "User agent"],
];

function doPost(e) {
  if (!e || (SECRET_KEY && (!e.parameter || e.parameter.key !== SECRET_KEY))) {
    return json_({ ok: false, error: "unauthorised" });
  }

  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: "bad json" });
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheet_();
    const row = COLUMNS.map(([key]) => {
      let v = data[key];
      if (v === true) return "Yes";
      if (v === false) return "No";
      v = v == null ? "" : String(v);
      // Stop values being interpreted as spreadsheet formulas
      return /^[=+\-@]/.test(v) ? "'" + v : v;
    });
    sheet.appendRow(row);
  } finally {
    lock.releaseLock();
  }

  return json_({ ok: true });
}

function doGet() {
  return json_({ ok: true, service: "nu-gen reseller applications" });
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS.map(([, label]) => label));
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight("bold");
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
