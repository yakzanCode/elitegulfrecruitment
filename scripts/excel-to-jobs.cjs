/**
 * Converts data-source/jobs.xlsx into src/data/jobs.json.
 *
 * Usage:
 *   npm install xlsx --save-dev   (one-time)
 *   npm run import:jobs
 *
 * Reads 4 sheets from the workbook:
 *   - Jobs           one row per job (core fields)
 *   - Description     one row per paragraph, linked by Job ID + Order
 *   - Requirements     one row per bullet, linked by Job ID + Order
 *   - Benefits         one row per bullet, linked by Job ID + Order
 *
 * Run this every time the client sends back an updated spreadsheet.
 */
const path = require("path");
const fs = require("fs");
const XLSX = require("xlsx");

const INPUT = path.join(__dirname, "..", "data-source", "jobs.xlsx");
const OUTPUT = path.join(__dirname, "..", "src", "data", "jobs.json");

function readSheet(workbook, name) {
  const sheet = workbook.Sheets[name];
  if (!sheet) {
    throw new Error(`Sheet "${name}" not found in ${INPUT}`);
  }
  return XLSX.utils.sheet_to_json(sheet, { defval: "" });
}

function slugify(value) {
  return String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function excelDateToISO(value) {
  if (!value && value !== 0) return undefined;
  if (typeof value === "string") return value.trim() || undefined;
  // Excel serial date number
  const parsed = XLSX.SSF.parse_date_code(value);
  if (!parsed) return undefined;
  const mm = String(parsed.m).padStart(2, "0");
  const dd = String(parsed.d).padStart(2, "0");
  return `${parsed.y}-${mm}-${dd}`;
}

function groupBullets(rows, textCol, textArCol) {
  const byId = new Map();
  rows.forEach((row) => {
    const id = String(row["Job ID"]).trim();
    if (!id) return;
    if (!byId.has(id)) byId.set(id, []);
    byId.get(id).push({
      order: Number(row["Order"]) || 0,
      text: String(row[textCol] ?? "").trim(),
      textAr: String(row[textArCol] ?? "").trim(),
    });
  });
  byId.forEach((list) => list.sort((a, b) => a.order - b.order));
  return byId;
}

function main() {
  if (!fs.existsSync(INPUT)) {
    console.error(`Could not find ${INPUT}`);
    console.error("Place the client's filled-in spreadsheet at data-source/jobs.xlsx and try again.");
    process.exit(1);
  }

  const workbook = XLSX.readFile(INPUT);

  const jobRows = readSheet(workbook, "Jobs");
  const descriptionRows = readSheet(workbook, "Description");
  const requirementRows = readSheet(workbook, "Requirements");
  const benefitRows = readSheet(workbook, "Benefits");

  const descriptions = groupBullets(descriptionRows, "Description (English)", "Description (Arabic)");
  const requirements = groupBullets(requirementRows, "Requirements (English)", "Requirements (Arabic)");
  const benefits = groupBullets(benefitRows, "Benefits (English)", "Benefits (Arabic)");

  const jobs = jobRows
    .filter((row) => String(row["Job ID"]).trim() !== "")
    .map((row) => {
      const id = String(row["Job ID"]).trim();
      const title = String(row["Title"] ?? "").trim();
      const city = String(row["City"] ?? "").trim();
      const country = String(row["Country"] ?? "").trim();
      const slugRaw = String(row["Slug (optional)"] ?? "").trim();
      const slug = slugRaw ? slugify(slugRaw) : slugify(`${title} ${city} ${country}`);

      const descList = (descriptions.get(id) || []).map((d) => d.text).filter(Boolean);
      const descListAr = (descriptions.get(id) || []).map((d) => d.textAr || d.text).filter(Boolean);
      const reqList = (requirements.get(id) || []).map((r) => r.text).filter(Boolean);
      const reqListAr = (requirements.get(id) || []).map((r) => r.textAr || r.text).filter(Boolean);
      const benList = (benefits.get(id) || []).map((b) => b.text).filter(Boolean);
      const benListAr = (benefits.get(id) || []).map((b) => b.textAr || b.text).filter(Boolean);

      const featuredRaw = String(row["Featured (YES/NO)"] ?? "").trim().toUpperCase();

      return {
        id,
        slug,
        title,
        titleAr: String(row["Title (Arabic)"] ?? "").trim() || undefined,
        country,
        countryAr: String(row["Country (Arabic)"] ?? "").trim() || undefined,
        city,
        cityAr: String(row["City (Arabic)"] ?? "").trim() || undefined,
        category: String(row["Category"] ?? "").trim() || undefined,
        categoryAr: String(row["Category (Arabic)"] ?? "").trim() || undefined,
        vacancies: Number(row["Vacancies"]) || undefined,
        salaryMin: Number(row["Salary Min"]) || undefined,
        salaryMax: Number(row["Salary Max"]) || undefined,
        currency: String(row["Currency"] ?? "").trim() || undefined,
        salaryPeriod: String(row["Salary Period"] ?? "").trim().toUpperCase() || "MONTH",
        experience: String(row["Experience"] ?? "").trim() || undefined,
        experienceAr: String(row["Experience (Arabic)"] ?? "").trim() || undefined,
        workingHours: String(row["Working Hours"] ?? "").trim() || undefined,
        workingHoursAr: String(row["Working Hours (Arabic)"] ?? "").trim() || undefined,
        accommodation: String(row["Accommodation"] ?? "").trim() || undefined,
        accommodationAr: String(row["Accommodation (Arabic)"] ?? "").trim() || undefined,
        transportation: String(row["Transportation"] ?? "").trim() || undefined,
        transportationAr: String(row["Transportation (Arabic)"] ?? "").trim() || undefined,
        medicalInsurance: String(row["Medical Insurance"] ?? "").trim() || undefined,
        medicalInsuranceAr: String(row["Medical Insurance (Arabic)"] ?? "").trim() || undefined,
        contractDuration: String(row["Contract Duration"] ?? "").trim() || undefined,
        contractDurationAr: String(row["Contract Duration (Arabic)"] ?? "").trim() || undefined,
        benefits: benList,
        benefitsAr: benListAr,
        description: descList,
        descriptionAr: descListAr,
        requirements: reqList,
        requirementsAr: reqListAr,
        postedAt: excelDateToISO(row["Posted Date"]),
        validThrough: excelDateToISO(row["Valid Through"]),
        featured: featuredRaw === "YES" || featuredRaw === "TRUE",
      };
    });

  // Drop undefined keys so the JSON stays clean
  const clean = jobs.map((job) => {
    const out = {};
    Object.entries(job).forEach(([key, value]) => {
      if (value !== undefined && value !== "") out[key] = value;
    });
    return out;
  });

  fs.writeFileSync(OUTPUT, JSON.stringify(clean, null, 2) + "\n", "utf8");
  console.log(`Wrote ${clean.length} jobs to ${path.relative(process.cwd(), OUTPUT)}`);
}

main();
