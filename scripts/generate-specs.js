/**
 * Generate branded technical data sheet PDFs for Orion Oil products.
 * Run: node scripts/generate-specs.js
 * Output: public/specs/orion-oil-*.pdf
 *
 * Uses ONLY information already present on the site.
 * Test result values NOT on the site are marked "Available on request."
 *
 * Fonts: uses PDFKit's built-in Helvetica (no external font files needed).
 * Colours: #C6912F (gold), #0B0F14 (dark), #FFFFFF (white)
 */

import pdfkit from 'pdfkit'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUTPUT_DIR = path.resolve(__dirname, '../public/specs')

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

// ─── BRAND CONSTANTS ───────────────────────────────────────────────────────────
const GOLD = '#C6912F'
const DARK = '#0B0F14'
const WHITE = '#FFFFFF'
const SLATE = '#6B7280'
const BORDER = '#E5E7EB'

// ─── COMPANY INFO ─────────────────────────────────────────────────────────────
const COMPANY = {
  name: 'Orion Oil and Gas',
  address: 'S-32, MIDC Bhosari, Pune 411026, Maharashtra, INDIA',
  email: 'orionoilandgas@gmail.com',
  phone: '+91 8275635579',
  website: 'www.orionoil.in',
}

// ─── TEST PARAMETERS (from Quality page — site source of truth) ───────────────
const TEST_PARAMS = [
  { property: 'Density / Specific Gravity', standard: 'ASTM D-1298', value: 'Available on request' },
  { property: 'ASTM Colour Evaluation', standard: 'ASTM D-1500', value: 'Available on request' },
  { property: 'Viscosity Index (VI)', standard: 'ASTM D-2270', value: 'Available on request' },
  { property: 'Kinematic Viscosity', standard: 'ASTM D-445', value: 'Available on request' },
  { property: 'Flash Point (COC)', standard: 'ASTM D-92', value: 'Available on request' },
  { property: 'Pour Point', standard: 'ASTM D-97', value: 'Available on request' },
  { property: 'Water Content', standard: 'ASTM D-6304', value: 'Available on request' },
  { property: 'Total Acid Number (Potentiometric)', standard: 'ASTM D-664', value: 'Available on request' },
  { property: 'Total Acid Number (Color-Indicator)', standard: 'ASTM D-974', value: 'Available on request' },
]

// ─── PRODUCT DATA ─────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    filename: 'orion-oil-sn150-specs.pdf',
    name: 'PREMIUM BASE OIL SN-150 EQUIVALENT',
    subtitle: 'Group I Equivalent Base Oil',
    description:
      'Highly refined, straight-cut base oil engineered from premium automotive feedstocks using an advanced batch-wise distillation process. Provides excellent oxidation stability and is ideal for formulating high-performance engine oils, hydraulic fluids, and light industrial lubricants.',
    applications: ['Engine oils', 'Hydraulic fluids', 'Light industrial lubricants', 'Metalworking fluids'],
    dispatch: '210 Ltr MS/HDPE Drums, Bulk ISO Tankers',
  },
  {
    filename: 'orion-oil-sn300-specs.pdf',
    name: 'PREMIUM BASE OIL SN-300 EQUIVALENT',
    subtitle: 'Group I Equivalent Base Oil',
    description:
      'A heavier, superior quality base oil offering exceptional film strength and thermal stability. Processed via deep-vacuum distillation with precision gas-fired thermic heating to ensure zero thermal cracking. Perfect for heavy-duty gear oils, metalworking fluids, and robust industrial applications.',
    applications: ['Heavy-duty gear oils', 'Industrial gear lubricants', 'Metalworking fluids', 'Heavy industrial applications'],
    dispatch: '210 Ltr MS/HDPE Drums, Bulk ISO Tankers',
  },
  {
    filename: 'orion-oil-industrial-ldo-specs.pdf',
    name: 'INDUSTRIAL LDO',
    subtitle: 'Light Distillate Oil',
    description:
      'Captured during the initial dehydration phase of the batch-wise distillation process. Derived from the highly combustible light ends of waste engine and industrial oils. Delivers high calorific value and maximum thermal efficiency for industrial furnaces, boilers, thermic fluid heaters and heavy forging plants.',
    applications: ['Industrial furnaces', 'Boilers', 'Thermic fluid heaters', 'Heavy forging plants'],
    dispatch: 'Bulk Road Tanker, Drums',
  },
  {
    filename: 'orion-oil-asphalt-bitumen-specs.pdf',
    name: 'ASPHALT MODIFIER / BITUMEN',
    subtitle: 'Industrial-Grade Bitumen Binder',
    description:
      'Produced from the heavy bottoms remaining after deep-vacuum distillation, discharged hot to create a dense, highly viscous bitumen product. Rescues the heaviest hydrocarbon chains without thermal degradation, delivering highly stable, excellent binding properties for road construction and industrial coatings.',
    applications: ['Road construction & asphalt blending', 'Roofing felts', 'Waterproofing compounds', 'Industrial coatings'],
    dispatch: 'Bulk Hot Road Tanker, Drums',
  },
]

// ─── PDF GENERATOR ────────────────────────────────────────────────────────────
function generatePDF(product) {
  const doc = new pdfkit({
    size: 'A4',
    margin: 0,
    info: {
      Title: `Orion Oil and Gas — ${product.name}`,
      Author: 'Orion Oil and Gas',
      Subject: `Technical Data Sheet: ${product.name}`,
      Keywords: `Orion Oil, ${product.name}, base oil, specs`,
    },
  })

  const PAGE_W = doc.page.width // 595.28 pt (A4)
  const PAGE_H = doc.page.height // 841.89 pt (A4)
  const MARGIN_L = 40
  const MARGIN_R = 40
  const CONTENT_W = PAGE_W - MARGIN_L - MARGIN_R

  // ── HEADER BAND ─────────────────────────────────────────────────────────────
  doc.rect(0, 0, PAGE_W, 90).fill(DARK)

  // Company name — gold
  doc.fillColor(GOLD)
    .fontSize(20)
    .font('Helvetica-Bold')
    .text('ORION OIL AND GAS', MARGIN_L, 22, { width: CONTENT_W, align: 'left' })

  // Tagline — muted
  doc.fillColor(WHITE)
    .fontSize(9)
    .font('Helvetica')
    .text('Premium Base Oils & Industrial Fuels  ·  MIDC Bhosari, Pune, Maharashtra', MARGIN_L, 48, { width: CONTENT_W, align: 'left' })

  // Document type badge (right side)
  doc.fillColor(GOLD)
    .fontSize(7)
    .font('Helvetica-Bold')
    .text('TECHNICAL DATA SHEET', 0, 30, { width: PAGE_W - MARGIN_R, align: 'right' })
  doc.fillColor(WHITE)
    .fontSize(8)
    .font('Helvetica')
    .text('Issued: ' + new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase(), PAGE_W - MARGIN_R, 44, { width: 180, align: 'right', continued: false })

  // ── PRODUCT NAME BAND ────────────────────────────────────────────────────────
  const NAME_Y = 90
  doc.rect(0, NAME_Y, PAGE_W, 60).fill(GOLD)

  doc.fillColor(DARK)
    .fontSize(15)
    .font('Helvetica-Bold')
    .text(product.name, MARGIN_L, NAME_Y + 10, { width: CONTENT_W, align: 'left' })

  doc.fillColor(DARK)
    .fontSize(10)
    .font('Helvetica')
    .text(product.subtitle, MARGIN_L, NAME_Y + 36, { width: CONTENT_W, align: 'left' })

  // ── GOLD DIVIDER ─────────────────────────────────────────────────────────────
  doc.rect(0, NAME_Y + 60, PAGE_W, 3).fill(GOLD)

  // ── TWO-COLUMN LAYOUT ────────────────────────────────────────────────────────
  const COL1_X = MARGIN_L
  const COL2_X = MARGIN_L + CONTENT_W * 0.52 + 16
  const COL1_W = CONTENT_W * 0.52
  const COL2_W = CONTENT_W * 0.48
  let y = NAME_Y + 75

  // LEFT COLUMN: Description + Applications
  doc.fillColor(DARK)
    .fontSize(8)
    .font('Helvetica-Bold')
    .text('PRODUCT OVERVIEW', COL1_X, y, { width: COL1_W })
  y += 14

  doc.fillColor('#374151')
    .fontSize(8.5)
    .font('Helvetica')
    .text(product.description, COL1_X, y, { width: COL1_W, lineGap: 3 })
  y += 52

  doc.fillColor(DARK)
    .fontSize(8)
    .font('Helvetica-Bold')
    .text('APPLICATIONS', COL1_X, y, { width: COL1_W })
  y += 14

  doc.fillColor('#374151')
    .fontSize(8.5)
    .font('Helvetica')
  for (const app of product.applications) {
    doc.text('•  ' + app, COL1_X, y, { width: COL1_W })
    y += 13
  }
  y += 6

  doc.fillColor(DARK)
    .fontSize(8)
    .font('Helvetica-Bold')
    .text('DISPATCH OPTIONS', COL1_X, y, { width: COL1_W })
  y += 14
  doc.fillColor('#374151')
    .fontSize(8.5)
    .font('Helvetica')
    .text(product.dispatch, COL1_X, y, { width: COL1_W })

  // RIGHT COLUMN: Test Parameters Table
  let rightY = NAME_Y + 75

  doc.fillColor(DARK)
    .fontSize(8)
    .font('Helvetica-Bold')
    .text('TEST PARAMETERS', COL2_X, rightY, { width: COL2_W })
  rightY += 16

  // Table header
  doc.rect(COL2_X, rightY, COL2_W, 18).fill(DARK)
  doc.fillColor(WHITE)
    .fontSize(7)
    .font('Helvetica-Bold')
    .text('PROPERTY', COL2_X + 5, rightY + 5, { width: COL2_W * 0.5, lineHeight: 1 })
  doc.text('STANDARD', COL2_X + COL2_W * 0.5, rightY + 5, { width: COL2_W * 0.5, lineHeight: 1 })
  rightY += 18

  // Table rows
  for (let i = 0; i < TEST_PARAMS.length; i++) {
    const param = TEST_PARAMS[i]
    const rowH = 20
    const bg = i % 2 === 0 ? '#F9FAFB' : WHITE
    doc.rect(COL2_X, rightY, COL2_W, rowH).fill(bg)

    doc.strokeColor(BORDER)
      .lineWidth(0.3)
      .moveTo(COL2_X, rightY + rowH)
      .lineTo(COL2_X + COL2_W, rightY + rowH)
      .stroke()

    doc.fillColor('#374151')
      .fontSize(6.8)
      .font('Helvetica')
      .text(param.property, COL2_X + 4, rightY + 4, { width: COL2_W * 0.5 - 4 })
    doc.fillColor(GOLD)
      .fontSize(6.5)
      .font('Helvetica')
      .text(param.standard, COL2_X + COL2_W * 0.5 + 2, rightY + 5, { width: COL2_W * 0.5 - 4 })
    rightY += rowH
  }

  // Note below table
  rightY += 8
  doc.fillColor(SLATE)
    .fontSize(6.5)
    .font('Helvetica-Oblique')
    .text('* All numeric values: Available on request. Please contact us for current test certificates.', COL2_X, rightY, { width: COL2_W })

  // ── FOOTER ──────────────────────────────────────────────────────────────────
  const FOOTER_Y = PAGE_H - 48
  doc.rect(0, FOOTER_Y - 8, PAGE_W, 1).fill(GOLD)

  doc.fillColor(SLATE)
    .fontSize(7)
    .font('Helvetica')
    .text(
      `${COMPANY.name}  ·  ${COMPANY.address}  ·  ${COMPANY.email}  ·  ${COMPANY.phone}`,
      MARGIN_L,
      FOOTER_Y,
      { width: CONTENT_W, align: 'center' }
    )

  doc.fillColor(SLATE)
    .fontSize(6.5)
    .font('Helvetica')
    .text(
      'This document is for informational purposes only and does not constitute a specification sheet. Values available on request.',
      MARGIN_L,
      FOOTER_Y + 12,
      { width: CONTENT_W, align: 'center' }
    )

  // ── WRITE FILE ────────────────────────────────────────────────────────────────
  const outputPath = path.join(OUTPUT_DIR, product.filename)
  doc.end()
  doc.pipe(fs.createWriteStream(outputPath))
  console.log('Generated: ' + outputPath)
}

// ─── RUN ───────────────────────────────────────────────────────────────────────
console.log('\nOrion Oil — Technical Data Sheet Generator')
console.log('============================================\n')

let alreadyGenerated = 0
for (const product of PRODUCTS) {
  const outputPath = path.join(OUTPUT_DIR, product.filename)
  if (fs.existsSync(outputPath)) {
    console.log('SKIP (already exists): ' + outputPath)
    alreadyGenerated++
  } else {
    generatePDF(product)
  }
}

// Wait for all writes to complete (pdfkit is async)
setTimeout(() => {
  console.log(`\nDone. ${PRODUCTS.length - alreadyGenerated} new, ${alreadyGenerated} skipped (already exist).`)
  process.exit(0)
}, 2000)
