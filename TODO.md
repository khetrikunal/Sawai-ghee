# TODO - Wholesale Configurator Pricing Model

## Step 1: Frontend (WholesalePage.jsx)
- Replace static bottle pricing cards (₹600/₹580/₹520 / bottle) with 3 selectable plan cards: 5L, 10L, 100L (rate per litre only).
- Add new Bottle Builder UI (quantities for 200ml, 500ml, 1L with +/-).
- Implement live calculation:
  - totalLiters = qty200ml*0.2 + qty500ml*0.5 + qty1L
  - remaining = planLimit - totalLiters
  - totalPrice = totalLiters * ratePerLitre
- Enforce rules in UI:
  - no negative quantities
  - no exceeding plan limit.
- Update enquiry submission payload to send structured fields.

## Step 2: Backend DTO + Validation
- Replace `WholesaleLeadRequest.quantity` (string) with:
  - `planType` (5L/10L/100L)
  - `qty200ml`, `qty500ml`, `qty1L`
- Add DTO validations (non-negative).

## Step 3: Backend Model + DB
- Update `WholesaleLead` entity to store:
  - planType, qty200ml, qty500ml, qty1L, totalLiters, totalPrice (or at minimum totalLiters).
- Add Flyway migration altering `wholesale_leads` table.

## Step 4: Backend Controller Logic
- Compute ratePerLitre from planType.
- Compute totalLiters using requested bottle mix.
- Enforce server-side plan limit and reject invalid requests (HTTP 400).
- Save lead using new fields.

## Step 5: Admin UI
- Update admin lead listing to display plan and bottle mix + totals.

## Step 6: Verify
- Run frontend build.
- Run backend build/test (or at least compile).
- Manual API check for valid/invalid payloads.

